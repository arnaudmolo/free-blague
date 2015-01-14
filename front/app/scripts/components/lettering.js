
/**
* @module Lettering
* @exports <ReactClass>Lettering
*/

import React from 'react/addons';
import mixins from 'backbone-react-component';

/**
 * @class Lettering
 * Templates for the main joke
 */

var animationDuration = 2000;

export default React.createClass(

  class Lettering {

    get mixins() {
      return [mixins];
    }

    getInitialState() {
      return { string: ''};
    }

    render() {

      var lettering;

      lettering = [];

      for (var i = 0; i <= this.props.string.length - 1; i++) {
        lettering.push(<span key={Math.random()} style={
          {
            WebkitAnimationDelay: animationDuration / this.props.string.length * i + "ms"
          }
        }>{this.props.string[i]}</span>);
      };

      return (
        <span className="lettering-container">
          {lettering}
        </span>
      );

    }

  }.prototype

);
