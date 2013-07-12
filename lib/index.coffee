_ = require "underscore"
mkdirp = require "mkdirp"
_secret = "superSecretPassWordDawgz1!2@"
_password = process.env.NODE_PASS || _secret

config = (opts, defaults) ->

  if not defaults? or defaults == true
    @app = {}
    @app.title = "Default-config-build"
    @app.initials = "dcb"
    @app.port = process.env.port || 3000
    @app.host = "http://localhost#{@app.port}"
    @app.serverStart = "Starting express server "

    @db = {}
    @db.path = "#{@app.initials}"
    @db.url = process.env.MONGO_DB_STRING || "mongodb://localhost/#{@db.path}"

    @sesh = {}
    @sesh.key = "#{@app.initials}.id"
    @sesh.secret = _password
    @sesh.maxAge = 60 * 60 * 1000

    @seed = {}
    @seed.init = false
    @seed.folders = true

    @users = {}
    @users.roles = ['user', 'admin', 'editor', 'commenter']
    @users.signupEnabled = true

    @debug = {}
    @debug.override = false

  if opts? then _.extend @, opts

  if not defaults? and @seed.init == true
    @seed.user = {}
    @seed.user.username = "admin"
    @seed.user.password = _password
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
