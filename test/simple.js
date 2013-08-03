var expect = require('expect.js');
var config = require('../lib');

describe('Build out config object', function () {

  var conf = new config();

  var SECRET_PASSWORD_ENV = 'something';

  describe('Validate object options', function () {

    it('should match the `conf.app` setting defaults', function (done) {

      expect(conf.app.title).to.equal('Default-config-build');
      expect(conf.app.initials).to.equal('dcb');    
      expect(conf.app.port).to.equal(3000);    
      expect(conf.app.host).to.equal('http://localhost:3000')    
      expect(conf.app.serverStart).to.equal('Starting express server ');    

      done();

    });

    it('should match the `conf.db` setting defaults', function (done) {

      expect(conf.db.path).to.equal('dcb');
      expect(conf.db.url).to.equal('mongodb://localhost/dcb');

      done();

    });

    it('should match the `conf.envars` & `conf.env` setting defaults', function (done) {

      conf.envars.forEach(function (env) {

        if (process.env.hasOwnProperty(env)) {
          expect(conf.env[env]).to.not.be(null);
        }

      });

      done();

    });

    it('should match the `conf.sesh` setting defaults', function (done) {

      expect(conf.sesh.key).to.equal('dcb.id');
      expect(conf.sesh.secret).to.equal(SECRET_PASSWORD_ENV);
      expect(conf.sesh.maxAge).to.equal(3600000);

      done();

    });

    it('should match the `conf.seed` setting defaults', function (done) {

      expect(conf.seed.init).to.equal(true);
      expect(conf.seed.folders).to.equal(true);
      expect(conf.seed.user.username).to.equal('admin');
      expect(conf.seed.user.password).to.equal(SECRET_PASSWORD_ENV);
      expect(conf.seed.user.admin).to.equal(true);
      expect(conf.seed.user.role).to.equal('admin');
      expect(conf.seed.user.email).to.equal('admin@localhost.it');
      expect(conf.seed.user.ip).to.equal('admin.ipv6');

      done();

    });

  });

});
