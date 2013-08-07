var expect = require('expect.js');
var request = require('superagent');
var config = require('../lib');
var json = require('./config.json');
var conf = new config(json);
var util = require('util');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var connected = null

app.set('port', conf.port);


app.get('/', function (req, res) {
  res.send("testing, testing");
});

server.listen(app.get('port'), function () {
  connected = util.format('simple-conf test express server launching on %s', app.get('port'));
});

describe('simple-conf test express server', function () {

  it('validate `connected`', function (done) {
    expect(connected).not.to.be(null);
    expect(connected).not.to.be(undefined);
    expect(connected).to.equal(util.format('simple-conf test express server launching on %s', app.get('port')));

    done();

  });

});

describe('simple-conf json tests', function () {

  it('should build a config out of our json', function (done) {

    expect(conf).not.to.be(undefined);
    expect(conf.title).to.be('Test Config: JSON');
    expect(conf.db_path).to.be('test');
    expect(conf.port).to.be(1337);
    expect(conf.init).to.be(false);

    done();

  });

});

describe('simple-conf helpers tests', function () {


  it('should have access to colors', function (done) {

    var colors = conf.colors();
    expect(colors).not.to.be(undefined);
    expect(colors).not.to.be(null);
    expect(colors.hasOwnProperty('red')).to.equal(true);
    expect(colors.hasOwnProperty('reset')).to.equal(true);
    expect(colors.hasOwnProperty('cyan')).to.equal(true);
    done();

  });

  it('should have access to patchLocals', function (done) {

    app.use( function (req, res, next) {
      req.user = {username: "test", _id: "1111", admin: true}
      next();
    });

    app.use(conf.patchLocals);
    
    done();

  });

});