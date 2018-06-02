'use strict'
/**
 * @module electron-twitchsdk.js
 * @submodule init
 */

const core = require('./twitch.core')

/**
 * @typedef {Object} opt_def
 * @property {!String} client_id - Twitch Client ID
 * @property {?Object} session - Session Object
 * @property {?String} version - v5 has default
 * @property {?Boolean} debug - Debug console
 */

/**
 * @method init
 * @param {opt_def} options
 */

function init(opt) {
    if (!opt.client_id) {
        throw new Error('Client id not specified')
    }

    core.setClient(opt.client_id)

    if (opt.debug) {
        core.setDebug(opt.debug)
        core.log('Twitch SDK debug tun ON')
    }
}
exports.init = init