describe("client tests", function () {

    var scope, $state, createController;

    beforeEach(module('bookmanApp')); //<--- Hook module

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        createController = function () {
            return $controller('LoginController', {
                '$scope': scope
            });
        };
    }));

    describe("LoginController", function () {

        it('should find controller', function () {
            var controller = createController();
            should.exist(controller);
        });
    });
});