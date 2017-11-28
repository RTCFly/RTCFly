var assert = require('cucumber-assert');

module.exports = function() {
    this.Before(function(scenario) {
        this.actionwords = Object.create(require('./actionwords.js').Actionwords);
       
        
    });





    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    this.Given(/^"(.*)" is able to call "(.*)"$/, function (user1, user2, callback) {
        this.actionwords.user1IsAbleToCallUser2(user1, user2);
        callback();
    });



    this.Then(/^"(.*)" should receive a call$/,{timeout:60 * 1000}, function (p1, callback) {
        this.actionwords.p1ShouldRecieveACall.call(this, p1, callback)
    });

    this.Given(/^a user is receiving a phone call$/, function (callback) {
        this.actionwords.aUserIsReceivingAPhoneCall();
        callback();
    });

    this.When(/^the user accepts the call$/, function (callback) {
        this.actionwords.theUserAcceptsTheCall();
        callback();
    });

    this.Then(/^the users are connected$/, function (callback) {
        this.actionwords.theUsersAreConnected();
        callback();
    });

    this.When(/^the user rejects the call$/, function (callback) {
        this.actionwords.theUserRejectsTheCall();
        callback();
    });

    this.Then(/^the caller is informed of "(.*)"$/, function (p1, callback) {
        this.actionwords.theCallerIsInformedOfP1(p1);
        callback();
    });


    this.Given(/^I am receiving a phone call$/, function (callback) {
        this.actionwords.iAmReceivingAPhoneCall();
        callback();
    });

    this.Then(/^the call "(.*)" button is clicked$/, {timeout:60 * 1000}, function (p1, callback) {
        console.log("click click baby")
        this.actionwords.theCallP1ButtonIsClicked.call(this, p1, callback);
    });
}
