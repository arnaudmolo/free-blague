var debug = require('debug')('boot:create-model-instances');

export default function(app) {

  var User, Role, RoleMapping;

  User = app.models.user;
  Role = app.models.Role;
  RoleMapping = app.models.RoleMapping;

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
      content: 'joke1.',
      date: new Date(),
      userId: users[0].id,
      language: 'fr'
    }, {
      content: 'joke2.',
      date: new Date(),
      userId: users[0].id,
      language: 'fr'
    }, {
      content: 'joke3.',
      date: new Date(),
      userId: users[0].id,
      language: 'fr'
    }, {
      content: 'C\'est l\'histoire d\'une blonde qui à voulu jouer à la roulette russe avec un "beretta 9mm". Elle est morte du premier coup.',
      date: new Date(),
      userId: users[0].id,
      language: 'fr'
    }, {
      content: 'An english joke',
      date: new Date(),
      userId: users[0].id,
      language: 'en'
    }], function(er, joke) {
      if (er) return debug(er);
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
