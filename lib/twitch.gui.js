'use strict'

const URL = require('url')
const { BrowserWindow } = require('electron').remote
const util = require('./twitch.util')
const core = require('./twitch.core')
const auth = require('./twitch.auth')

/**
 * @method popup
 * @param {Array | Object} params
 */

let win

function popup(params, callback) {
    if (params.scope.indexOf('openid') > -1) {
        params.response_type += '+id_token'
    }
    

    var url = `${core.API.auth}authorize${util.param(params)}`

    win = new BrowserWindow({
        width: 600,
        height: 600,
        resizable: false,
        show: false,
        webPreferences: {
            nodeIntegration: false
        }
    })

    win.loadURL(url)
    win.webContents.on('did-finish-load', () => {
        var location = URL.parse(win.webContents.getURL())
        core.log(location)
        if (location.hostname == core.API.host && location.pathname == core.API.path) {            
            core.setSession(util.parseParams(location.hash))
            auth.updateSession(callback)
            win.close()
        } else {
            win.show()
        }
    })
}
exports.popup = popup