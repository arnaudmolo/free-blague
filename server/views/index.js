import React from 'react/addons';

var ComingSoon = require(__dirname + './../../front/app/scripts/components/coming-soon');

export default React.createClass(
  {
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
            <div className="container">
              <ComingSoon />
            </div>
            <script src="/scripts/main.js"></script>
        </body>
        </html>
      );
    }
  }
);
