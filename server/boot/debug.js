module.exports = function(app){

  var user, acls;

  user = app.loopback.getModel('user')
  acls = user.settings.acls
  user.settings.acls = acls.splice(1, acls.length)
  console.log(user.settings.acls);
};
