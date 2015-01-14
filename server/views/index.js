
import React from 'react/addons';

var Content = require(__dirname + './../../front/app/scripts/components/content');

export default React.createClass(

  class Index {

    getRawData() {
      return "function(){console.log('yay')}";
    }

    render() {
      return (

        <html className="no-js">
          <head>
            <meta charSet="utf-8" />
            <title>blague rendue par le server</title>
            <meta name="description" content="" />
            <meta name="viewport" content="width=device-width" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link href='http://fonts.googleapis.com/css?family=Open+Sans:700italic,400,700,800' rel='stylesheet' type='text/css' />
            <link rel="stylesheet" href="/styles/main.css" />
          </head>
          <body>
            <div className="content">
              <Content model={this.props.model}></Content>
            </div>
            <script id="ici" dangerouslySetInnerHTML={{__html: 'window.tempJoke = "' + this.props.model.get('jokes').at(0) + '"'}}></script>
            <script src="/scripts/main.js"></script>
        </body>
        </html>

      );
    }
  }.prototype
);
