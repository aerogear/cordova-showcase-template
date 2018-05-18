const wdio = require('webdriverio');
const opts = require('./opts');

const client = wdio.remote(opts);

async function switchContext(contexts, windows) {
  contexts = contexts || await client.contexts();
  windows = windows || await client.windowHandles();
  if (opts.desiredCapabilities.platformName === 'Android') {
    const current = await client.windowHandle();
    const other = windows.value.find(window => window !== current.value);
    await client.window(other);
  } else {
    const current = await client.context();
    const webviews = contexts.value.filter(context => context.startsWith('WEBVIEW'));
    const other = webviews.find(webview => webview !== current.value);
    await client.context(other);
  }
  return { contexts, windows };
}

describe('Test for ' + opts.desiredCapabilities.platformName, function() {
  this.timeout(0);

  before(async function() {
    await client.init();
  });

  after(async function() {
    await client.end();
  });

  it('should login', async function() {
    await client.pause(3000) // wait for initialization
      .click('.bar-button-menutoggle')
      .pause(1000)  // wait for animation
      .click('button=Authentication')
      .pause(1000)  // wait for animation
      .click('div=Authenticate')
      .pause(3000); // wait for new context
    const { contexts, windows } = await switchContext();
    await client.setValue('#username', 'aerogear-test-account')
      .setValue('#password', '123')
      .click('#kc-login')
      .pause(2000); // wait for keycloak
    await switchContext(contexts, windows);
    await client.waitForVisible('h3=uma_authorization');
  });

  it('should logout', async function() {
    await client.click('div=Logout')
      .waitForVisible('div=Authenticate');
  });
});