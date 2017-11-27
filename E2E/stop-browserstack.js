'use strict';

var webdriver = require('selenium-webdriver');
var browserstack = require('browserstack-local');

var config_file = './conf/' + (process.env.CONFIG_FILE || 'single') + '.conf.js';
var config = require(config_file).config;

var username = process.env.BROWSERSTACK_USERNAME || config.user;
var accessKey = process.env.BROWSERSTACK_ACCESS_KEY || config.key;
var debug = config.debug;

var createBrowserStackSession = function(config, caps) {
  return new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(caps).
  build();
}

var bs_local = new browserstack.Local();
var world = this; 
bs_local.start({ 'key': process.env.BROWSERSTACK_KEY, force:true}, function(error) {
    console.log("started browserstack")
    bs_local.stop(function(){
        console.log("stopeddded", this)
    }); 
      });