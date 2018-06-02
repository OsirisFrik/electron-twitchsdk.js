const electron = require('electron')
const {
    app,
    BrowserWindow
} = electron
const path = require('path')
const url = require('url')

const commands = process.argv
var env = {}
for (let i = 0; i < commands.length; i++) {
    const element = commands[i];

    if (~['client', '-tc', 'client_id', 'twitch_cleint', 'id'].indexOf(element)) {
        env.client_id = commands[i + 1]
    }
}

let win

function initApp() {
    exports.env = env
    createWindows()
}

function createWindows() {
    win = new BrowserWindow({
        width: 1090,
        height: 800,
        darkTheme: true
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.webContents.openDevTools()
}

app.on('ready', initApp)