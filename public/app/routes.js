var app = angular.module('main-App', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/categories', { templateUrl: '/templates/categories.html', controller: 'CategoryController' })
        .when('/products', { templateUrl: '/templates/products.html', controller: 'ProductController' })
        .when('/sizes', { templateUrl: '/templates/sizes.html', controller: 'SizeController' })
        .otherwise({ redirectTo: '/categories' });
}]);