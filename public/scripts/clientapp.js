var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/animal', {
      templateUrl: '/views/templates/animal.html',
      controller: 'AnimalController'
    })
    .when('/favorites', {
      templateUrl: '/views/templates/favorites.html',
      controller: 'FavoritesController'
    })
    .otherwise({
      redirectTo: 'animal'
    });
}]);
