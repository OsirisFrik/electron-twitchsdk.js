'use strict'
/**
 * @module electron-twitchsdk.js
 * @submodule init
 */

const core = require('./twitch.core')
const auth = require('./twitch.auth')

/**
 * @typedef {Object} URI
 * @property {!String} uri - Full URI to redirect - example `https://api.twitch.tv/helix/`
 * @property {!String} path - Path to redirect - example `/helix`
 * @property {!String} host - URL host - example `api.twitch.tv`
 */

/**
 * @typedef {Object} opt_def
 * @property {!String} client_id - Twitch Client ID
 * @property {?Object} session - Session Object
 * @property {?String} version - v5 has default
 * @property {?Boolean} debug - Debug console
 * @property {URI} redirect - Uri to redirect register on twitch app
 */

/**
 * @method init
 * @param {opt_def} options
 * @param {(err, status)} [callback]
 * @example 
 * ```javascript
 * Twitch.init({
 *  client_id: 'CLIENT ID', // REQUIRED
 *  session: {}, // SESSION OBJECT
 *  redirect : { // Redirect after login
 *      uri: 'https://api.twitch.tv/helix/',
 *      host: 'api.twitch.tv',
 *      path: '/helix/'
 *  },
 *  debug: BOOLEAN // Default true
 * }, (err, status) => {
 *  // Callback
 * })```
 */

function init(options, callback) {
    if (typeof callback !== 'function') {
        callback = function () {}
    }
    
    if (!options.client_id) {
        throw new Error('Client id not specified')
    }

    core.setClient(options.client_id)

    if (options.debug) {
        core.setDebug(options.debug)
        core.log('Twitch SDK debug tun ON')
    }

    if (typeof options.redirect !== 'undefined') {
        core.setUri(options.redirect)
    }

    if (typeof options.session !== 'undefined' && options.session !== null) {
        auth.initSession(options.session, callback)
    }
}
exports.init = init