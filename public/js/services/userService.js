// userService
app.factory('userService', ['$http', function ($http) {

    var instance = {};

    instance.getUserName = function () {
        return $http({
            method: 'GET',
            url: '/user/name'
        });
    };

    return instance;
}]);
