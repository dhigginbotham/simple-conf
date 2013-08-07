_ = require "lodash"
path = require "path"
fs = require "fs"
util = require "util"
mkdirp = require "mkdirp"

config = (opts, cleanup, fn) ->

  @title = null
  
  @protocol = "http://"

  @host = "127.0.0.1"

  @port = process.env.port or 3000

  @uri = null

  @db_connection = util.format "mongodb://" + @host + ":" + "27017"
  @db_path = null
  @db_uri = null

  @public = path.join __dirname, "..", "public"
  @uploads = path.join __dirname, "..", "public", "uploads"
  @views = path.join __dirname, "..", "views"

  @init = true

  if opts? then _.extend @, opts

  if not @uri? then @uri = util.format @protocol + @host + ":" + @port
  
  if not @db_uri? then @db_uri = util.format @db_connection + "/" + @db_path
  
  if cleanup == true
    delete @init
    delete @protocol
    delete @host
    delete @port
    delete @db_connection
    delete @db_path

  self = @

  @locals = (req, res, next) ->
    res.locals.title = self.title
    next()

  self

config::extended = (req) ->

  return false if req == null or typeof req == "undefined"

  @extended = {}
  @extended.ip = req.headers["x-forwarded-for"] or req.connection.remoteAddress
  @extended.user = if req.user? then req.user.username else "anonymous"
  @extended.engine = req.protocol + "://" + req.get('host')
  
  @

config::folders = (path, fn) ->
  fs.exists path, (exists) ->
    if not exists then mkdirp path, (err) ->
      if fn?
        return if err? then fn err, null else fn null, path
      else
        console.log err if err? else console.log path

config::colors = ->
  @red = '\x1B[31m'
  @cyan = '\x1B[36m'
  @reset = '\x1B[39m'

config::init = (app) ->
  
  self = @

  app.set 'port', self.port
  app.set 'title', self.title

config::secret = ->
  return process.env.NODE_PASS or "4093055!secretPassword"

module.exports = config
