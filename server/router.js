
import monorouter from 'monorouter';
import reactRouting from 'monorouter-react';
import { Model } from 'backbone';
import JokeList from './../front/app/scripts/models/joke-list';
import Index from './views/index';
// import App from './server';

var router, Content;

router = monorouter();
router.setup(reactRouting());

Content = Model.extend({
  defaults() {
    return {
      mute: false,
      showWriting: false
    };
  }
});

export default function(App){
  return router
    .route('/', function(req, res){

      var content, jokeList;

      jokeList = new JokeList();
      jokeList.add({
        'content': 'Bienvenue sur le jeu de la blague !',
        'id': 0
      });

      content = new Content();
      content.set('jokes', jokeList);

      this.render(Index, { model: content });

    })
    .route('/joke/:id/', function(req, res){

      var content, jokeList, Joke;

      jokeList = new JokeList();
      Joke = App.models.Joke;

      Joke.findById(req.params.id, (err, joke) => {
        jokeList.add(joke);
        this.render(Index, { model: content });
      });

      content = new Content({
        jokes: jokeList
      });
    });

}
