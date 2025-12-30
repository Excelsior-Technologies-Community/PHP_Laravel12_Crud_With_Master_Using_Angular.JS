var app = angular.module('main-App', ['ngRoute']);

app.config(function($routeProvider){

    $routeProvider
        .when('/categories', {
            templateUrl: '/templates/categories.html',
            controller: 'CategoryController'
        })

        .when('/products', {
            templateUrl: '/templates/products.html',
            controller: 'ProductController'
        })

        .otherwise({
            redirectTo: '/'
        });

});
