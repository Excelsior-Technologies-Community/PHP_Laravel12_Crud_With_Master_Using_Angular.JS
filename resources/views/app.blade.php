<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel 12 + AngularJS Master CRUD</title>
    
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
    
    <!-- Custom Styles -->
    <style>
        .toast-msg {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            color: #fff;
            z-index: 9999;
            border-radius: 4px;
            transition: opacity 0.5s;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            min-width: 250px;
        }
        .toast-success { background-color: #5cb85c; }
        .toast-info { background-color: #5bc0de; }
        .toast-error { background-color: #d9534f; }
        
        [ng-cloak], .ng-cloak { display: none !important; }
        
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .table > tbody > tr > td {
            vertical-align: middle;
        }
        
        .checkbox-group {
            max-height: 150px;
            overflow-y: auto;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
        }
        
        .checkbox-group .checkbox {
            margin-top: 5px;
            margin-bottom: 5px;
        }
        
        .badge-count {
            background-color: #337ab7;
            margin-left: 5px;
        }
    </style>
    
    <!-- jQuery & Bootstrap JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    
    <!-- AngularJS -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-route.min.js"></script>
    
    <!-- Angular App Files -->
    <script src="{{ asset('app/services/myServices.js') }}"></script>
    <script src="{{ asset('app/routes.js') }}"></script>
    <script src="{{ asset('app/controllers/CategoryController.js') }}"></script>
    <script src="{{ asset('app/controllers/SizeController.js') }}"></script>
    <script src="{{ asset('app/controllers/ProductController.js') }}"></script>
</head>
<body ng-app="main-App" ng-cloak>
    <div id="toast-container"></div>
    
    <!-- Loading Overlay -->
    <div class="loading-overlay" ng-show="loading">
        <div class="loading-spinner"></div>
    </div>
    
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#/categories">
                    <strong>Laravel 12 | Master CRUD</strong>
                </a>
            </div>
            <ul class="nav navbar-nav">
                <li><a href="#/categories"><span class="glyphicon glyphicon-tags"></span> Categories</a></li>
                <li><a href="#/sizes"><span class="glyphicon glyphicon-resize-horizontal"></span> Sizes</a></li>
                <li><a href="#/products"><span class="glyphicon glyphicon-shopping-cart"></span> Products</a></li>
            </ul>
        </div>
    </nav>
    
    <!-- Main Content -->
    <div class="container">
        <ng-view></ng-view>
    </div>
</body>
</html>