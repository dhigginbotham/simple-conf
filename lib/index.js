(function() {
  var badPwd, config, fs, mkdirp, pwd, _;

  _ = require("underscore");

  fs = require("fs");

  mkdirp = require("mkdirp");

  badPwd = "superSecretPassword123456";

  pwd = process.env.NODE_PASS || badPwd;

  if (pwd === badPwd) {
    console.log("!!!!!!!!!!! It is recommended that you set `process.env.NODE_PASS` before continuing..");
  }

  config = function(opts) {
    var env, _i, _len, _ref;
    this.app = {};
    this.app.title = "Default-config-build";
    this.app.initials = "dcb";
    this.app.port = process.env.port || 3000;
    this.app.host = "http://localhost:" + this.app.port;
    this.app.serverStart = "Starting express server ";
    this.db = {};
    this.db.path = "" + this.app.initials;
    this.db.url = process.env.MONGO_DB_STRING || ("mongodb://localhost/" + this.db.path);
    this.envars = ['NODE_PASS', 'MONGO_DB_STRING'];
    this.sesh = {};
    this.sesh.key = "" + this.app.initials + ".id";
    this.sesh.secret = pwd;
    this.sesh.maxAge = 60 * 60 * 1000;
    this.seed = {};
    this.seed.init = true;
    this.seed.folders = true;
    this.users = {};
    this.users.roles = ['user', 'admin', 'editor', 'commenter'];
    this.debug = {};
    this.debug.override = false;
    if (opts != null) {
      _.extend(this, opts);
    }
    this.env = {};
    _ref = this.envars;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      env = _ref[_i];
      if (process.env.hasOwnProperty(env)) {
        this.env[env] = process.env[env];
      }
    }
    if (this.seed.init === true) {
      this.seed.user = {};
      this.seed.user.username = "admin";
      this.seed.user.password = pwd;
      this.seed.user.admin = true;
      this.seed.user.role = "admin";
      this.seed.user.email = "admin@localhost.it";
      this.seed.user.ip = "admin.ipv6";
    }
    return this;
  };

  config.prototype.extended = function(req) {
    if (req === null || typeof req === "undefined") {
      return false;
    }
    this._extended = {};
    this._extended.ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    this._extended.user = req.user != null ? req.user.username : "anonymous";
    this._extended.engine = req.protocol + "://" + req.get('host');
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

  module.exports = config;

}).call(this);
