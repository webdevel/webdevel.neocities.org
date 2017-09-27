import React from 'react';
import Nav from './Nav.js';
import Footer from './Footer.js';
import Header from './Header.js';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Nav />
        <div className="nav-clear-fixed"></div>
        <Header />
        <Footer />
      </div>
    );
  }
}
export default Root
