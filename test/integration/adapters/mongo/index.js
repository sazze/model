var utils = require('utilities')
  , assert = require('assert')
  , model = require('../../../../lib')
  , helpers = require('.././helpers')
  , Adapter = require('../../../../lib/adapters/mongo').Adapter
  , generator = require('../../../../lib/generators/sql')
  , adapter
  , tests
  , config = require('../../../config')
  , shared = require('../shared');

tests = {
  'before': function (next) {
    var relations = helpers.fixtures.slice()
      , models = [];
    adapter = new Adapter(config.mongo);

    adapter.once('connect', function () {
      adapter.dropTable(['Zooby', 'User'], next);
    });
    adapter.connect();

    model.adapters = {};
    relations.forEach(function (r) {
      model[r].adapter = adapter;
      models.push({
        ctorName: r
      });
    });

    model.registerDefinitions(models);

  }

, 'after': function (next) {
    adapter.dropTable(['Zooby', 'User'], function () {
      adapter.disconnect(function (err) {
        if (err) { throw err; }
        next();
      });
    });
  }

, 'test create adapter': function () {
    assert.ok(adapter instanceof Adapter);
  }
};

for (var p in shared) {
  if (p == 'beforeEach' || p == 'afterEach') {
    tests[p] = shared[p];
  }
  else {
    tests[p + ' (Mongo)'] = shared[p];
  }
}

module.exports = tests;

