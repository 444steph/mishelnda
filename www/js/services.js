angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'YULEISY GOMEZ',
    lastText: 'You on your way?',
    face: 'img/YULEISY.jpg'
  }, {
    id: 1,
    name: 'STEPHANY LIMA',
    lastText: 'Hey, it\'s me',
    face: 'img/STEPHANY.jpg'
  }, {
    id: 2,
    name: 'EDSON LUX',
    lastText: 'I should buy a boat',
    face: 'img/EDSON.jpg'
  }, {
    id: 3,
    name: 'PABLO MONTERROSO',
    lastText: 'Look at my mukluks!',
    face: 'img/PABLO M..jpg'
  }, {
    id: 4,
    name: 'ALESSANDRO DONIS ',
    lastText: 'This is wicked good ice cream.',
    face: 'img/ALESSANDRO.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
