'use strict'
/**
 * @module electron-twitchsdk.js
 * @submodule auth
 */

const core = require('./twitch.core')
const gui = require('./twitch.gui')

/**
 * @private @method updateSession
 */
function updateSession(callback) {
    let options = {
        host: core.API.auth_host,
        path: `${core.API.auth_path}validate`
    }

    core.api(options, (err, data) => {

        if (err) {
            callback(err, null)
        } else {
            var session = makeSession({
                access_token: core.session.access_token,
                id_token: core.session.id_token,
                scopes: data.scopes,
                user_id: data.user_id,
                login: data.login,
                error: err
            })

            core.setSession(session)
            if (session.authenticated) {
                core.events.emit('twitch.login', session)
                callback(err, session)
            } else {
                callback(err, session)
            }            
        }
    })
}
exports.updateSession = updateSession

/**
 * @method makeSession
 * @returns {Object}
 */

function makeSession(session) {
    return {
        authenticated: !!session.access_token,
        access_token: session.access_token,
        id_token: session.id_token,
        scopes: session.scopes,
        error: session.error,
        user_id: session.user_id,
        login: session.login
    }
}

/**
 * @private @method initSession
 * @param {Object} session
 * @param {(err, stauts)} [callback]
 */

function initSession(session, callback) {
    if (typeof session === 'function') {
        callback = session
    }

    core.setSession((session && makeSession(session) || {}))
    updateSession(callback)
}

exports.initSession = initSession

/**
 * Open login popup for Twitch 
 * @method login
 * @param {Object} options
 * @param {(err, status)} [callback]
 * @example 
 * ```javascript
 * twitch.login({scope: ['user_read', 'channel_read']}, (err, status) => {
 *  // Callback
 * })```
 */

function login(options, callback) {
    if (!options.scope) {
        throw new Error('Mus specify list of requested scopes')
    }

    var params = {
        client_id: core.clientId,
        redirect_uri: core.API.redirect.uri,
        scope: options.scope.join(' '),
        response_type: 'token'
    }

    if (options.scope.indexOf('openid') > -1) {
        params.response_type += '+id_token'
    }

    if (!params.client_id) {
        throw new Error('You must call init() before login()')
    }

    gui.popup(params, callback)
}

exports.login = login

/**
 * Twitch logout revoke token access
 * @method logout
 * @param {(err, status)} [callback]
 * @return {Object}
 * @example 
 * ```javascript
 * Twitch.logout((err, status) => {
 *  // Callback
 * })```
 */

function logout(callback) {
    var opt = {
        params: {
            client_id: core.clientId,
            token: core.session.access_token
        },
        host: core.API.auth_host,
        path: `${core.API.auth_path}revoke`,
        method: 'POST'
    }

    core.setSession({})
    core.api(opt, (err, data) => {
        core.events.emit('twitch.logout', (err, data))
        callback(err, data)
    })
}
exports.logout = logout