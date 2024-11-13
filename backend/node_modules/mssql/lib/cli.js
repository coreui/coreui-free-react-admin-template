'use strict'

const fs = require('fs')
const path = require('path')
const sql = require('./tedious')

const exit = process.exit
const write = text => process.stdout.write(text)
Buffer.prototype.toJSON = () => {
  return `0x${this.toString('hex')}`
}

// Resolve config path

let cfgPath = path.resolve(process.argv[2] || process.cwd())
if (fs.lstatSync(cfgPath).isDirectory()) {
  cfgPath = path.resolve(cfgPath, './.mssql.json')
}
if (!fs.existsSync(cfgPath)) {
  console.error('Config file not found.')
  exit(1)
}

// Config checks & parse

let config
try {
  config = fs.readFileSync(cfgPath)
} catch (err) {
  console.error(`Failed to load config file. ${err.message}`)
  exit(1)
}

try {
  config = JSON.parse(config)
} catch (err) {
  console.error(`Failed to parse config file. ${err.message}`)
  exit(1)
}

// Read stdin

const buffer = []

process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => buffer.push(process.stdin.read()))

process.stdin.on('end', () => {
  const statement = buffer.join('')
  let rst = 0
  let index = 0

  if (!statement.length) {
    console.error('Statement is empty.')
    exit(1)
  }

  sql.connect(config, err => {
    if (err) {
      console.error(err.message)
      exit(1)
    }

    write('[')

    const request = new sql.Request()
    request.stream = true
    request.on('recordset', () => {
      index = 0
      if (rst++ > 0) {
        write('],')
      }

      return write('[')
    })

    request.on('error', err => {
      console.error(err.message)
      sql.close()
      return exit(1)
    })

    request.on('row', row => {
      if (index++ > 0) {
        write(',')
      }

      return write(JSON.stringify(row))
    })

    request.on('done', () => {
      if (rst > 0) {
        write(']')
      }

      write(']\n')
      sql.close()
      return exit(0)
    })

    request.query(statement)
  })
})

process.on('uncaughtException', err => {
  if (err.code === 'EPIPE') {
    console.error('Failed to pipe output stream.')
  } else {
    console.error(err.message)
  }

  exit(1)
})
