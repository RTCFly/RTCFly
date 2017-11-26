exports.config = {
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  server: 'hub-cloud.browserstack.com',

  capabilities: [{
    browser: 'chrome',
    'browserstack.local': true
  }]
}
