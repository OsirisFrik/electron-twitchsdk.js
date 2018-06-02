const electron = require('electron')
const {
    app,
    BrowserWindow
} = electron
const path = require('path')
const url = require('url')

let win

function initApp() {
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