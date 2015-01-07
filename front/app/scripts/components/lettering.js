
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

var temps_d_affichage = 3000;

export default React.createClass(

  class Lettering {

    get mixins() {
      return [mixins];
    }

    getInitialState() {
      return { string: ''}
    }

    componentWillUpdate_(now, next) {

      var difference;

      difference = now.string.length - this.state.string.length;

      console.log(difference);

      setTimeout(() => {
        this.setState({string: now.string});
        // console.log(this.state);
      }, 400);
    }

    render() {

      var lettering;

      lettering = [];

      for (var i = 0; i <= this.props.string.length - 1; i++) {
        lettering.push(<span key={i} >{this.props.string[i]}</span>);
      };

      return (
        <span className="lettering-container">
          {lettering}
        </span>
      );

    }

  }.prototype

);
