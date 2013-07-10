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

```js

config = {
  app: {
    title: String
    initials: String
    port: Number
    host: String
    serverStart: String
  },
  db: {
    path: String
    url: String //note, it's looking for `process.env.MONGO_DB_STRING` for ease, falls back to local mongourl
  },
  sesh: {
    key: String
    secret: String
    maxAge: Number
  },
  seed: {
    init: Boolean
    folders: Boolean
  },
  users: {
    roles: Array
    signupEnabled: Boolean
  },
  debug: {
    override: Boolean
  }
};

```

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