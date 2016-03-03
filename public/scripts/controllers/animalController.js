myApp.controller('AnimalController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
  console.log('Animal Controller');

  function petFinder(animalSpecies) {
    $scope.data = {};

    var key = '8d496ca16952db637c1c5a8a9680cb49';

    var baseURL = 'http://api.petfinder.com/';
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + animalSpecies;
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        $scope.animal = response.data.petfinder.pet;
        console.log($scope.animal);
        console.log('animal typpppeeeee', $scope.animalType);
        return $scope.animalType;
      }
    );
  }


  $scope.dataFactory = DataFactory;

  $scope.animalType = '';
  $scope.search = false;

  $scope.data = {};



  $scope.animalSearch = function() {
    // check option value
    if($scope.animalType != '') {

      petFinder($scope.animalType);
      // valid selection, do something

      $scope.search = true;
    } else {
      // invalid, reset bool
      $scope.search = false;
    }

  };


  $scope.addFavorite = function() {
    var favorite = {
      type: $scope.animalType,
      name: $scope.animal.name.$t,
      image_url: $scope.animal.media.photos.photo[2].$t,
      description: $scope.animal.description.$t
    };

    console.log("my favvvvTYPEEEE::: ", favorite.type);


    $scope.dataFactory.factorySaveFavorite(favorite).then(function() {
      $scope.numFaves = $scope.dataFactory.factoryFavoriteData().length;
    });
  };

}]);

