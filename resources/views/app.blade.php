<!DOCTYPE html>
<html lang="en" ng-app="main-App">
<head>
    <meta charset="utf-8">
    <title>Laravel 12 + AngularJS Master CRUD</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">

    <!-- jQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"></script>

    <!-- AngularJS -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular-route.min.js"></script>

    <!-- Angular App Files -->
    <script src="{{ asset('app/routes.js') }}"></script>
    <script src="{{ asset('app/services/myServices.js') }}"></script>

    <!-- Controllers -->
    <script src="{{ asset('app/controllers/CategoryController.js') }}"></script>
    <script src="{{ asset('app/controllers/ProductController.js') }}"></script>

</head>
<body>

<!-- ================= NAVBAR ================= -->
<nav class="navbar navbar-default">
    <div class="container-fluid">

        <!-- Brand -->
        <div class="navbar-header">
            <a class="navbar-brand" href="#/">Laravel 12</a>
        </div>

        <!-- Links -->
        <ul class="nav navbar-nav">
            <li><a href="#/categories">Categories</a></li>
            <li><a href="#/products">Products</a></li>
        </ul>

    </div>
</nav>

<!-- ================= MAIN CONTENT ================= -->
<div class="container">
    <ng-view></ng-view>
</div>

</body>
</html>
