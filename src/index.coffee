_ = require "lodash"
path = require "path"
fs = require "fs"
util = require "util"
mkdirp = require "mkdirp"

config = (opts, fn) ->

  @title = null
  
  @protocol = "http://"

  @host = "127.0.0.1"

  @port = process.env.port or 3000

  @uri = null

  @db_connection = util.format "mongodb://" + @host + ":" + "27017"
  @db_path = null
  @db_uri = null

  @init = true

  if opts? then _.extend @, opts

  if not @uri? then @uri = util.format @protocol + @host + ":" + @port
  
  if not @db_uri? then @db_uri = util.format @db_connection + "/" + @db_path

  self = @

  @locals = (req, res, next) ->
    res.locals.title = self.title
    next()

  return if typeof fn == "undefined" then self else fn self

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
  @

config::init = (app) ->
  
  self = @

  app.set 'port', self.port
  app.set 'title', self.title

config::secret = ->
  return process.env.NODE_PASS or "4093055!secretPassword"

config::patchLocals = (req, res, next) ->
  # patch middleware for res.locals.user
  accepted = ['get', 'post']
  method = if req.method? then req.method.toLowerCase() else null
  
  if method? 
    if accepted.indexOf(method) > -1
      if req.hasOwnProperty('user') then res.locals.user = req.user
      next()
    else next()
  else next()

config::saveFile = (output, fn) ->

  # check for existance of path, if it's not set we're going to have issues...
  if typeof output != "undefined" then @output = output else return fn("You must provide a path")

  # default config object
  @file = "config.json"

  # build the full file output for `config.json`
  fullPath = path.join @output, @file

  self = @

  # check for a file path and make a file, easy.
  if self.file? then fs.writeFile fullPath, JSON.stringify(self, undefined, 2), (err) ->
    unless err? then fn(null) else fn(err)

module.exports = config
