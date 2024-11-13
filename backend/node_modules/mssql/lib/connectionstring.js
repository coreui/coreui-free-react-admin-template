'use strict'

const URL = require('url').URL

const IGNORE_KEYS = ['stream']
const oror = function () {
  for (let i = 0, l = arguments.length; i < l; i++) {
    if (arguments[i] !== null && arguments[i] !== undefined) {
      return arguments[i]
    }
  }
}

const parseConnectionURI = function (uri) {
  const parsed = new URL(uri)
  let instance
  let user
  let password

  const path = parsed.pathname.substr(1).split('/')
  if (path.length > 1) {
    instance = path.shift()
  }

  if (parsed.username) {
    const auth = [parsed.username, parsed.password]
    user = decodeURIComponent(auth.shift())
    password = decodeURIComponent(auth.join(':'))
  }

  const port = parsed.port ? `,${parsed.port}` : (instance ? `\\${instance}` : '')
  const object = {
    server: `${parsed.hostname}${port}`,
    uid: user || '',
    pwd: password || '',
    database: path[0]
  }

  if (parsed.searchParams) {
    parsed.searchParams.forEach((value, key) => {
      if (key === 'domain') {
        object.uid = `${value}\\${object.uid}`
      } else {
        object[key] = value
      }
    })
  }

  Object.defineProperty(object, 'toString', {
    value () {
      const out = []
      for (const key in this) {
        if (IGNORE_KEYS.indexOf(key) === -1) {
          out.push(`${key}={${this[key]}}`)
        }
      }
      return out.join(';')
    }
  })

  return object
}

const parseConnectionString = function (string) {
  let cursor = 0
  let parsing = 'name'
  let param = null
  let buffer = ''
  let quotes = null
  const parsed = {}
  const original = {}

  Object.defineProperty(parsed, '__original__', { value: original })
  Object.defineProperty(parsed, 'toString', {
    value () {
      const out = []
      for (const key in this) {
        if (IGNORE_KEYS.indexOf(key) === -1) {
          const esc = original[key].escape || ['', '']
          out.push(`${original[key].name}=${esc[0] || ''}${this[key]}${esc[1] || ''}`)
        }
      }
      return out.join(';')
    }
  })

  while (cursor < string.length) {
    const char = string.charAt(cursor)
    switch (char) {
      case '=':
        if (parsing === 'name') {
          buffer = buffer.trim()
          param = buffer.toLowerCase()
          original[param] = { name: buffer }
          parsing = 'value'
          buffer = ''
        } else {
          buffer += char
        }
        break

      case '\'': case '"':
        if (parsing === 'value') {
          if (!buffer.trim().length) {
            // value is wrapped in qotes
            original[param].escape = [char, char]
            quotes = char
            buffer = ''
          } else if (quotes) {
            if (char === quotes) {
              // found same char as used for wrapping quotes
              if (char === string.charAt(cursor + 1)) {
                // escaped quote
                buffer += char
                cursor++
              } else {
                // end of value
                parsed[param] = buffer
                param = null
                parsing = null
                buffer = ''
                quotes = null
              }
            } else {
              buffer += char
            }
          } else {
            buffer += char
          }
        } else {
          throw new Error('Invalid connection string.')
        }
        break

      case '{':
        if (parsing === 'value') {
          if (buffer.trim().length === 0) {
            // value is wrapped in qotes
            original[param].escape = ['{', '}']
            quotes = '{}'
            buffer = ''
          } else {
            buffer += char
          }
        } else {
          throw new Error('Invalid connection string.')
        }
        break

      case '}':
        if (parsing === 'value') {
          if (quotes === '{}') {
            // end of value
            parsed[param] = buffer
            param = null
            parsing = null
            buffer = ''
            quotes = null
          } else {
            buffer += char
          }
        } else {
          throw new Error('Invalid connection string.')
        }
        break

      case ';':
        if (parsing === 'value') {
          if (quotes) {
            buffer += char
          } else {
            // end of value
            parsed[param] = buffer
            param = null
            parsing = 'name'
            buffer = ''
          }
        } else {
          buffer = ''
          parsing = 'name'
        }
        break

      default:
        buffer += char
    }

    cursor++
  }

  if (parsing === 'value') {
    // end of value
    parsed[param] = buffer
  }

  return parsed
}

const resolveConnectionString = function (string, driver) {
  const parsed = /^(mssql|tedious|msnodesql|tds):\/\//i.test(string) ? parseConnectionURI(string) : parseConnectionString(string)
  const stream = (parsed.stream || '').toLowerCase()
  const encrypt = (parsed.encrypt || '').toLowerCase()

  if (driver === 'msnodesqlv8') {
    parsed.driver = 'SQL Server Native Client 11.0'

    if (parsed.__original__) {
      parsed.__original__.driver = { name: 'Driver', escape: ['{', '}'] }
    }

    return { connectionString: parsed.toString() }
  }

  let user = parsed.uid || parsed.uid || parsed['user id']
  let server = parsed.server || parsed.address || parsed.addr || parsed['data source'] || parsed['network address']

  const config = {
    password: oror(parsed.pwd, parsed.password),
    database: oror(parsed.database, parsed['initial catalog']),
    connectionTimeout: oror(parsed.connectionTimeout, parsed.timeout, parsed['connect timeout'], parsed['connection timeout']),
    requestTimeout: oror(parsed.requestTimeout, parsed['request timeout']),
    stream: stream === 'true' || stream === 'yes' || stream === '1',
    options: {
      readOnlyIntent: parsed.applicationintent && parsed.applicationintent.toLowerCase() === 'readonly',
      encrypt: encrypt === 'true' || encrypt === 'yes' || encrypt === '1'
    }
  }

  if (parsed.trustservercertificate && ['true', '1', 'yes'].includes(parsed.trustservercertificate.toLowerCase())) {
    Object.assign(config.options, {
      trustServerCertificate: true
    })
  }

  if (parsed.useUTC != null) {
    const utc = parsed.useUTC.toLowerCase()
    config.options.useUTC = utc === 'true' || utc === 'yes' || utc === '1'
  }
  if (config.connectionTimeout != null) {
    config.connectionTimeout = parseInt(config.connectionTimeout, 10) * 1000
  }
  if (config.requestTimeout != null) {
    config.requestTimeout = parseInt(config.requestTimeout, 10)
  }

  if (parsed.multisubnetfailover != null) {
    config.options.multiSubnetFailover = parsed.multisubnetfailover.toLowerCase() === 'true'
  }

  if (/^(.*)\\(.*)$/.exec(user)) {
    config.domain = RegExp.$1
    user = RegExp.$2
  }

  if (server) {
    server = server.trim()

    if (/^np:/i.test(server)) {
      throw new Error('Connection via Named Pipes is not supported.')
    }

    if (/^tcp:/i.test(server)) {
      server = server.substr(4)
    }

    if (/^(.*)\\(.*)$/.exec(server)) {
      server = RegExp.$1
      config.options.instanceName = RegExp.$2
    }

    if (/^(.*),(.*)$/.exec(server)) {
      server = RegExp.$1.trim()
      config.port = parseInt(RegExp.$2.trim(), 10)
    }

    if (server === '.' || server === '(.)' || server.toLowerCase() === '(localdb)' || server.toLowerCase() === '(local)') {
      server = 'localhost'
    }
  }

  config.user = user
  config.server = server
  return config
}

module.exports = {
  parse: parseConnectionString,
  resolve: resolveConnectionString
}
