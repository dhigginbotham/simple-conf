simple-conf <img src="https://drone.io/github.com/dhigginbotham/simple-conf/status.png" align="right" />
===========
Super simple config module that allows you to easily share some config options for your application with a few helpers. I wrote this because I needed something fairly static for my express sub applications.

### Config Helpers
`extended` - requires `req` good for middleware, or schema stuff that has access to req, adds:
  - `ip` - real ip
  - `user` - current user if there is one
  - `engine` - current app uri

`folders` - requires `path` & `function (err, path)`
  - adds folders easily so you don't have to deal with `.placeholder` files and whatnot

`colors` - no requirements
  - `red` outputs red font color to stdout
  - `cyan` outputs cyan font color to stdout
  - `reset` resets font color to stdout

`init` - requires `app` from `express`
  sets application port and title, can be extended

`secret()` - keeps your sensitive stuff in a prototype and grabs from `process.env.NODE_PASS` defaults inside source

`locals()` - sets `res.locals.title` to your application title, extendable

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
