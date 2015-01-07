
/**
* @module MainJoke.view
* @exports <ReactClass>MainJoke
*/

import React from 'react/addons';
import mixins from 'backbone-react-component';

import Lettering from './lettering';

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

      return (
        <div className="joke-container">
          <h1>
            <Lettering string={ joke!==undefined?joke.toString():'' } />
          </h1>
        </div>
      );

    }

  }.prototype

);
