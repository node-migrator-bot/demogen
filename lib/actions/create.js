var path = require('path'),
    fs = require('fs'),
    ncp = require('ncp').ncp,
    reDeckFile = /^deck/i;

module.exports = function(opts, callback) {
    callback = callback || function() {};
    
    var builder = this;
    
    fs.readdir(this.targetPath, function(err, files) {
        var deckExists = false;
        
        if (err) {
            builder.out('!{red}Unable to scaffold deck: {0} not found', builder.targetPath);
            callback(err);
            return;
        } // if
        
        files.forEach(function(file) {
            deckExists = deckExists || reDeckFile.test(file);
        });
        
        // if the deck already exists, then report an error
        if (deckExists) {
            builder.out('!{red}Unable to create: deck already created in {0}', builder.targetPath);
            callback('deck already exists');
        }
        else {
            ncp(builder.getAssetPath('scaffold'), builder.targetPath, callback);
        } // if..else
    });
};