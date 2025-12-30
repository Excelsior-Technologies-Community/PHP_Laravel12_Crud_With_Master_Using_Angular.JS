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
