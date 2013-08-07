(function() {
  var config, fs, mkdirp, path, util, _;

  _ = require("lodash");

  path = require("path");

  fs = require("fs");

  util = require("util");

  mkdirp = require("mkdirp");

  config = function(opts, cleanup, fn) {
    var self;
    this.title = null;
    this.protocol = "http://";
    this.host = "127.0.0.1";
    this.port = process.env.port || 3000;
    this.uri = null;
    this.db_connection = util.format("mongodb://" + this.host + ":" + "27017");
    this.db_path = null;
    this.db_uri = null;
    this["public"] = path.join(__dirname, "..", "public");
    this.uploads = path.join(__dirname, "..", "public", "uploads");
    this.views = path.join(__dirname, "..", "views");
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
    if (cleanup === true) {
      delete this.init;
      delete this.protocol;
      delete this.host;
      delete this.port;
      delete this.db_connection;
      delete this.db_path;
    }
    self = this;
    this.locals = function(req, res, next) {
      res.locals.title = self.title;
      return next();
    };
    return self;
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
    return this.reset = '\x1B[39m';
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

  module.exports = config;

}).call(this);
