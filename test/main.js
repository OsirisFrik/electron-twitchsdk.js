'use strict'

const twitch = require('../twitch')
const env = require('electron').remote.require('./app.js').env
var session = JSON.parse(localStorage.getItem('twitch'))

twitch.init({
    client_id: env.client_id,
    session: session,
    debug: true
}, (err, status) => {
    console.log(err, status);
    console.log(env.scopes)
})

function login() {
    twitch.login({scope: env.scopes || ['user_read', 'channel_read', 'openid']}, (err, status) => {
        if (err) {
            return alert('ERROR')            
        } else {
            return alert(`Hi ${status.login}`)
        }        
    })
}

function logout() {
    twitch.logout((err, status) => {
        localStorage.removeItem('twitch')
        session = null
    })
}

twitch.events.addListener('twitch.login', status => {
    localStorage.setItem('twitch', JSON.stringify(status))
    console.log('twitch login event')    
})

twitch.events.addListener('twitch.logout', (err, data) => {
    console.log('twitch logout event');
    
})

window.onload = function () {
    document.getElementById('t_login').addEventListener('click', () => {
        login()
    })

    document.getElementById('t_logout').addEventListener('click', e => {
        logout()
    })
}