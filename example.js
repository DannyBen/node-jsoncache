var Cache = require('./jsoncache');

exampleJson();
// exampleString();
// exampleRaw();

function exampleJson() {
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
}

function exampleString() {
	var cache = new Cache({ dir: './cache', life: 1, mode: 'string' });
	var data = "Joey doesn't share food";

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
}

function exampleRaw() {
	var cache = new Cache({ dir: './cache', life: 1, mode: 'raw' });
	var data = "Joey doesn't share food";

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
}