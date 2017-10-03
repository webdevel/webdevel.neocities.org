import React from 'react';
import Nav from './Nav.js';
import Footer from './Footer.js';
import Header from './Header.js';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.main = props.main;
  }
  render() {
    return (
      <div>
        <Nav />
        <div className="nav-clear-fixed"></div>
        <Header />
        {this.main}
        <Footer />
      </div>
    );
  }
}
export default Root
