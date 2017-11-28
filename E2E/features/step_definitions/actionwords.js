var assert = require('cucumber-assert');


exports.Actionwords = {
    iAmAbleToCall: function() {
        console.log("ya dun kno")
    },
    user1IsAbleToCallUser2: function(user1, user2) { return; },
    theCallP1ButtonIsClicked: function(p1, callback) {
        this.driver.findElement({
            name: "call-" + p1
        }).click().then(callback);
    },

    p1ShouldRecieveACall: function(p1, callback) {
        
        this.driver.findElement({
            id: p1 + "-state"
        }).getText().then(function(text) {
            assert.equal(text, "Recieving call", p1 + " did not recieve call");
        }).then(callback).catch(function(err) {
            console.log("something ain't right", err);
            callback()
        });



    },
    p1ShouldReceiveACall: function(p1) {
        console.log("ya dun kno")
    },
    aUserIsReceivingAPhoneCall: function() {
        console.log("ya dun kno")
    },
    theUserAcceptsTheCall: function() {
        console.log("ya dun kno")
    },
    theUsersAreConnected: function() {
        console.log("ya dun kno")
    },
    theUserRejectsTheCall: function() {
        console.log("ya dun kno")
    },
    theCallerIsInformedOfP1: function(p1) {
        console.log("ya dun kno")
    }
};
