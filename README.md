simple-conf
===========

easy to use config object for your node.js app

### Installation

Step 1) `npm install git+https://github.com/dhigginbotham/simple-conf --save`

Step 2) view `/examples/config.coffee` (or copy and paste to your app)

Step 3) require the config.coffee folder inside your app somewhere and `console.log`

### Nice things to have
for ease this module is going to look for `process.env.NODE_PASS` as well as `process.env.MONGO_DB_STRING` -- it's good practice to keep these things off your repo, so set a cpl env vars, otherwise it's going to default to some silly password.

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
