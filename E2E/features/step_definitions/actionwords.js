var assert = require('cucumber-assert');

function GetElement(id) {
    return this.driver.findElement({
        id: id
    }).getText();
}

function ClickElement(id) {
    return this.driver.findElement({
        id: id
    }).click()
}

exports.Actionwords = {
    iAmAbleToCall: function() {
        console.log("ya dun kno")
    },
    user1IsAbleToCallUser2: function(user1, user2, callback) { callback(); },
    theCallP1ButtonIsClicked: function(p1, callback) {
        return ClickElement.call(this, "call-" + p1).then(callback);
    },

    p1ShouldRecieveACall: function(p1, callback) {
        GetElement.call(this, p1 + "-state").then(function(text) {
            assert.equal(text, "Recieving call", p1 + " did not recieve call");
        }).then(callback);
    },
    p1ShouldReceiveACall: function(p1) {
        console.log("ya dun kno")
    },

    p1IsReceivingAPhoneCall: function(p1, callback) {
        var world = this;
        GetElement.call(this, p1 + "-state").then(function(userText) {
            assert.equal(userText, "Recieving call", p1 + " should be recieving phone call ");
        }).then(callback)
    },
    p2AcceptsTheCall: function(p1, callback) {
        callback();
    },
    p1AndP2AreConnected: function(p1, p2, callback) {
        callback();
    },
    theUserRejectsTheCall: function() {
        console.log("ya dun kno")
    },
    p1IsInformedofP2: function(p1, p2, callback) {
        console.log("ya dun kno")
        callback();
    }
};
