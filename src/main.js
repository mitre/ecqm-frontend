import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';

// import Home from './components/homePage';
// import About from './components/about/aboutPage';
// import Authors from './components/authors/authorsPage';
import Header from './components/common/header';

(function(win) {
  "use strict";

  var App = React.createClass({
    render: function() {
      // var Child;

      // switch(this.props.route) {
      //   case 'about': Child = About; break;
      //   case 'authors': Child = Authors; break;
      //   default: Child = Home;
      // }

      return (
        <div>
          <Header />
        </div>
      );
    }
  });

  function render() {
    var route = win.location.hash.substr(1);
    ReactDOM.render(<App route={route} />, document.getElementById('app'));
  }

  win.addEventListener('hashchange', render);
  render();
})(window);