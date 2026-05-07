<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel 12 AngularJS Master</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
    <style>
        .toast-msg { position: fixed; top: 20px; right: 20px; padding: 15px; color: #fff; z-index: 9999; border-radius: 4px; transition: opacity 0.5s; }
        .toast-success { background-color: #5cb85c; }
        .toast-info { background-color: #5bc0de; }
        .toast-error { background-color: #d9534f; }
        [ng-cloak], .ng-cloak { display: none !important; }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-route.min.js"></script>

    <script src="{{ asset('app/routes.js') }}"></script>
    <script src="{{ asset('app/services/myServices.js') }}"></script>
    <script src="{{ asset('app/controllers/CategoryController.js') }}"></script>
    <script src="{{ asset('app/controllers/ProductController.js') }}"></script>
    <script src="{{ asset('app/controllers/SizeController.js') }}"></script>
</head>
<body ng-app="main-App" ng-cloak>
    <div id="toast-container"></div>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#/categories">Master Panel</a>
            </div>
            <ul class="nav navbar-nav">
                <li><a href="#/categories">Categories</a></li>
                <li><a href="#/sizes">Sizes</a></li>
                <li><a href="#/products">Products</a></li>
            </ul>
        </div>
    </nav>
    <div class="container">
        <ng-view></ng-view>
    </div>
</body>
</html>