
import monorouter from 'monorouter';
import reactRouting from 'monorouter-react';
import { Model } from 'backbone';
import JokeList from './../front/app/scripts/models/joke-list';
import Index from './views/index';

var router = monorouter();

router.setup(reactRouting());

export default router
  .route('/', function(req, res){

    var rdr, Content, content, jokeList;

    Content = Model.extend({
      defaults() {
        return {
          mute: false,
          showWriting: false
        };
      }
    });

    jokeList = new JokeList();
    jokeList.add({
      'content': 'Bienvenue sur le jeu de la blague !',
      'id': 0
    });

    content = new Content();
    content.set('jokes', jokeList);

    this.render(Index, { model: content });

  });
