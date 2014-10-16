
import Backbone from 'backbone';

var { Model } = Backbone;

class Joke extends Model {
  defaults() {
    return {
      id: 0,
      content: ''
    };
  }
}

module.exports = Joke;
