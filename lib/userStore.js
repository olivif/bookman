// This service is responsible for storing user data
var user = {};

function storeGoodreadsUser(goodreadsUser) {
    this.user.name = goodreadsUser.displayName;
    this.user.id = goodreadsUser.id;
}

function clearGoodreadsUser() {
    this.user = {};
}

module.exports = {
    user: user,
    storeGoodreadsUser: storeGoodreadsUser
};