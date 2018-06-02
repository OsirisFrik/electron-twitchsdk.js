'use strict'

const twitch = require('../twitch')

twitch.init({
    client_id: 'm4j7uf7x6f4mt1m815hvaxychxfg4y',
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