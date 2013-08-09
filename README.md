## simple-conf <img src="https://drone.io/github.com/dhigginbotham/simple-conf/status.png" align="right" />
Super simple config module that allows you to easily share some config options for your application with a few helpers. I wrote this because I needed something fairly static for my express sub applications.

#### Heads up!
I am still fairly regularly breaking, refactoring and perfecting my universal strategy to making one simple config file... to rule them all. (jk, if i wanted that i wouldn't have written this in coffeescript right? :neck_beard:) However, if you have any issues you should send me an issue so I can fix it.

## Example

```js
var Config = require('simple-conf');

var options = {
  title: "Some example title",
  db_path: "test",
  port: 1337,
  init: false
};

var config = new Config(options);
```

## Quick overview

### `new Config(options)`
**Returns**

*If your options object looks like this:*

```js
{
  "title": "Some example title",
  "db_path": "test",
  "port": 1337,
  "init": false
}
```

*Your output would be:*

```js
{
  "title": "Some example title",
  "protocol": "http://",
  "host": "127.0.0.1",
  "port": 1337,
  "uri": "http://127.0.0.1:1337",
  "db_connection": "mongodb://127.0.0.1:27017",
  "db_path": "test",
  "db_uri": "mongodb://127.0.0.1:27017/test",
  "init": false
}
```

----

### `config.safeFile(path, callback)`
Stores your config data to `config.json`, so you can load your app with that instead of this module. I use it for client setups, so when they deploy their application I don't need to worry about a db being down, or this module not building.

**Returns**

- `config.json` in the path specified

----

### `config.extended(req)`
Useful when you have access to the `req` object in express.js

**Returns**

- `ip` - client ip, not the server/router ip
- `user` - if `req.user` exists it stores it to this
- `engine` - application uri

----

### `config.folders(path, callback)`
Creates folders easily so you don't have to deal with `.placeholder` or alike workarounds

**Returns** 

- `success` or `failure` message

----

### `config.colors()`
Helpful when dealing with a lot of `console.`

**Returns**
- `red`
- `cyan`
- `reset`

----

### `config.secret()`
Keeps your sensitive stuff in a prototype and grabs from `process.env.NODE_PASS` defaults inside source

**Returns**

- `secret`

----

### `config.locals()`
*Deprecated*, planning on destroying this soon.

----

### `config.init(app)`
If you're building a lot of express apps this binds the title and port, more coming soon..

----

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
