var _ = require('lodash');

var obj = {

    hello: "World",

    init: function(config) {

        //var config = require('./config/config.json');

        var config = _.assign( config, {
            "test": true
        });

        console.log(config, this.hello);

    }
};

obj.init({
    "test": false
});