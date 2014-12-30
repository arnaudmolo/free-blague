
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

export default React.createClass(

  {

    mixins: [mixins],

    componentDidMount() {
      console.log('ici', this);
    }

  }

);
