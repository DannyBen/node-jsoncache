var Cache = require('./jsoncache');
var cache = new Cache('./cache', 1);

var storeMe = { firstName: "Bruce", lastName: "Dickinson" }

// Using the sync methods
cache.setSync('testkey', storeMe);
var restored = cache.getSync('testkey');
console.log(restored);

// Using the async methods
cache.set('asynckey', storeMe, function(err) {
	if(err) console.log(err.message);
});

cache.get('asynckey', function(err, data) {
	if(err) console.log(err.message);
	console.log(data);
});

