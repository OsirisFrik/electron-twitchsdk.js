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
    var scope = ['user_read', 'channel_read']
    var params = {
        client_id: core.clientId,              
        redirect_uri: 'https://api.twitch.tv/kraken/',
        response_type: 'token',
        scope: scope.join(' ')
    }
    console.log(util.param(params));
    

    var url = `https://api.twitch.tv/kraken/oauth2/authorize?${util.param(params)}`

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
        if (location.hostname == 'api.twitch.tv' && location.pathname == '/kraken/') {            
            console.log(util.hashDecoder(location.hash));
            
            win.close()
        } else {
            win.show()
        }
    })
}
exports.popup = popup