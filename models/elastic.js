const client = require('./esclient');

module.exports.search = function(query, callback) {
    client.search({
    	index : 'movies',
    	body : query
    },
        function(err, res) {
            if (!err) {
                callback('success', res);
            } else {
                callback('err', err)
            }
        });
}


