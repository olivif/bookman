// Test dependencies
var should = require("should");

// Dev dependencies
var app = require("./../app");

describe("test", function () {

    it("should be able to add 1 + 1", function (done) {
        var two = 1 + 1;
        two.should.eql(2);
        done();
    });
});

// Server tests
describe("server tests", function () {

    it("should be able to create server", function (done) {
        should.exist(app);
        done();
    });
});
