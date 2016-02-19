'use strict';

// Filters
var filters = angular.module('bookmanApp.filters', []);

// Interpolate
filters.filter('interpolate', function (version) {
    return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
});
