import React from 'React/addons';
import { Model, Collection } from 'backbone';
import Joke from './../front/app/scripts/models/joke';
import JokeList from './../front/app/scripts/models/joke-list';

var jokeList, Content, content;

class Content extends Model {

  defaults() {
    return {
      mute : false,
      showWriting: false
    };
  }

};

jokeList = new JokeList();
jokeList.add({
  'content': 'Bienvenue sur le jeu de la blague !',
  'id': 0
});

content = new Content();
content.set('jokes', jokeList);

export default function() {

  var Content = require(__dirname + './../front/app/scripts/components/content');
  return React.renderToString(Content({model: content}));

}
