import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import Header from './Header'

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.main = props.main
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
    )
  }
}
