// Test dependencies
var should = require("should");

// Dev dependencies
var app = require("./../../app");

// Server tests
describe("server tests", function () {

    it("should be able to create server", function (done) {
        should.exist(app);
        done();
    });
});
