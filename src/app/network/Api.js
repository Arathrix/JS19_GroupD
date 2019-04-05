var request = require('superagent');
var Promise = require('es6-promise').Promise;

// var baseUrl = process.env.__PROTOCOL__ + process.env.__API__ + ((process.env.__PORT__ !== undefined) ? ':' + process.env.__PORT__ : '') + process.env.__PREFIX__;
var baseUrl = 'https://api.got.show:443/api/';

var Api = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            console.log(baseUrl + url);
            
            request
                .get(baseUrl + url)
                .end(function (err, res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        console.log(res.text);
                        resolve(JSON.parse(res.text)); //todo
                    }
                });
        });
    }
};

module.exports = Api;