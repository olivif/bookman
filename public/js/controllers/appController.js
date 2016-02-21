// AppController
app.controller('AppController', ["$scope", "userService", function ($scope, userService) {
    
    // Load user name 
    userService.getUserName()
        .success(function (data, status, headers, config) {
            $scope.userName = data;
        })
        .error(function (data, status, headers, config) {
            // set some error somewhere
        });  
}]);