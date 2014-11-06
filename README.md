# JsonCache

A Node.js module for caching JSON objects or raw data.

## Install

	npm install jsoncache

## Use

~~~ javascript
var Cache = require('jsoncache');

// Set cache folder and cache life in minutes
var cache = new Cache({dir: './cache', life: 60, mode: 'json');

var storeMe = { firstName: "Bruce", lastName: "Dickinson" }

// Using the sync methods
cache.setSync('testkey', storeMe);
var restored = cache.getSync('testkey');
console.log(restored);

// Using the async methods
cache.set('asynckey', storeMe, function(err) {
	if(err) throw err;
});

cache.get('asynckey', function(err, data) {
	if(err) throw err;
	console.log(data);
});
~~~

