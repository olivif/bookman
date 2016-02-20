// userService
app.factory('userService', ["$http", function ($http) {
    
    $http({
        method: 'GET',
        url: '/api/name'
    }).
    success(function (data, status, headers, config) {
        // $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
        // $scope.name = 'Error!';
    });  
}]);
