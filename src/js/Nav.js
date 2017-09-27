import React from 'react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
  		<nav className="navbar navbar-expand-lg navbar-dark bg-charcoal fixed-top">
  			<a className="navbar-brand" href="https://webdevel.neocities.org/index.html">://</a>
  			<ul className="navbar-nav mr-auto">
  				<li className="nav-item active">
  					<a className="nav-link" href="index.html">Home</a>
          </li>
  			</ul>
  		</nav>
    );
  }
}
export default Nav
