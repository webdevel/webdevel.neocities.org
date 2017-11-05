import React from 'react'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <header className="main-header">
        <h1>Software Developer Tidbits</h1>
        <p className="lead">Web Development, Programming and Related Aspects.</p>
      </header>
    )
  }
}
