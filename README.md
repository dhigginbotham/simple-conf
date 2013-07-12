simple-conf
===========

easy to use config object for your node.js app

### Installation

Step 1) `npm install git+https://github.com/dhigginbotham/simple-conf --save`

Step 2) view `/examples/config.coffee` (or copy and paste to your app)

Step 3) require the config.coffee folder inside your app somewhere and `console.log`

### Heads up!
simple-conf is set to look for a couple environment vars by default, although, if you don't want to set these it will set some defaults instead..
  - `process.env.NODE_PASS`, this will set your initial seed admin password and keep this sensitive stuff
  out of your repo. defaults to: `superSecretPassWordDawgz1!2@`
  
  - `process.env.MONGO_DB_STRING`, this will link up your mongodb url, good for production and public repos

  - I don't want to set these up! Oh, that's cool too -- it's not going to break, it's just there to help.

### Config Helpers (new)
I've included a couple helpers that I use on my apps and find helpful -- maybe you will too?

`extended` - requires `req` good for middleware, or schema stuff that has access to req, adds:
  - `ip = req.headers["x-forwarded-for"] or req.connection.remoteAddress`
  - `user = if req.user? then req.user.username else "anonymous"`
  - `engine = req.protocol + "://" + req.get('host')`

`folders` - requires `path` & `function (err, path)`
  - adds folders easily so you don't have to deal with `.placeholder` files and whatnot

`colors` - no requirements
  - `red` outputs red font color to stdout
  - `cyan` outputs cyan font color to stdout
  - `reset` resets font color to stdout

### Defaults
`note` - defaults are now optional, ex: `new Config object, false` renders a more modular config for mountable apps.

```coffee

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
  @sesh.secret = _secret
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

  if @seed.init == true
    @seed.user = {}
    @seed.user.username = "admin"
    @seed.user.password = "@dminPassw0rd"
    @seed.user.admin = true
    @seed.user.role = "admin"
    @seed.user.email = "admin@localhost.it"
    @seed.user.ip = "admin.ipv6"

  @

```

### Example
```coffee

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

conf = new Config config

if conf.debug.config == true then console.log conf

module.exports = conf

```

### License
```md

The MIT License (MIT)

Copyright (c) 2013 David Higginbotham 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

```
