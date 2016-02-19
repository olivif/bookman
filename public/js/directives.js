'use strict';

// Directives
var directives = angular.module('bookmanApp.directives', []);

// AppVersion
directives.directive('appVersion', function (version) {
    return function (scope, elm, attrs) {
        elm.text("v0.0.0");
    };
});
