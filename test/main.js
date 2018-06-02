'use strict'

const twitch = require('../twitch')
const env = require('electron').remote.require('./app.js').env

twitch.init({
    client_id: env.client_id,
    debug: true
})

function login() {
    twitch.popup()
}

window.onload = function () {
    document.getElementById('t_login').addEventListener('click', (e) => {
        login()
    })
}