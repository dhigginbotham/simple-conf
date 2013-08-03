var Config = require("../lib");

var fs = require("fs");
var path = require("path");

var env = process.env.NODE_ENV;

var port = env === "production" ? process.env.port : 3000;
var host = env === "development" ? "http://localhost:" + port : undefined;

var production = env === "production";

var development = env === "development";

config = {
  api: {
    github: {
      username: "dhigginbotham"
    },
    coderbits: {
      username: "dhz"
    }
  },
  app: {
    title: "example",
    initials: "exp",
    port: port,
    host: host,
    serverStart: "Starting up your express engines",
    paths: {
      uploads: path.join(__dirname, "..", "public", "uploads"),
      views: path.join(__dirname, "..", "views"),
      assets: path.join(__dirname, "..", "public")
    }
  },
  seed: {
    init: production === true ? false : false
  },
  debug: {
    config: production === true ? false : false
  }
};

conf = new Config(config);

if (conf.debug.config === true) {
  console.log(conf);
}

module.exports = conf;