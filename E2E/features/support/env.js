'use strict';
var express = require('express')

var path = require('path');



var configure = function () {

    this.app = express();
    var testFile = path.join(process.cwd() + '/E2E/testproject/dist')
    console.log(testFile);
    this.app.use("/", express.static(testFile))
    this.app.listen(2344, function() { console.log('Example app listening on port 2344!')})

};

module.exports = configure;