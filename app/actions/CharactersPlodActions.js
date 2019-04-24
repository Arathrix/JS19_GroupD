var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var Api = require('../network/Api');

var CharactersPlodActions = {

    loadCharactersPlodByCount: function(count) {
        var charactersPlod = [];

        // only used by old stats page
        Api.get('plod/byCount/' + count)
            .then(function (response) {
              return response.data;
            }).then(function(charactersPlodResponse){
                for(var characterPlod of charactersPlodResponse){
                    Api
                        .get('characters/' + characterPlod.character + "?strict=true" )
                        .then(function(response){
                            var character = response.data;
                            var characterWithPlod = Object.assign(character,characterPlod);
                            charactersPlod.push(characterWithPlod);
                            AppDispatcher.handleServerAction({
                                actionType: Constants.RECEIVE_CHARACTERS_PLOD_BY_COUNT,
                                data: charactersPlod
                            });
                        });
                }
            });
    },
    
    loadCharactersPlodByName: function(names){
        var charactersPlod = [];
        for(var name of names){
            Api.get('show/characters/' + name).then(function(character){
                charactersPlod.push(character);
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_CHARACTERS_PLOD_BY_NAME,
                    data: charactersPlod
                });
            });
        }
    }
};

module.exports = CharactersPlodActions;
