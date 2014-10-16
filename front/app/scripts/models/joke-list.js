
import Backbone from 'backbone';
import Joke     from './joke';

var { Collection } = Backbone;

class JokeList extends Collection {
  constructor(options) {
    super(options);
    this.model = Joke;
  }
}

module.exports = JokeList;
