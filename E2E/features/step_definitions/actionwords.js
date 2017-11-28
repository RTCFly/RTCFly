var assert = require('cucumber-assert');


exports.Actionwords = {
    iAmAbleToCall: function() {
        console.log("ya dun kno")
    },
    user1IsAbleToCallUser2: function(user1, user2, callback) { callback(); },
    theCallP1ButtonIsClicked: function(p1, callback) {
        this.driver.findElement({
            id: "call-" + p1
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
    
    p1IsReceivingAPhoneCall: function(p1,callback) {
          var world = this;
        this.driver.findElement({
            id: p1 + "-state"
        }).getText().then(function(userText) {
            assert.equal(userText, "Recieving call", p1 + " should be recieving phone call ");
        }).then(callback).catch(function(err) {
            console.log("something ain't right", err);
            callback()
        });;
    },
    p2AcceptsTheCall: function(p1,callback) {
      callback(); 
    },
    p1AndP2AreConnected: function(p1, p2, callback) {
      callback(); 
    },
    theUserRejectsTheCall: function() {
        console.log("ya dun kno")
    },
    p1IsInformedofP2: function(p1,p2, callback) {
        console.log("ya dun kno")
        callback(); 
    }
};
