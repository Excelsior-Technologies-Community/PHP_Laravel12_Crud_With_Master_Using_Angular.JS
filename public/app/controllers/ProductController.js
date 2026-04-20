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
    // SEARCH + FILTER
    // =========================
    $scope.search = {
        name: '',
        category_id: ''
    };

    // =========================
    // PAGINATION
    // =========================
    $scope.currentPage = 1;
    $scope.pageSize = 5;

    // =========================
    // FILTER FUNCTION
    // =========================
    $scope.filterProducts = function (product) {

        let matchName = true;
        let matchCategory = true;

        // Search by name
        if ($scope.search.name) {
            matchName = product.name.toLowerCase()
                .includes($scope.search.name.toLowerCase());
        }

        // Filter by category dropdown
        if ($scope.search.category_id) {
            matchCategory = product.category_id == $scope.search.category_id;
        }

        return matchName && matchCategory;
    };

    // =========================
    // PAGINATED DATA
    // =========================
    $scope.getPaginatedData = function () {
        let filtered = $scope.products.filter($scope.filterProducts);

        let start = ($scope.currentPage - 1) * $scope.pageSize;
        let end = start + $scope.pageSize;

        return filtered.slice(start, end);
    };

    // =========================
    // TOTAL PAGES
    // =========================
    $scope.totalPages = function () {
        return Math.ceil(
            $scope.products.filter($scope.filterProducts).length / $scope.pageSize
        );
    };

    // =========================
    // PAGE FUNCTIONS
    // =========================
    $scope.setPage = function (page) {
        if (page >= 1 && page <= $scope.totalPages()) {
            $scope.currentPage = page;
        }
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.totalPages()) {
            $scope.currentPage++;
        }
    };

    // Reset page when filter/search changes
    $scope.$watch('search', function () {
        $scope.currentPage = 1;
    }, true);

    // =========================
    // LOAD CATEGORIES
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
    // CREATE
    // =========================
    $scope.save = function () {
        dataFactory.httpRequest('products', 'POST', {}, $scope.form)
            .then(function (response) {
                $scope.products.push(response);
                $scope.form = {};
            });
    };

    // =========================
    // EDIT
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
    // UPDATE
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
    // DELETE
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