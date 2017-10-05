var phantomjs = require('phantomjs-prebuilt');
var webdriverio = require('webdriverio');
var wdOpts = {
  desiredCapabilities: {
    browserName: 'phantomjs'
  }
};

phantomjs.run('--webdriver=4444').then(program => {
  webdriverio.remote(wdOpts).init()
    .url('http://127.0.0.1:8080')
    .getTitle().then(title => {
      console.log(title)
      program.kill()
    })
});
