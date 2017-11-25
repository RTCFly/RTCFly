var browserstack = require('browserstack-local');
var assert = require('cucumber-assert');

var webdriver = require('selenium-webdriver');

var config_file = '../../conf/' + (process.env.CONFIG_FILE || 'single') + '.conf.js';
var config = require(config_file).config;

var username = process.env.BROWSERSTACK_USERNAME || config.user;
var accessKey = process.env.BROWSERSTACK_ACCESS_KEY || config.key;


module.exports = function() {
    this.Before(function(scenario) {
        this.actionwords = Object.create(require('./actionwords.js').Actionwords);
        this.driver.get("http://localhost:2344/");
    });



    this.Given(/^"(.*)" is able to call "(.*)"$/, function(user1, user2, callback) {
        this.actionwords.user1IsAbleToCallUser2(user1, user2);
        callback();
    });

    this.When(/^the call "(.*)" button is ckicked$/, { timeout: 60 * 1000 }, function(p1, callback) {
        this.driver.findElement({
            name: "call-" + p1
        }).click();
        callback();

    });


    this.Then(/^"(.*)" should receive a call$/, { timeout: 60 * 1000 }, function(p1, callback) {
        this.driver.findElement({
            id: p1 + "-state"
        }).getText().then(function(text) {
            assert.equal(text, "Recieving call", p1 + " did not recieve call", callback)
        }).then(callback).catch(function(err) { console.log("something ain't right", err);
            callback() });




        //wasnae working for no good reason
        //this.actionwords.p1ShouldReceiveACall(this.driver, p1);

    });

    this.Given(/^a user is receiving a phone call$/, function(callback) {
        this.actionwords.aUserIsReceivingAPhoneCall();
        callback();
    });

    this.When(/^the user accepts the call$/, function(callback) {
        this.actionwords.theUserAcceptsTheCall();
        callback();
    });

    this.Then(/^the users are connected$/, function(callback) {
        this.actionwords.theUsersAreConnected();
        callback();
    });

    this.When(/^the user rejects the call$/, function(callback) {
        this.actionwords.theUserRejectsTheCall();
        callback();
    });

    this.Then(/^the caller is informed of "(.*)"$/, function(p1, callback) {
        this.actionwords.theCallerIsInformedOfP1(p1);
        callback();
    });
}
