var Cache = require('jsoncache');
var cache = new Cache('./cache', 1);

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

