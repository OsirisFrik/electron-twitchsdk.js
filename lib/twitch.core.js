'use strict'
/**
 * @module electron-twitchsdk.js
 * @submodule core
 */

const https = require('https')
const util = require('./twitch.util')

var client_id
var session
var debug = false
const t_api = {
    api: 'https://api.twitch.tv/kraken/',
    host: 'api.twitch.tv',
    path: '/kraken/'
}
exports.API = t_api
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
    debug = state
}
exports.setDebug = setDebug