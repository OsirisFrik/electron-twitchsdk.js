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

    core.api(options, callback)
}
exports.updateSession = updateSession

/**
 * @method login
 * @param {Object} options
 * @param {(err, status)} [callback]
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