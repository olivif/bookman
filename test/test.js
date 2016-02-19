var should = require("should");

describe("test", function() {

  it("should be able to add 1 + 1", function(done) {
      var two = 1 + 1;
      two.should.eql(2);
      done();
  });
});
