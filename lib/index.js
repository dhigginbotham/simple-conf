(function() {
  var config, fs, mkdirp, path, util, _;

  _ = require("lodash");

  path = require("path");

  fs = require("fs");

  util = require("util");

  mkdirp = require("mkdirp");

  config = function(opts, fn) {
    var self;
    this.title = null;
    this.protocol = "http://";
    this.host = "127.0.0.1";
    this.port = process.env.port || 3000;
    this.uri = null;
    this.db_connection = util.format("mongodb://" + this.host + ":" + "27017");
    this.db_path = null;
    this.db_uri = null;
    this.init = true;
    if (opts != null) {
      _.extend(this, opts);
    }
    if (this.uri == null) {
      this.uri = util.format(this.protocol + this.host + ":" + this.port);
    }
    if (this.db_uri == null) {
      this.db_uri = util.format(this.db_connection + "/" + this.db_path);
    }
    self = this;
    this.locals = function(req, res, next) {
      res.locals.title = self.title;
      return next();
    };
    if (typeof fn === "undefined") {
      return self;
    } else {
      return fn(self);
    }
  };

  config.prototype.extended = function(req) {
    if (req === null || typeof req === "undefined") {
      return false;
    }
    this.extended = {};
    this.extended.ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    this.extended.user = req.user != null ? req.user.username : "anonymous";
    this.extended.engine = req.protocol + "://" + req.get('host');
    return this;
  };

  config.prototype.folders = function(path, fn) {
    return fs.exists(path, function(exists) {
      if (!exists) {
        return mkdirp(path, function(err) {
          if (fn != null) {
            if (err != null) {
              return fn(err, null);
            } else {
              return fn(null, path);
            }
          } else {
            return console.log(err(err != null ? void 0 : console.log(path)));
          }
        });
      }
    });
  };

  config.prototype.colors = function() {
    this.red = '\x1B[31m';
    this.cyan = '\x1B[36m';
    this.reset = '\x1B[39m';
    return this;
  };

  config.prototype.init = function(app) {
    var self;
    self = this;
    app.set('port', self.port);
    return app.set('title', self.title);
  };

  config.prototype.secret = function() {
    return process.env.NODE_PASS || "4093055!secretPassword";
  };

  config.prototype.patchLocals = function(req, res, next) {
    var accepted, method;
    accepted = ['get', 'post'];
    method = req.method != null ? req.method.toLowerCase() : null;
    if (method != null) {
      if (accepted.indexOf(method) > -1) {
        if (req.hasOwnProperty('user')) {
          res.locals.user = req.user;
        }
        return next();
      } else {
        return next();
      }
    } else {
      return next();
    }
  };

  config.prototype.saveFile = function(output, fn) {
    var fullPath, self;
    if (typeof output !== "undefined") {
      this.output = output;
    } else {
      return fn("You must provide a path");
    }
    this.file = "config.json";
    fullPath = path.join(this.output, this.file);
    self = this;
    if (self.file != null) {
      return fs.writeFile(fullPath, JSON.stringify(self, void 0, 2), function(err) {
        if (err == null) {
          return fn(null);
        } else {
          return fn(err);
        }
      });
    }
  };

  module.exports = config;

}).call(this);
