_ = require "underscore"
fs = require "fs"
mkdirp = require "mkdirp"

badPwd = "superSecretPassword123456"
pwd = process.env.NODE_PASS || badPwd

if pwd == badPwd then console.log "It is recommended that you set `process.env.NODE_PASS` before continuing.."

config = (opts) ->

  @app = {}
  @app.title = "Default-config-build"
  @app.initials = "dcb"
  @app.port = process.env.port || 3000
  @app.host = "http://localhost#{@app.port}"
  @app.serverStart = "Starting express server "

  @db = {}
  @db.path = "#{@app.initials}"
  @db.url = process.env.MONGO_DB_STRING || "mongodb://localhost/#{@db.path}"

  @envars = ['NODE_PASS', 'MONGO_DB_STRING']

  @sesh = {}
  @sesh.key = "#{@app.initials}.id"
  @sesh.secret = pwd
  @sesh.maxAge = 60 * 60 * 1000

  @seed = {}
  @seed.init = false
  @seed.folders = true

  @users = {}
  @users.roles = ['user', 'admin', 'editor', 'commenter']

  @debug = {}
  @debug.override = false

  if opts? then _.extend @, opts

  @env = {}

  for env in @envars
    @env[env] = process.env[env]

  if @seed.init == true
    @seed.user = {}
    @seed.user.username = "admin"
    @seed.user.password = pwd
    @seed.user.admin = true
    @seed.user.role = "admin"
    @seed.user.email = "admin@localhost.it"
    @seed.user.ip = "admin.ipv6"

  @

config::extended = (req) ->

  return false if req == null or typeof req == "undefined"

  @_extended = {}
  @_extended.ip = req.headers["x-forwarded-for"] or req.connection.remoteAddress
  @_extended.user = if req.user? then req.user.username else "anonymous"
  @_extended.engine = req.protocol + "://" + req.get('host')
  
  @

config::folders = (path, fn) ->
  fs.exists path, (exists) ->
    if not exists
      mkdirp path, (err) ->
        if fn?
          return if err? then fn err, null else fn null, path
        else
          console.log err if err? else console.log path

config::colors = ->
  @red = '\x1B[31m'
  @cyan = '\x1B[36m'
  @reset = '\x1B[39m'

module.exports = config
