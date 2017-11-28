var assert = require('cucumber-assert');

module.exports = function() {
    this.Before(function(scenario) {
        this.actionwords = Object.create(require('./actionwords.js').Actionwords);


    });

























    this.Given(/^"(.*)" is able to call "(.*)"$/, function(user1, user2, callback) {
        this.actionwords.user1IsAbleToCallUser2(user1, user2, callback);

    });



    this.Then(/^"(.*)" should receive a call$/, { timeout: 60 * 1000 }, function(p1, callback) {
        this.actionwords.p1ShouldRecieveACall.call(this, p1, callback)
    });
    this.Given(/^"([^"]*)" is receiving a phone call$/, { timeout: 60 * 1000 }, function(p1, callback) {
        this.actionwords.p1IsReceivingAPhoneCall.call(this, p1, callback);

    });
    this.When(/^"([^"]*)" accepts the call$/, function(arg1, callback) {
        this.actionwords.p2AcceptsTheCall.call(this, arg1, callback);
    });
    this.Then(/^"([^"]*)" and "([^"]*)"  are connected$/, function(arg1, arg2, callback) {
        this.actionwords.p1AndP2AreConnected(arg1, arg2, callback);
    });

    this.When(/^the user rejects the call$/, function(callback) {
        this.actionwords.theUserRejectsTheCall();
        callback();
    });
    this.Then(/^"([^"]*)" is informed of "([^"]*)"$/, { timeout: 60 * 1000 }, function(arg1, arg2, callback) {
        this.actionwords.p1IsInformedofP2.call(this, arg1, arg2, callback);
    });
    this.Given(/^I am receiving a phone call$/, function(callback) {
        this.actionwords.iAmReceivingAPhoneCall();
        callback();
    });

    this.Then(/^the call "(.*)" button is clicked$/, { timeout: 60 * 1000 }, function(p1, callback) {
        this.actionwords.theCallP1ButtonIsClicked.call(this, p1, callback);
    });
}
