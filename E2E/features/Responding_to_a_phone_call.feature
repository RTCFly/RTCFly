Feature: Responding to a phone call
    As a user
    I want to respond to a call request
    So that the caller gets an appropriate response 

  Background:
    Given "user1" is able to call "user2"
    Then the call "user2" button is clicked
    And "user2" should receive a call

  Scenario: Answering a phone call
    Given "user2" is receiving a phone call
    When "user2" accepts the call
    Then "user1" and "user2"  are connected

  Scenario: Rejecting a phone call
    Given "user2" is receiving a phone call
    When the user rejects the call
    Then "user2" is informed of "Call rejection"
