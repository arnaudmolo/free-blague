import React from 'react/addons';
import monorouter from 'monorouter';
import reactRouting from 'monorouter-react';
import Index from './views/index';

var TranslationActions = require(__dirname + './../front/app/scripts/actions/translation-actions');
var TranslationStore = require(__dirname + './../front/app/scripts/stores/translation-store');

var router;

router = monorouter();
router.setup(reactRouting());

export default function(App){

  App.all('/lang/:lang', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(require('./../traductions/' + req.params.lang + '.json'));
  });

  App.all('/', function(req, res) {

    let acceptedLanguage = req.acceptsLanguages('fr', 'en');

    TranslationStore
      .executeOnce(function() {

        res.send(
          React.renderToString(
            React.createElement(
              Index
            )
          )
        );

      });

    if (acceptedLanguage) {
      TranslationActions.changeDomain('fr');
    }else{
      TranslationStore.emitChange();
    }
  });

  return router;

}
