/**
 * How to run this script
 * export SAUCE_USERNAME="username"
 * export SAUCE_ACCESS_KEY="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
 * export TRAVIS_JOB_NUMBER="0.1"
 * node ./scripts/test.js
*/
var sauceConnectLauncher = require('sauce-connect-launcher');
var options = {
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  verbose: true,
  verboseDebugging: true,
  vv: true,
  tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
};
sauceConnectLauncher(options, function (err, sauceConnectProcess) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Started Sauce Connect Process");
  sauceConnectProcess.close(function () {
    console.log("Closed Sauce Connect process");
  });
});
