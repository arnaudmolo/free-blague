import React from 'react/addons';
import monorouter from 'monorouter';
import reactRouting from 'monorouter-react';

var TranslationActions = require(__dirname + './../front/app/scripts/actions/translation-actions');
var TranslationStore = require(__dirname + './../front/app/scripts/stores/translation-store');
var CommingSoonView = require(__dirname + './../front/app/scripts/components/coming-soon');

var router;

console.log(CommingSoonView);

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

        let rdr =
          React.renderToString(
            React.createElement(
              CommingSoonView
            )
          );

        res.render('index.html', {rdr: rdr});

      });

    if (acceptedLanguage) {
      TranslationActions.changeDomain(acceptedLanguage);
    }else{
      TranslationStore.emitChange();
    }
  });

  return router;

}
