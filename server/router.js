
import monorouter from 'monorouter';
import reactRouting from 'monorouter-react';
// import App from './server';

var router;

router = monorouter();
router.setup(reactRouting());

export default function(App){
  return router
    .route('/', function(req, res){
      this.render(Index, { model: {} });
    });

}
