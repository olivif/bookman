// Convert data from goodreads into a custom model
function convert(goodreadsData, model) {
    var data = [];

    goodreadsData.forEach(function (goodreadsItem) {
        data.push(model(goodreadsItem));
    }, this);

    return data;
}

module.exports = convert;