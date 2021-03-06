var model = require('../../lib');

var Person = function () {
  this.property('familyName', 'string');
  this.property('givenName', 'string');
  this.property('title', 'string');
  this.property('description', 'text');

  this.hasMany('Participations');
  this.hasMany('Events', {through: 'Participations'});
  this.hasMany('Frienders', {through: 'Friendships', model: 'People'});
  this.hasMany('Friends', {through: 'Friendships', model: 'People'});
};

Person.prototype.someMethod = function () {
};

Person = model.register('Person', Person);

module.exports.Person = Person;




