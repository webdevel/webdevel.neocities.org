/**
 * How to run this script
 * export SAUCE_USERNAME="username"
 * export SAUCE_ACCESS_KEY="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
 * node ./tests/test.js
*/
var webdriverio = require('webdriverio');

client = webdriverio.remote({
    desiredCapabilities: {
        browserName: 'chrome',
        version: '61',
        platform: 'Windows 10',
        tags: ['tests'],
        name: 'Travis-CI Test',
        /*tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,*/
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,

        // If using Open Sauce (https://saucelabs.com/opensauce/),
        // capabilities must be tagged as "public" for the jobs's status
        // to update (failed/passed). If omitted on Open Sauce, the job's
        // status will only be marked "Finished." This property can be
        // be omitted for commerical (private) Sauce Labs accounts.
        // Also see https://support.saucelabs.com/customer/portal/articles/2005331-why-do-my-tests-say-%22finished%22-instead-of-%22passed%22-or-%22failed%22-how-do-i-set-the-status-
        'public': true
    },
    host: 'ondemand.saucelabs.com',
    port: 80,
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    /*tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,*/
    /*'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,*/
    logLevel: 'verbose'
}).init();

client
    .url('http://127.0.0.1:8080')
    .pause(1000)
    .getTitle().then((title) => {
        console.log('TITLE '+title);
    })
    .end()
    .catch((e) => console.log(e));
