'use strict'

const msnodesql = require('msnodesqlv8')
const debug = require('debug')('mssql:msv8')
const BaseConnectionPool = require('../base/connection-pool')
const { IDS, INCREMENT } = require('../utils')
const shared = require('../shared')
const ConnectionError = require('../error/connection-error')

const CONNECTION_STRING_PORT = 'Driver=SQL Server Native Client 11.0;Server=#{server},#{port};Database=#{database};Uid=#{user};Pwd=#{password};Trusted_Connection=#{trusted};Encrypt=#{encrypt};'
const CONNECTION_STRING_NAMED_INSTANCE = 'Driver=SQL Server Native Client 11.0;Server=#{server}\\#{instance};Database=#{database};Uid=#{user};Pwd=#{password};Trusted_Connection=#{trusted};Encrypt=#{encrypt};'

class ConnectionPool extends BaseConnectionPool {
  _poolCreate () {
    return new shared.Promise((resolve, reject) => {
      let defaultConnectionString = CONNECTION_STRING_PORT

      if (this.config.options.instanceName != null) {
        defaultConnectionString = CONNECTION_STRING_NAMED_INSTANCE
      }

      if (this.config.requestTimeout == null) {
        this.config.requestTimeout = 15000
      }

      const cfg = {
        conn_str: this.config.connectionString || defaultConnectionString,
        conn_timeout: (this.config.connectionTimeout || 15000) / 1000
      }

      cfg.conn_str = cfg.conn_str.replace(/#{([^}]*)}/g, (p) => {
        const key = p.substr(2, p.length - 3)

        switch (key) {
          case 'instance':
            return this.config.options.instanceName
          case 'trusted':
            return this.config.options.trustedConnection ? 'Yes' : 'No'
          case 'encrypt':
            return this.config.options.encrypt ? 'Yes' : 'No'
          default:
            return this.config[key] != null ? this.config[key] : ''
        }
      })

      const connedtionId = INCREMENT.Connection++
      debug('pool(%d): connection #%d created', IDS.get(this), connedtionId)
      debug('connection(%d): establishing', connedtionId)

      if (typeof this.config.beforeConnect === 'function') {
        this.config.beforeConnect(cfg)
      }

      msnodesql.open(cfg, (err, tds) => {
        if (err) {
          err = new ConnectionError(err)
          return reject(err)
        }

        IDS.add(tds, 'Connection', connedtionId)
        tds.setUseUTC(this.config.options.useUTC)
        debug('connection(%d): established', IDS.get(tds))
        resolve(tds)
      })
    })
  }

  _poolValidate (tds) {
    if (tds && !tds.hasError) {
      return !this.config.validateConnection || new shared.Promise((resolve) => {
        tds.query('SELECT 1;', (err) => {
          resolve(!err)
        })
      })
    }
    return false
  }

  _poolDestroy (tds) {
    return new shared.Promise((resolve, reject) => {
      if (!tds) {
        resolve()
        return
      }
      debug('connection(%d): destroying', IDS.get(tds))
      tds.close(() => {
        debug('connection(%d): destroyed', IDS.get(tds))
        resolve()
      })
    })
  }
}

module.exports = ConnectionPool
