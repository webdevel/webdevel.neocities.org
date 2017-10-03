import React from 'react';

class MainIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main className="container-fluid">
        <div className="row">
          <section id="intro-section" className="col-sm-7">
            <header>
              <h2>Welcome Aboard</h2>
              <p>This is a place of learning and sharing. It&apos;s an aggregate
              of software developer information and products.</p>
            </header>
          </section>
          <div className="col-sm"></div>
        </div>
        <div className="row">
          <section id="about-section" className="col-sm-7">
            <header>
              <h3>Howdy, I&apos;m Steven Garcia.</h3>
              <h5 className="cl-ash">I&apos;m a self-motivated software engineer with natural
              curiosity about how things work, passion for writing effective
               software and solving issues.</h5>
            </header>
              <p>I&apos;m highly adaptable with over 8 years
              of professional experience in various web technologies. I&apos;ve
              done <span className="highlight">front-end</span> work with <span className="tech">HTML</span>, <span className="tech">CSS</span>, <span className="tech">JavaScript</span> and <span className="tech">JSON</span>. Additionally,
              I&apos;ve written <span className="highlight">back-end</span> code using <span className="tech">PHP</span>, <span className="tech">SQL</span> and <span className="tech">NoSQL</span>. I&apos;ve
              also implemented <span className="highlight">middleware</span> services and <span className="highlight">ReSTFul Web APIs</span> via <span className="tech">Java</span>, <span className="tech">C </span>
              and <span className="tech">C++</span>. I use
              the <span className="tech">Bash</span> <span className="highlight">command-line</span> daily.
              I&apos;ve written many shell scripts, created
              a <a href="https://gist.github.com/webdevel/5125742#portable-shell-commands"
                target="_blank">
              Portable Shell Commands</a> quick reference list and <a
              href="https://gist.github.com/webdevel/e441f52e5409e0cb82ae22c21767b284#bash-cheat-sheet"
              target="_blank">Bash Cheat Sheet</a>. I utilize Virtualization
              software <span className="tech">VirtualBox</span>. I create my own <span className="highlight">virtual machines</span> for development
              with <span className="tech">Ubuntu Server</span> or another <span className="highlight">Linux</span> distribution.</p>
              <p>I think life is a continuous cycle of learning, adapting,
              applying and sharing. From learning to sharing, I love finding
              improved ways of developing usefull software as part of a team or
              independently. </p>
              <p>I&apos;m a practitioner of <a
                href="https://www.gnu.org/philosophy/floss-and-foss.en.html" target="_blank">
                Free and Open Source</a>. Some of the contributions I&apos;ve
                made can be browsed on my <a href="https://github.com/webdevel" target="_blank">
                Github</a> profile.</p>
          </section>
          <div className="col-sm"></div>
        </div>
        <div className="row">
          <section id="professional-section" className="col-sm-7 navbar-link">
            <header>
              <h2>Professional</h2>
              <p>Here is some of my professional work.</p>
            </header>
            <img src="img/motortrend.png" alt="Motortrend" className="img-screen" />
            <p>
						<a className="link-sky" href="http://www.motortrend.com/" target="_blank">Motortrend.com</a>
            </p>
            <p>I collaborated in designing, documenting and implementing an SDK with the web platform team.
We produced over thirty unit tested, documented, reusable modules enabling faster
turnout of websites, improved performance and less overall maintenance.
I actively participated in developing proprietary cloud-based ReSTful web APIs.
Working closely with web API team, in developing interfaces and troubleshooting.
            </p>
            <p>These are just a few of the websites powered by the back-end
              code and APIs I participated in developing.
            </p>
            <img src="img/automotive.png" alt="Automotive" className="img-screen" />
            <p>
						<a className="link-sky" href="http://www.automotive.com/" target="_blank">Automotive.com</a>
            </p>
            <img src="img/hotrod.png" alt="Hotrod" className="img-screen" />
            <p>
						<a className="link-sky" href="http://www.hotrod.com/" target="_blank">Hotrod.com</a>
            </p>
            <img src="img/openclipart.png" alt="Openclipart" className="img-screen" />
            <p>
						<a className="link-sky" href="https://openclipart.org/" target="_blank">Openclipart.org</a>
            </p>
            <p>I added a edit user profile feature and various bug fixes for
            Openclipart utilizing PHP and MySQL. Openclipart is built on top of
            Aiki Framework. I utilized jQuery to implement the update dialog
            via AJAX of the administrator interface for the Aiki Framework
            project. In addition, I created SQL scripts for easy installation
            of the framework.</p>
          </section>
          <div className="col-sm"></div>
        </div>
        <div className="row">
          <section id="personal-section" className="col-sm-7 navbar-link">
            <header>
              <h2>Personal</h2>
              <p>These are some personal projects I&apos;ve tinkered with.
                There are some contributions to existing Free and Open Source projects as well.</p>
            </header>
            <p>
						<a className="link-sky" target="_blank" href="sudoku.html">Sudoku</a>
						</p>
						<p>I created a Sudoku puzzle solver game using HTML and JavaScript.
            </p>
            <p>
						<a className="link-sky" target="_blank" href="svg-dom-player.html">SVG DOM Player</a>
						</p>
						<p>I wrote a lightweight stand-alone JavaScript component to animate SVG documents
            via the DOM by showing each SVG group element or layer in sequence.
            </p>
            <p>
						<a className="link-sky" target="_blank" href="https://github.com/webdevel/tabulous">Tabulous</a>
						</p>
						<p>I made a lightweight Vim plugin to enhance the tabline including
            numbered tab page labels; it&apos;s written entirely in Vim script.
            </p>
            <p>
              <a className="link-sky" target="_blank"
                href="http://gnome-apps.13852.n7.nabble.com/UML-Code-Generator-for-PHP-td12571.html">
                Dia Diagram Creation</a>
						</p>
						<p>I added Object Oriented PHP code generation from UML diagrams as a contribution.
            </p>
            <p>
              <a className="link-sky" target="_blank"
                href="https://github.com/phacility/xhprof/pull/4">XHProf PHP Profiler</a>
						</p>
						<p>I contributed initial support for SVG in the generated profiler report.
            </p>
            <p>
            <a className="link-sky" target="_blank"
              href="https://github.com/phpunit/phpunit-testlistener-xhprof/pull/1">PHPUnit XHProf TestListener</a>
						</p>
						<p>I added an option to support ignored functions as a contribution.
            </p>
            <p>
              <a className="link-sky" target="_blank"
                href="https://github.com/justinrainbow/json-schema/pull/68">JSON Schema For PHP</a>
						</p>
						<p>I contributed Sphinx Doc and PHPDocumentor support to the Travis-CI build.
            </p>
          </section>
          <div className="col-sm"></div>
        </div>
        <div className="row">
          <section id="documentation-section" className="col-sm-7 navbar-link">
            <header>
              <h2>Documentation</h2>
              <p>This is some documentation I&apos;ve written.</p>
            </header>
            <p>
						<a className="link-sky" href="https://gist.github.com/webdevel/e441f52e5409e0cb82ae22c21767b284#bash-cheat-sheet">Bash Cheat Sheet</a>
            </p>
            <p>
						<a className="link-sky" href="https://gist.github.com/webdevel/5125742#portable-shell-commands">Portable Shell Commands</a>
            </p>
            <p>
						<a className="link-sky" href="https://gist.github.com/webdevel/4050973ffcb19edb07f72540c71ae38f#vim-cheat-sheet">Vim Cheat Sheet</a>
            </p>
          </section>
          <div className="col-sm"></div>
        </div>
      </main>
    );
  }
}
export default MainIndex
