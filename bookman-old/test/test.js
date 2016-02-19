var should = require("should");

var dotenv = require('dotenv');
dotenv.load();

describe("Goodreads",function(){

    it("does something", function() {
        var one = 1;
        var two = 2;
        (one + two).should.eql(3);
    });

});
