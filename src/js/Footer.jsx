import React from 'react'

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <footer>
        <p>
          <a href="mailto:webwhammy@gmail.com" target="_blank" title="Email">
            <img src="/img/email.svg" alt="Email" className="footer-icon" />
          </a>
          <a href="https://github.com/webdevel" target="_blank" title="Github">
            <img src="/img/github.svg" alt="Github" className="footer-icon" />
          </a>
          <a href="https://www.linkedin.com/in/steven-garcia-35992737/" target="_blank" title="Linkedin">
            <img src="/img/linkedin.svg" alt="Linkedin" className="footer-icon" />
          </a>
        </p>
        <p>Webdevel.neocities.org is&nbsp;
          <a className="link-stone" href="https://github.com/webdevel/webdevel.neocities.org">
            Free and Open Source Software.
          </a>
        </p>
      </footer>
    )
  }
}
