/* jshint node: true, mocha: true, esversion: 6 */

var utils = require('./utils'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    assert = chai.assert,
    itMacro = utils.itMacro,
    describeMacro = utils.describeMacro,
    beforeEachMacro = utils.beforeEachMacro;

const ffURL = 'https://product-details.mozilla.org/1.0/firefox_versions.json';

// Let's add "eventually" to assert so we can work with promises.
chai.use(chaiAsPromised);

describeMacro('CurrentGecko', function () {
    beforeEachMacro(function (macro) {
        // Create a test fixture to mock the mdn.fetchJSONResource function.
        const fetch_stub = sinon.stub();
        fetch_stub.withArgs(ffURL).returns(
            {
                'FIREFOX_NIGHTLY': '65.0a1',
                'FIREFOX_AURORA': '49',
                'FIREFOX_ESR': '52.8.1esr',
                'FIREFOX_ESR_NEXT': '60.0.2esr',
                'LATEST_FIREFOX_DEVEL_VERSION': '61.0b14',
                'FIREFOX_DEVEDITION': '64.0b2',
                'LATEST_FIREFOX_OLDER_VERSION': '3.6.28',
                'LATEST_FIREFOX_RELEASED_DEVEL_VERSION': '63.0b14',
                'LATEST_FIREFOX_VERSION': '62.0.2'
            }
        );
        macro.ctx.mdn.fetchJSONResource = fetch_stub;
    });
    itMacro('No arguments (release)', function (macro) {
        return assert.eventually.equal(macro.call(), '62.0.2');
    });
    itMacro('Release', function (macro) {
        return assert.eventually.equal(macro.call('Release'), '62.0.2');
    });
    itMacro('Beta', function (macro) {
        return assert.eventually.equal(macro.call('beta'), '61');
    });
    itMacro('Nightly', function (macro) {
        return assert.eventually.equal(macro.call('nighTLY'), '65');
    });
    itMacro('Central', function (macro) {
        return assert.eventually.equal(macro.call('CENtral'), '65');
    });
    itMacro('Aurora', function (macro) {
        return assert.eventually.equal(macro.call('aurora'), '49');
    });
    itMacro('ESR', function (macro) {
        return assert.eventually.equal(macro.call('ESR'), '52.8.1');
    });
});
