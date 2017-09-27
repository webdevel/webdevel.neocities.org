import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header>
        <h1>Software Developer Tidbits</h1>
        <p className="lead">Web Development, Programming and Related Aspects.</p>
      </header>
    );
  }
}
export default Header