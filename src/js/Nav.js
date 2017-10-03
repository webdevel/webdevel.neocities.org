import React from 'react';

class Nav extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-charcoal fixed-top main-nav">
				<a className="navbar-brand pad-0" href="https://webdevel.neocities.org/index.html">
					<img className="navbar-icon" src="/img/favicon.png" alt="W" />
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse"
					data-target="#navbarList" aria-controls="navbarList"
					aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarList">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<a className="nav-link" href="index.html">Home</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="resume.pdf" target="_blank">Résumé</a>
					</li>
					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Tidbits</a>
						<div className="dropdown-menu dropdown-menu-left dropdown-menu-charcoal">
							<a className="dropdown-item link-stone" href="#professional-section">Professional</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item link-stone" href="#personal-section">Personal</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item link-stone" href="#documentation-section">Documentation</a>
						</div>
					</li>
				</ul>
				</div>
			</nav>
		);
	}
}
export default Nav
