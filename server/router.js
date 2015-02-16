import monorouter from 'monorouter';
import reactRouting from 'monorouter-react';

var router;

router = monorouter();
router.setup(reactRouting());

export default function(App){

  App.all('/lang/:lang', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(require('./../traductions/' + req.params.lang + '.json'));
  });

  return router;
}
