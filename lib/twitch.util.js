'use strict'

/**
 * @module electron-twitchsdk.js
 * @submodule util
 */

/**
 * @private @method param
 * @param {Object | Array} data
 * @return {String}
 */

function param(data) {
    var i = 0
    var result = '?'

    for (const name in data) {
        if (i > 0) {
            result += '&'
        }

        if (typeof data[name] === 'object') {
            var j = 0

            for (const key in data[name]) {
                result += `${name}[${key}]=${data[name][key]}`
                if (j < Object.keys(data[name]).length - 1) {
                    result += '&'
                    j++
                }
            }
        } else {
            result += `${name}=${data[name]}`
        }

        i++
    }

    return result
}
exports.param = param

/**
 * @private @method hashDecoder
 * @param {String} hash
 * @returns {Object} Session
 */

function hashDecoder(hash) {
    if (!hash) {
        throw new Error('A hash must be specified')
    }

    var match
    var session

    var hashMatch = function (expr) {
        var match = hash.match(expr)
        return match ? match[1] : null
    }

    session = {
        token: hashMatch(/access_token=(\w+)/),
        id_token: hashMatch(/id_token=(\w+)/),
        scope: hashMatch(/scope=([\w+]+)/) ? hashMatch(/scope=([\w+]+)/).split('+') : null,
        state: hashMatch(/state=(\w+)/),
        error: hashMatch(/error=(\w+)/),
        errorDescription: hashMatch(/error_description=(\w+)/)
    }

    return session
}
exports.hashDecoder = hashDecoder

/**
 * @private @method parseParams
 * @param {String} params
 * @return {Object}
 */

function parseParams(str) {
    str = str.replace('#', '')
    var pieces = str.split('&')
    var data = {}
    var i
    var parts
    
    for (i = 0; i < pieces.length; i++) {
        parts = pieces[i].split('=')
        if (parts.length < 2) {
            parts.push("")
        }
        data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
        
        for (const key in data) {
            if (data[key].indexOf('+') > -1) {
                var value = data[key].split('+')
                data[key] = value
            }
        }
    }

    return data
}
exports.parseParams = parseParams