'use strict'

/**
 * @file Main of the Twitch SDK
 * @module electron-twitchsdk.js
 * @version 0.1.0
 * @author OsirisFrik <osiris@frikdev.com> <https://github.com/OsirisFrik>
 */

/**
 * @class Twitch
 */

const init = require('./lib/twitch.init')
const auth = require('./lib/twitch.auth')
const core = require('./lib/twitch.core')

// Init
exports.init = init.init

// API
exports.api = core.api

// Events
/**
 * @method events.on
 * SDK events
 * 'login'
 * 'logout'
 */
exports.events = core.events

// Auth
exports.login = auth.login
exports.logout = auth.logout