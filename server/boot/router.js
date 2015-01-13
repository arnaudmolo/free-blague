
export default function(app) {

  var router, rdr;

  router = app.loopback.Router();
  rdr = require('./../isomorph')();

  router.get('/', function(req, res) {
    console.log('???????????????????????');
    res.render('index', { rdr });
  });

  app.use(router);
};
