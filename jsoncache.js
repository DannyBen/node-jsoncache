var fs = require('fs');
var md5 = require('MD5');

module.exports = function Cache(opts) {
	if (opts === undefined) opts = {};
	this.dir  = opts.dir  || './cache';
	this.life = opts.life || 240;
	this.mode = opts.mode || 'json'; // json | string | raw
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
						var result = self.mode == 'json' 
							? JSON.parse(data)
							: self.mode == 'string'
							? data.toString()
							: data;
						fn(null, result);
					});
				});
			});
		});
	}
	
	this.set = function(key, data, fn) {
		if(fn === undefined) fn = function(err) {};
		if (this.mode == 'json') data = JSON.stringify(data);
		self.getPath(key, function(err, path) {
			if(err) return fn(err);
			fs.writeFile(path, data, function(err) {
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
		var data = fs.readFileSync(path);
		return self.mode == 'json' 
			? JSON.parse(data)
			: self.mode == 'string'
			? data.toString()
			: data;
	}

	this.setSync = function(key, data) {
		if (!this.raw) data = JSON.stringify(data);
		fs.writeFileSync(this.getPathSync(key), data)
	}
	
	this.getPathSync = function(key) {
		if(!fs.existsSync(this.dir)) {
			throw new Error('Cache directory does not exist: ' + this.dir);
		}
		return this.dir + '/' + this.getFilename(key)
	}

	this.getPath = function(key, fn) {
		if(fn === undefined) fn = function(err, path) {};
		fs.exists(self.dir, function(exists) {
			if(!exists) {
				var err = new Error('Cache directory does not exist: ' + self.dir);
				return fn(err, undefined);
			}
			fn(null, self.dir + '/' + self.getFilename(key));
		});
	}

	this.getFilename = function(key) {
		return md5(key);
	}
}

