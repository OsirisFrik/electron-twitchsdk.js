'use strict'

const URL = require('url')
const { BrowserWindow } = require('electron').remote
const util = require('./twitch.util')
const core = require('./twitch.core')

/**
 * @method popup
 * @param {Array | Object} params
 */

let win

function popup(params) {
    var scope = ['user_read', 'channel_read', 'openid']
    var params = {
        client_id: core.clientId,              
        redirect_uri: core.API.redirect.uri,
        response_type: 'token',
        scope: scope.join(' ')
    }

    if (scope.indexOf('openid') > -1) {
        params.response_type += '+id_token'
    }
    

    var url = core.API.auth + util.param(params)

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
            core.log(util.parseParams(location.hash))
            win.close()
        } else {
            win.show()
        }
    })
}
exports.popup = popup