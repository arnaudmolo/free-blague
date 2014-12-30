
/**
* @module MainJoke.view
* @exports <ReactClass>MainJoke
*/

import React from 'react/addons';
import mixins from 'backbone-react-component';

/**
 * @class MainJoke
 * Templates for the main joke
 */

export default React.createClass(

  class MainJoke {

    get mixins() {
      return [mixins];
    }

    componentDidMount() {

      this.getCollection().on('all', () => this.forceUpdate());

    }

    render() {

      var joke;

      joke = this.getCollection().last();

      if (joke !== undefined) {
        joke = joke.toString();
      }

      return (
        <div className="joke-container">
          <h1>{ joke }</h1>
        </div>
      );

    }

  }.prototype

);
