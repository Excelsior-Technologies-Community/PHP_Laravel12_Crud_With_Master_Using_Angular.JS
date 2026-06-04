var app = angular.module('main-App', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/categories', {
            templateUrl: '/templates/categories',
            controller: 'CategoryController'
        })
        .when('/products', {
            templateUrl: '/templates/products',
            controller: 'ProductController'
        })
        .when('/sizes', {
            templateUrl: '/templates/sizes',
            controller: 'SizeController'
        })
        .otherwise({
            redirectTo: '/categories'
        });
});