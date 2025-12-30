# PHP_Laravel12_Crud_With_Master_Using_Angular.JS

---

## What is MASTER CRUD? (Simple Words)

 Master Table = Parent table

### Example we will build:

MASTER TABLES

Categories (Master)

Products (Child – depends on Category)

 One Category → Many Products Child Table = Depends on master


### So we will build:

 Category CRUD (MASTER)
 Product CRUD (CHILD – linked with category_id)




---

# Project SetUp

---

## STEP 1: Create New Laravel 12 Project

### Run Command :

```
composer create-project laravel/laravel:^12.0 PHP_Laravel12_Crud_With_Master_Using_Angular.JS
```

### Go inside project:

```
cd PHP_Laravel12_Crud_With_Master_Using_Angular.JS
```

### Run project:

```
php artisan serve

```
 Open browser :

```
http://127.0.0.1:8000
```



## STEP 2: Database Configuration

### Open .env file and update database credentials:

```

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=crud_master
DB_USERNAME=root
DB_PASSWORD=

```

### Create database:

```
crud_master
```


## STEP 3: Create Models & Migrations

Run Command:

```
php artisan make:model Category -m
php artisan make:model Product -m

```

This creates:

Model → Category.php

Migration → create_categories_table

Model → Product.php

Migration → create_products_table


### Migration: database/migrations/xxxx_create_categories_table.php

```

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};

```
This defines the items table structure.



### Migration: database/migrations/xxxx_create_products_table.php

```

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->integer('price');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

```

This defines the products table structure.



### Run migration:

```
php artisan migrate
```


## STEP 4: Models (Relationship)




### Model: app/Models/Category.php

```

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name'];

    public function products(){
        return $this->hasMany(Product::class);
    }
}


```


### Model: app/Models/Product.php

```

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['category_id','name','price'];

    // app/Models/Product.php
public function category() {
    return $this->belongsTo(Category::class);
}

}

```

## STEP 5: Controllers

### Run Command:
```

php artisan make:controller CategoryController --resource
php artisan make:controller ProductController --resource

```

### app/Http/Controllers/CategoryController.php

```

<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(){
        return response()->json(Category::all());
    }

    public function store(Request $request){
        return response()->json(Category::create($request->all()));
    }

    public function edit($id){
        return response()->json(Category::find($id));
    }

    public function update(Request $request,$id){
        $cat = Category::find($id);
        $cat->update($request->all());
        return response()->json($cat);
    }

    public function destroy($id){
        Category::destroy($id);
        return response()->json(['success'=>true]);
    }
}

```


### app/Http/Controllers/ProductController.php

```

<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
  // Return products with category for index
public function index() {
    $products = Product::with('category')->get();
    return response()->json($products);
}

// Return product with category for store (save)
public function store(Request $request) {
    $product = Product::create($request->all());
    $product->load('category'); // load category object
    return response()->json($product);
}

    public function edit($id){
        return response()->json(Product::find($id));
    }

    // Return product with category for update
public function update(Request $request, Product $product) {
    $product->update($request->all());
    $product->load('category'); // load category object
    return response()->json($product);
}

    public function destroy($id){
        Product::destroy($id);
        return response()->json(['success'=>true]);
    }
}


```


## Step 6: Routes

### routes/web.php

```

<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;

Route::get('/', fn()=>view('app'));

Route::resource('categories', CategoryController::class);
Route::resource('products', ProductController::class);

Route::get('/templates/{template}', function ($template) {
    return view('templates.' . $template);
});

```

## STEP 7: AngularJS Setup

### Create folder structure:

```

public/app/
 ├── controllers
 │   ├── CategoryController.js
 │   └── ProductController.js
 ├── services
 │   └── myServices.js
 ├── routes.js

```


### Controller: public/app/controllers/CategoryController.js
MASTER CRUD (Category)


```

app.controller('CategoryController', function ($scope, dataFactory) {
    $scope.openModal = function (type, category = null) {
        if (type === 'add') {
            $scope.form = {};
        } else if (type === 'edit') {
            $scope.form = angular.copy(category);
        }
        $('#categoryModal').modal('show');
    };

    $scope.categories = [];
    $scope.form = {};

    // =========================
    // GET ALL CATEGORIES
    // =========================
    function loadCategories() {
        dataFactory.httpRequest('categories')
            .then(function (response) {
                $scope.categories = response;
            });
    }

    loadCategories();

    // =========================
    // CREATE CATEGORY
    // =========================
    $scope.save = function () {
        dataFactory.httpRequest('categories', 'POST', {}, $scope.form)
            .then(function (response) {
                $scope.categories.push(response);
                $scope.form = {};
            });
    };

    // =========================
    // EDIT CATEGORY
    // =========================
    $scope.edit = function (cat) {
        $scope.form = angular.copy(cat);
    };

    // =========================
    // UPDATE CATEGORY
    // =========================
    $scope.update = function () {
        dataFactory.httpRequest(
            'categories/' + $scope.form.id,
            'PUT',
            {},
            $scope.form
        ).then(function (response) {

            angular.forEach($scope.categories, function (value, key) {
                if (value.id == response.id) {
                    $scope.categories[key] = response;
                }
            });

            $scope.form = {};
        });
    };

    // =========================
    // DELETE CATEGORY
    // =========================
    $scope.remove = function (id, index) {
        if (confirm("Delete Category?")) {
            dataFactory.httpRequest('categories/' + id, 'DELETE')
                .then(function () {
                    $scope.categories.splice(index, 1);
                });
        }
    };

});

```


### Controller: public/app/controllers/ProductController.js
CHILD CRUD (Product with Category Master)


```

app.controller('ProductController', function ($scope, dataFactory) {
    $scope.openModal = function (type, product = null) {
        if (type === 'add') {
            $scope.form = {};
        } else if (type === 'edit') {
            $scope.form = angular.copy(product);
        }
        $('#productModal').modal('show');
    };

    $scope.products = [];
    $scope.categories = [];
    $scope.form = {};

    // =========================
    // LOAD CATEGORIES (MASTER)
    // =========================
    dataFactory.httpRequest('categories')
        .then(function (response) {
            $scope.categories = response;
        });

    // =========================
    // LOAD PRODUCTS
    // =========================
    function loadProducts() {
        dataFactory.httpRequest('products')
            .then(function (response) {
                $scope.products = response;
            });
    }

    loadProducts();

    // =========================
    // CREATE PRODUCT
    // =========================
    $scope.save = function () {
        dataFactory.httpRequest('products', 'POST', {}, $scope.form)
            .then(function (response) {
                $scope.products.push(response);
                $scope.form = {};
            });
    };

    // =========================
    // EDIT PRODUCT
    // =========================
    $scope.edit = function (product) {
        $scope.form = {
            id: product.id,
            name: product.name,
            price: product.price,
            category_id: product.category_id
        };
    };

    // =========================
    // UPDATE PRODUCT
    // =========================
    $scope.update = function () {
        dataFactory.httpRequest(
            'products/' + $scope.form.id,
            'PUT',
            {},
            $scope.form
        ).then(function (response) {

            angular.forEach($scope.products, function (value, key) {
                if (value.id == response.id) {
                    $scope.products[key] = response;
                }
            });

            $scope.form = {};
        });
    };

    // =========================
    // DELETE PRODUCT
    // =========================
    $scope.remove = function (id, index) {
        if (confirm("Delete Product?")) {
            dataFactory.httpRequest('products/' + id, 'DELETE')
                .then(function () {
                    $scope.products.splice(index, 1);
                });
        }
    };

});

```

### Services: public/app/services/myServices.js

```

app.factory('dataFactory', function($http){

    return {
        httpRequest: function(url, method, params, data){

            return $http({
                url: url,
                method: method || 'GET',
                params: params || {},
                data: data || {}
            }).then(function(response){
                return response.data;
            });

        }
    };

});

```


### AngularJS Route: public/app/routes.js

```

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

```

## Step 8: Blade & Templates

### resources/views/app.blade.php

```

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


```

### Create Folder and write code:

```
public/templates


```

### public/templates/categories.html
MASTER CRUD – Category


```

<div class="row">
    <div class="col-lg-12">
        <h2>Category Management</h2>
        <hr>
        <button class="btn btn-success" ng-click="openModal('add')">
            + Create Category
        </button>
    </div>
</div>

<div class="row" style="margin-top:20px;">
    <div class="col-md-12">
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th width="80">ID</th>
                    <th>Name</th>
                    <th width="200">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="cat in categories">
                    <td>{{ cat.id }}</td>
                    <td>{{ cat.name }}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" ng-click="openModal('edit', cat)">Edit</button>
                        <button class="btn btn-danger btn-sm" ng-click="remove(cat.id, $index)">Delete</button>
                    </td>
                </tr>
                <tr ng-if="categories.length == 0">
                    <td colspan="3" class="text-center">No Categories Found</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<!-- ================== Modal ================== -->
<div class="modal fade" id="categoryModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h4 class="modal-title">{{ form.id ? 'Edit Category' : 'Add Category' }}</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
        <form ng-submit="form.id ? update() : save()">
            <div class="form-group">
                <label>Category Name</label>
                <input type="text" class="form-control" ng-model="form.name" placeholder="Enter category name" required>
            </div>
            <button type="submit" class="btn btn-primary">{{ form.id ? 'Update' : 'Save' }}</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</div>


```


### public/templates/products.html
CHILD CRUD – Product (Linked with Category Master)


```

<div class="row">
    <div class="col-lg-12">
        <h2>Product Management</h2>
        <hr>
        <button class="btn btn-success" ng-click="openModal('add')">
            + Create Product
        </button>
    </div>
</div>

<div class="row" style="margin-top:20px;">
    <div class="col-md-12">
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th width="60">ID</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th width="200">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="p in products">
                    <td>{{ p.id }}</td>
                    <td>{{ p.name }}</td>
                    <td>{{ p.category.name }}</td>
                    <td>{{ p.price }}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" ng-click="openModal('edit', p)">Edit</button>
                        <button class="btn btn-danger btn-sm" ng-click="remove(p.id, $index)">Delete</button>
                    </td>
                </tr>
                <tr ng-if="products.length == 0">
                    <td colspan="5" class="text-center">No Products Found</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<!-- ================== Modal ================== -->
<div class="modal fade" id="productModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h4 class="modal-title">{{ form.id ? 'Edit Product' : 'Add Product' }}</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
        <form ng-submit="form.id ? update() : save()">
            <div class="form-group">
                <label>Category</label>
                <select class="form-control" ng-model="form.category_id" ng-options="c.id as c.name for c in categories" required>
                    <option value="">-- Select Category --</option>
                </select>
            </div>
            <div class="form-group">
                <label>Product Name</label>
                <input type="text" class="form-control" ng-model="form.name" placeholder="Enter product name" required>
            </div>
            <div class="form-group">
                <label>Price</label>
                <input type="number" class="form-control" ng-model="form.price" placeholder="Enter price" required>
            </div>
            <button type="submit" class="btn btn-primary">{{ form.id ? 'Update' : 'Save' }}</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</div>

```


## Step 9: Run Project

### Run Command:
```
php artisan serve
```

### Open:
```
 http://127.0.0.1:8000
```

## So you can see this type output:

### Category Crud:


<img width="1916" height="957" alt="Screenshot 2025-12-30 102245" src="https://github.com/user-attachments/assets/4242cbfa-38f7-4d36-8dbe-0d1a83286abb" />



### ADD Category:

 
<img width="1913" height="958" alt="Screenshot 2025-12-30 102311" src="https://github.com/user-attachments/assets/f36bea22-c43a-44c3-b232-c24ebae2494b" />

<img width="1906" height="957" alt="Screenshot 2025-12-30 102327" src="https://github.com/user-attachments/assets/edf93fc8-6528-4920-8110-5a5762abb395" />


### EDIT Category:

 
<img width="1919" height="962" alt="Screenshot 2025-12-30 102341" src="https://github.com/user-attachments/assets/b5082bc0-3573-4299-a63c-77f0c34bb33f" />

<img width="1914" height="956" alt="image" src="https://github.com/user-attachments/assets/1e159bba-65f0-46ee-adc0-8283ba3f27e5" />


### DELETE Category:

 
<img width="1914" height="955" alt="Screenshot 2025-12-30 102444" src="https://github.com/user-attachments/assets/c7ba30b9-a19f-41f5-934f-c450aab15217" />



### Product Crud:


<img width="1919" height="962" alt="Screenshot 2025-12-30 102457" src="https://github.com/user-attachments/assets/755a9afa-1ed6-4ac0-81f0-127d14be53a1" />



 ### ADD Product:

 
<img width="1915" height="967" alt="Screenshot 2025-12-30 102520" src="https://github.com/user-attachments/assets/eb13caaf-7675-49a0-a863-f6471b84d109" />

<img width="1911" height="962" alt="Screenshot 2025-12-30 102533" src="https://github.com/user-attachments/assets/083a1b89-127c-46ae-a7d3-e12992b55911" />


 ### EDIT Product:

 
<img width="1910" height="958" alt="Screenshot 2025-12-30 102551" src="https://github.com/user-attachments/assets/33013b5c-e097-4e82-8f43-0a7332bc91f2" />

<img width="1912" height="962" alt="Screenshot 2025-12-30 102604" src="https://github.com/user-attachments/assets/f17287d3-6880-4071-9665-656002141f49" />



 ### DELETE Product:

 
<img width="1907" height="963" alt="Screenshot 2025-12-30 102629" src="https://github.com/user-attachments/assets/7e0fe691-3d61-4e96-a53c-2588d9607c92" />



---



# PROJECT FOLDER STRUCTURE:

```

PHP_Laravel12_Crud_With_Master_Using_Angular.JS
│
├── app
│   ├── Http
│   │   └── Controllers
│   │       ├── CategoryController.php
│   │       └── ProductController.php
│   │
│   └── Models
│       ├── Category.php
│       └── Product.php
│
├── database
│   └── migrations
│       ├── xxxx_xx_xx_create_categories_table.php
│       └── xxxx_xx_xx_create_products_table.php
│
├── routes
│   └── web.php
│
├── public
│   ├── app
│   │   ├── routes.js
│   │   ├── services
│   │   │   └── myServices.js
│   │   └── controllers
│   │       ├── CategoryController.js
│   │       └── ProductController.js
│   │
│   └── templates
│       ├── home.html
│       ├── categories.html
│       └── products.html
│
├── resources
│   └── views
│       └── app.blade.php
│
├── .env
├── composer.json
└── README.md
```
 

