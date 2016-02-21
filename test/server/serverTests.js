// Test dependencies
var should = require("should");

// Dev dependencies
var app = require("./../../app");
var goodreadsApi = require("./../../lib/goodreadsApi");

// Server tests
describe("server tests", function () {

    it("should be able to create server", function (done) {
        should.exist(app);
        done();
    });

    describe("goodreads api", function () {

        it("should be able to get shelves", function (done) {

            goodreadsApi.getShelves("5391468", function (results) {
                should.exist(results);

                results.should.be.array;
                results.length.should.eql(5);

                var properties = ["id", "name", "book_count"];

                results.forEach(function (result) {
                    properties.forEach(function (property) {
                        result.should.have.property(property);
                    }, this);
                }, this);

                done();
            })
        });
    });
});
