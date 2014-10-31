var fs = require('fs');
var md5 = require('MD5');

module.exports = function Cache(folder, life) {
	this.folder = folder;	
	this.life = life;
	self = this;

	this.get = function(key, fn) {
		if(fn === undefined) fn = function(err, data) {};
		self.getPath(key, function(err, path) {
			if(err) return fn(err, undefined);
			fs.exists(path, function(exists) {
				if(!exists) return fn(null, undefined);
				fs.stat(path, function(err, stats) {
					if(err) return fn(err, undefined);
					var fileTime = stats.mtime;
					var now = new Date();
					var diff = (now-fileTime)/60000;
					if(diff>self.life) return fn(null, undefined);
					fs.readFile(path, function(err, data) {
						if(err) return fn(err, undefined);
						fn(null, JSON.parse(data));
					});
				});
			});
		});
	}
	
	this.set = function(key, data, fn) {
		if(fn === undefined) fn = function(err) {};
		var json = JSON.stringify(data);
		self.getPath(key, function(err, path) {
			if(err) return fn(err);
			fs.writeFile(path, json, function(err) {
				if(fn !== undefined) fn(err);
			});
		});
	}

	this.getSync = function(key) {
		var path = this.getPathSync(key);
		if(!fs.existsSync(path)) return undefined;
		var fileTime = fs.statSync(path).mtime;
		var now = new Date();
		var diff = (now-fileTime)/60000;
		if(diff>this.life) return undefined;
		var json = fs.readFileSync(path);
		return JSON.parse(json);
	}

	this.setSync = function(key, data) {
		var json = JSON.stringify(data);
		fs.writeFileSync(this.getPathSync(key), json)
	}
	
	this.getPathSync = function(key) {
		if(!fs.existsSync(this.folder)) {
			throw new Error('Cache directory does not exist: ' + this.folder);
		}
		return this.folder + '/' + this.getFilename(key)
	}

	this.getPath = function(key, fn) {
		if(fn === undefined) fn = function(err, path) {};
		fs.exists(self.folder, function(exists) {
			if(!exists) {
				var err = new Error('Cache directory does not exist: ' + self.folder);
				return fn(err, undefined);
			}
			fn(null, self.folder + '/' + self.getFilename(key));
		});
	}

	this.getFilename = function(key) {
		return md5(key);
	}
}

