// BookController
app.controller('BookController', ['$scope','$routeParams', function($scope, $routeParams) {
  $scope.title = $routeParams.title;
}]);