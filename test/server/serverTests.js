// Test dependencies
var should = require("should");

// Dev dependencies
var app = require("./../../app");
var goodreadsApi = require("./../../lib/goodreadsApi");

// Server tests
describe("server tests", function () {

    // Test suite for express functionality
    describe("express", function () {
        
        it("should be able to create server", function (done) {
            should.exist(app);
            done();
        });
    });

    // Test suite for goodreads api calls
    describe("goodreads api", function () {

        this.timeout(10000);

        // Test constants
        var testUserId = "5391468";
        var testShelf = "read";
        
        // Checks whether an array of data has the required properties
        // TODO replace this with a schema validator, so we can do subproperties etc.
        function verifyProperties(data, properties) {
            data.forEach(function (result) {
                properties.forEach(function (property) {
                    result.should.have.property(property);
                });
            });
        }

        // Checks whether a set of results from goodreads exists
        // and has all required properties
        function verifyResults(data, properties) {

            should.exist(data);

            data.should.be.array;
            data.length.should.be.above(0);

            verifyProperties(data, properties);

            console.log(JSON.stringify(data[0])); // Print the first result for debugging
        }

        it("should be able to get shelves", function (done) {

            goodreadsApi.getShelves(testUserId, function (results) {
                var properties = ["id", "name", "book_count", "exclusive_flag", "description", "sort", "order", "per_page", "display_fields", "featured", "recommend_for", "sticky"];
                verifyResults(results, properties);

                done();
            })
        });

        it("should be able to get books for shelf", function (done) {

            goodreadsApi.getBooksForShelf(testUserId, testShelf, 1, 50, function (results) {
                var properties = ["book"];
                verifyResults(results, properties);

                done();
            })
        });
    });
});
