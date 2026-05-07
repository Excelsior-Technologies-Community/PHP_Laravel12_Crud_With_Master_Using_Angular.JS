app.controller('ProductController', function ($scope, dataFactory) {

    $scope.products = [];
    $scope.categories = [];
    $scope.sizes = [];
    $scope.form = {};
    $scope.search = { name: '', category_id: '' };
    $scope.currentPage = 1;
    $scope.pageSize = 5;

    $scope.showToast = function (msg, type) {
        var el = document.createElement('div');
        el.className = 'toast-msg toast-' + (type || 'success');
        el.innerText = msg;
        document.getElementById('toast-container').appendChild(el);
        setTimeout(function () {
            el.style.opacity = '0';
            setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 500);
        }, 3000);
    };

    $scope.openModal = function (type, product) {
        if (type === 'add') {
            $scope.form = {};
        } else {
            $scope.form = angular.copy(product);
            if (product.sizes && product.sizes.length > 0) {
                $scope.form.size_id = product.sizes.id;
            }
        }
        $('#productModal').modal('show');
    };

    $scope.filterProducts = function (product) {
        var matchName = true;
        var matchCategory = true;
        if ($scope.search.name) {
            matchName = product.name.toLowerCase().includes($scope.search.name.toLowerCase());
        }
        if ($scope.search.category_id) {
            matchCategory = product.category_id == $scope.search.category_id;
        }
        return matchName && matchCategory;
    };

    $scope.getPaginatedData = function () {
        var filtered = $scope.products.filter($scope.filterProducts);
        var start = ($scope.currentPage - 1) * $scope.pageSize;
        return filtered.slice(start, start + $scope.pageSize);
    };

    $scope.totalPages = function () {
        var count = $scope.products.filter($scope.filterProducts).length;
        return Math.ceil(count / $scope.pageSize) || 1;
    };

    $scope.setPage = function (p) { 
        if (p >= 1 && p <= $scope.totalPages()) $scope.currentPage = p; 
    };
    
    $scope.prevPage = function () { 
        if ($scope.currentPage > 1) $scope.currentPage--; 
    };
    
    $scope.nextPage = function () { 
        if ($scope.currentPage < $scope.totalPages()) $scope.currentPage++; 
    };

    $scope.$watch('search', function () { 
        $scope.currentPage = 1; 
    }, true);

    dataFactory.httpRequest('categories').then(function (res) { $scope.categories = res; });
    dataFactory.httpRequest('sizes').then(function (res) { $scope.sizes = res; });

    function loadProducts() {
        dataFactory.httpRequest('products').then(function (res) { $scope.products = res; });
    }

    loadProducts();

    $scope.save = function () {
        var payload = angular.copy($scope.form);
        if (payload.size_id) {
            payload.size_ids = [payload.size_id];
        }

        dataFactory.httpRequest('products', 'POST', {}, payload).then(function (res) {
            $scope.products.push(res);
            $scope.form = {};
            $('#productModal').modal('hide');
            $scope.showToast('Product created!', 'success');
        });
    };

    $scope.update = function () {
        var payload = angular.copy($scope.form);
        if (payload.size_id) {
            payload.size_ids = [payload.size_id];
        }

        dataFactory.httpRequest('products/' + payload.id, 'PUT', {}, payload).then(function (res) {
            angular.forEach($scope.products, function (p, k) {
                if (p.id == res.id) $scope.products[k] = res;
            });
            $scope.form = {};
            $('#productModal').modal('hide');
            $scope.showToast('Product updated!', 'info');
        });
    };

    $scope.remove = function (id, index) {
        if (!confirm('Delete product?')) return;
        dataFactory.httpRequest('products/' + id, 'DELETE').then(function () {
            $scope.products.splice(index, 1);
            $scope.showToast('Product deleted!', 'error');
        });
    };

});