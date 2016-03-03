myApp.factory('DataFactory', ['$http', function($http) {
  // PRIVATE
  var favorites = undefined;

  var getFavoriteData = function() {
    var promise = $http.get('/data').then(function(response) {
      favorites = response.data;
      console.log('this is the get response favorites', favorites);
    });

    return promise;
  };

  var saveFavorite = function(favorite) {
    var promise = $http.post('/data', favorite).then(function(response){
      //return getFavoriteData();
      console.log('you saved a favorite!', response);
      //return getFavoriteData();
    });

    return promise;
  };

  //PUBLIC
  var publicApi = {
    factoryFavoriteData: function() {
      return favorites;
    },

    factoryGetData: function() {
      return getFavoriteData();
    },

    factorySaveFavorite: function(favorite) {
      return saveFavorite(favorite);
    }

  };

  return publicApi;

}]);