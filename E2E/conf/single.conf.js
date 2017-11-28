exports.config = {
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  server: 'hub-cloud.browserstack.com',
  debug:true, 
  capabilities: [{
    browserName: 'chrome',
    'browserstack.local': true
  }]
}
