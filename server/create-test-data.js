var debug = require('debug')('boot:create-model-instances');

module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Team = app.models.Team;

  User.create([
    {username: 'john', email: 'john@doe.com', password: 'opensesame'},
    {username: 'jane', email: 'jane@doe.com', password: 'opensesame'},
    {username: 'bob', email: 'bob@jokes.com', password: 'opensesame'}
  ], function(er, users) {
    if (er) return debug("$j", er);
    debug(users);

    console.log(Object.keys(users[0]));

    //create joke 1 and make john the owner
    users[0].jokes.create({
      name: 'joke1',
      balance: 100
    }, function(er, joke) {
      if (er) return debug(er);
      debug(joke);
      //add team members
      Team.create([
        {ownerId: joke.ownerId, memberId: users[0].id},
        {ownerId: joke.ownerId, memberId: users[1].id}
      ], function(er, team) {
        if (er) return debug(er);
        debug(team);
      });
    });

    //create joke 2 and make jane the owner
    users[1].jokes.create({
      name: 'joke2',
      balance: 100
    }, function(er, joke) {
      if (er) return debug(er);
      debug(joke);
      //add team members
      Team.create({
        ownerId: joke.ownerId,
        memberId: users[1].id
      }, function(er, team) {
        if (er) return debug(er);
        debug(team);
      });
    });

    //create the admin role
    Role.create({
      name: 'admin'
    }, function(er, role) {
      if (er) return debug(er);
      debug(role);
      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(er, principal) {
        if (er) return debug(er);
        debug(principal);
      });
    });
  });
};
