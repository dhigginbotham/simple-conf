Config = require ".."

fs = require "fs"
path = require "path"

env = process.env.NODE_ENV

port = if env == "production" then process.env.port else 3000
host = if env == "development" then "http://localhost:#{port}" 

production = env == "production"
development = env == "development"

config =
  api:
    github:
      username: "dhigginbotham"
    coderbits:
      username: "dhz"
  app:
    title: "example-app"
    initials: "xpl"
    port: port
    host: host
    serverStart: "Starting up your express engines"
    paths: 
      uploads: path.join __dirname, "..", "public", "uploads"
      views: path.join __dirname, "..", "views"
      assets: path.join __dirname, "..", "public"
  seed:
    init: if production == true then false else true
  debug:
    mongo: if production == true then false else false
    config: if production == true then false else true

conf = new Config config

if conf.debug.config == true then console.log conf

module.exports = conf
