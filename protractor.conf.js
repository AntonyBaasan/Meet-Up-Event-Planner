/**
 * Created by ant on 5/26/2016.
 */
exports.config = {
    chromeOnly: true,
    chromeDriver: './node_modules/protractor/selenium/chromedriver',
    baseUrl: "http://localhost:8000",
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/main-spec.js'],
    troubleshoot: true
};