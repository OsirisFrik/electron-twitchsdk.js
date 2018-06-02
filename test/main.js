'use strict'

const twitch = require('../twitch')
const env = require('electron').remote.require('./app.js').env

twitch.init({
    client_id: env.client_id,
    debug: true
})

function login() {
    twitch.login({scope: ['user_read', 'channel_read', 'openid']}, (err, status) => {
        if (err) {
            return alert('ERROR')            
        }
        alert(`Hola ${status.login}`)
    })
}

window.onload = function () {
    document.getElementById('t_login').addEventListener('click', (e) => {
        login()
    })
}