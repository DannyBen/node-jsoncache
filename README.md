# JsonCache

A Node.js module for caching JSON objects or raw data.

## Install

	npm install jsoncache

## Use

~~~ javascript
var Cache = require('jsoncache');

var cache = new Cache({ dir: './cache', life: 1, mode: 'json' });
var data = { firstName: "Bruce", lastName: "Dickinson" };

// Using the sync methods 
cache.setSync('key', data);
var restored = cache.getSync('key');
console.log(restored);

// Using the async methods
cache.set('keyasync', data, function(err) {
	if(err) console.log(err.message);
});

cache.get('keyasync', function(err, data) {
	if(err) console.log(err.message);
	if(data === undefined) console.log('cache expired');
	console.log(data);
});
~~~

