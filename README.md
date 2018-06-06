# Electron Twitch SDK JS
The project has based on [Twitch Javascript SDK](https://github.com/justintv/twitch-js-sdk) and [twitch-sdk](https://www.npmjs.com/package/twitch-sdk), updated to work with the [new Twitch API](https://dev.twitch.tv/docs) to [electron](https://electron.io)

## Install
By NPM
```
$ npm install -s electron-twitchsdk.js
```
## Import
```
const Twitch = require('electron-twitchsdj.js')
```
or
```
import Twitch from 'electron-twitchsdk.js'
```

## Init
To init the client, you need call the function ``init()`` with this params
```
Twitch.init({
	client_id: 'YOU TWITCH APP CLIENT ID',
	session: OBJECT, // Session stored returning after login
	redirect: { // If you need change the default redirect_uri (also you can use this https://api.twitch.tv/helix/)
		uri: 'https://api.twitch.tv/helix/', // Full URI
		host: 'api.twitch.tv', // Host
		path: '/helix/' // Path
	},
	debug: Boolean // Default has false, in true log events and request
}, (err, status) => {
	// Callback	
})
```
Status structure
```
{
	authenticated: Boolean,
	access_token: String,
	id_token: String,
	scopes: Array,
	error: Object || String,
	user_id: String,
	login: String // this is a twitch username
}
```

## Login and logout
To login use the funtion with scopes
```
Twitch.login({
	scope: ['user_read', 'channel_read'] // and more
}, (err, status) => {
	// Callback
	// Status structure and data like init status return
}
```

To logout
```
Twitch.logout((err, status) => {
	// Callback
	// Status return {success: true} in case of... successful logout(?
})
```
## Events
You can register events to get data

 - twitch.login - Event emited on login success
 - twithc.logout - Event emited on logout successful
```
Twitch.event.on('twitch.login', (err, status) => {
	// Status... like... login funtion(?
})
```

## Use Twitch API endpoints
Use this function to consume twitch api endpoints
```
Twitch.api({
	params: { // URL/?...
		login: 'username' 
	},
	path: string, // You can change path to request, default has '/helix/' for the new API, but, you can put '/kraken/' to use V5
	point: String, // API endpoint, path + point -> '/helix/users/`
	method: String // Request method, default 'GET'
}, (err, data) => {
	// Callback
	// Data = api response
})
```

## Test
You can test the SDK with
```
$ electron ./test/app.js id <client_id> scope '["user_read", "channel_read"]'
```