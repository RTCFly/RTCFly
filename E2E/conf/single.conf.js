exports.config = {
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,

  capabilities: [{
    browser: 'chrome',
    'browserstack.local': true
  }]
}