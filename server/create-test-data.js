var debug = require('debug')('boot:create-model-instances');

module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  User.create([
    {email: 'john@doe.com', password: 'opensesame'},
    {email: 'jane@doe.com', password: 'opensesame'},
    {email: 'jane@doe.com', password: 'opensesame'},
    {email: 'bob@jokes.com', password: 'opensesame'}
  ], function(er, users) {
    if (er) return debug("$j", er);
    debug(users);

    //create joke 1 and make john the owner
    users[0].jokes.create([{
      content: 'joke1',
      date: new Date,
      random: Math.random()
    }, {
      content: 'joke2',
      date: new Date,
      random: Math.random()
    }, {
      content: 'joke3',
      date: new Date,
      random: Math.random()
    }], function(er, joke) {
      if (er) return debug(er);
      console.log('jokes', joke);
    });

    Role.create({
      name: 'admin'
    }, function (err, role) {
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId  : users[2].id
      }, function(err, principal){
        return;
      });
    });
  });
};
