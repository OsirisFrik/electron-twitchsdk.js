'use strict'
/**
 * @module electron-twitchsdk.js
 * @submodule core
 */

const https = require('https')
const util = require('./twitch.util')
const EventEmmiter = require('events').EventEmitter

/**
 * @method events
 * Events on the sdk:
 * 'auth.login'
 * 'auth.logout'
 */
const events = new EventEmmiter()
exports.events = events

var client_id
var session
var debug = false
var t_api = {
    api: 'https://api.twitch.tv/helix/',
    host: 'api.twitch.tv',
    path: '/helix/',
    redirect: {
        uri: 'https://api.twitch.tv/helix/',
        path: '/helix/',
        host: 'api.twitch.tv'
    },
    auth: 'https://id.twitch.tv/oauth2/',
    auth_path: '/oauth2/',
    auth_host: 'id.twitch.tv'
}
exports.API = t_api

/**
 * @typedef {Object} SETURI
 * @property {!String} uri - Complete URL redirect after twitch login - example `https://api.twitch.tv/helix/`
 * @property {!String} path - Path to redirect - example `/helix/`
 * @property {!String} host - URL host - example `api.twitch.tv`
 */

/**
 * Set redirect URI
 * @method setUri
 * @param {SETURI} options
 */

function setUri(options) {
    t_api.redirect = {
        uri: options.uri,
        path: options.path,
        host: options.host
    }
}
exports.setUri = setUri

/**
 * Set Twitch Client ID
 * @method setClient
 * @param {String} client - The client ID to set
 */

function setClient(client) {
    if (!client) {
        throw new Error('Client id not specified')
    }

    exports.clientId = client_id = client
}
exports.setClient = setClient

/**
 * Set the session
 * @private @method setSession
 * @param {Object} Session
 */

function setSession(Session) {
    exports.session = session = Session
}
exports.setSession = setSession

/**
 * @typedef APIObject
 * @property {Object} params - Params to send on request
 * @property {?String} host - Api host - default `api.twitch.tv`
 * @property {?String} path - Api principal path - default `/helix/`
 * @property {?String} point - Api endpoint path - default default ''
 * @property {?String} method - Request method - default `GET` - 'GET' || 'POST' || 'EDIT' || ETC
 */

/**
 * @method api
 * @param {APIObject} options
 * @param {(err, data)} [callback]
 * @example 
 * ```javascript
 * Twitch.api({
 *  params: {}, // Params to request -- {login: 'username'} -> URL/?login=username
 *  host: 'host', // Default 'api.twitch.tv'
 *  path: '/helix/', // Default '/helix/'
 *  point: 'user', // API endpoint path - default '' -- path + point -> '/helix/user/',
 *  method: 'POST' // Request method - Default 'GET' -- 'GET' || 'EDIT' || 'POST' etc
 * }, (err, data) => {
 *  // Callback
 * })
 * ```
 */

function api(options, callback) {
    if (!session) {
        throw new Error('You must call init() before api()')
    }

    var params = options.params || {}
    callback = callback || function () {}

    var authenticated = !!session.access_token
    var path = (options.path || t_api.path) + (options.point || '')

    var req_opt = {
        host: (options.host || t_api.host),
        path: path + util.param(params),
        method: options.method || 'GET',
        headers: {
            'Client-ID': client_id,
            'Authorization': `OAuth ${session.access_token}`
        }
    }

    var req = https.request(req_opt, res => {
        log('Response status:', res.statusCode, res.statusMessage)
        res.setEncoding('utf8')

        var body = ''
        res.on('data', data => {
            body += data
        })

        res.on('end', e => {
            var data
            try {
                data = JSON.parse(body)
            } catch (err) {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    data = {
                        success: true
                    }
                } else {
                    data = {
                        success: false,
                        error: err
                    }
                }
            }
            if (res.statusCode >= 200 && res.statusCode < 300) {
                log('Response Data:', data);
                callback(null, data || null)
            } else {
                if (authenticated && res.statusCode === 401) {
                    log('UNAUTHORIZED')
                    callback(data, null)
                } else {
                    callback(data, null)
                }
            }
        })
    })

    req.on('error', err => {
        log('API ERROR', err)
        callback(err, null)
    })

    req.end()
}
exports.api = api
/**
 * Log messages to the console, prefixed with `[Twitch SDK]`
 * @private @method log
 * @param {any} arguments - Any numbers of arguments, fed to the console
 */

function log() {
    if (debug) {
        Array.prototype.unshift.call(arguments, '[Twitch SDK]')
        console.log.apply(console, arguments)
    }
}
exports.log = log

/**
 * Set debug console
 * @private @method setDebug
 * @param {Boolean} state
 */

function setDebug(state) {
    exports.debug = debug = state
}
exports.setDebug = setDebug