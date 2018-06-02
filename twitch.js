'use strict'
const init = require('./lib/twitch.init')
const gui = require('./lib/twitch.gui')
const auth = require('./lib/twitch.auth')

// Init
exports.init = init.init

// popup
exports.popup = gui.popup

//login
exports.login = auth.login