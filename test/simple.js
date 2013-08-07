var expect = require('expect.js');
var config = require('../lib');
var json = require('./config.json');

describe('simple-conf json tests', function () {

  it('should build a config out of our json', function (done) {
    var conf = new config(json);

    expect(conf).not.to.be(undefined);
    expect(conf.title).to.be('Test Config: JSON');
    expect(conf.db_path).to.be('test');
    expect(conf.port).to.be(1337);
    expect(conf.init).to.be(false);

    done();

  });

});