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