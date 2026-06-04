app.controller('ProductController', function($scope, dataFactory, toastService) {
    $scope.products = [];
    $scope.categories = [];
    $scope.sizes = [];
    $scope.form = {};
    $scope.loading = false;
    $scope.modalTitle = 'Add Product';
    
    // Load all categories for dropdown
    function loadCategories() {
        dataFactory.get('categories')
            .then(function(response) {
                if (response.success) {
                    $scope.categories = response.data || response;
                    if (!Array.isArray($scope.categories)) {
                        $scope.categories = [];
                    }
                }
            })
            .catch(function(error) {
                console.error('Error loading categories:', error);
            });
    }
    
    // Load all sizes for checkboxes
    function loadSizes() {
        dataFactory.get('sizes')
            .then(function(response) {
                if (response.success) {
                    $scope.sizes = response.data || response;
                    if (!Array.isArray($scope.sizes)) {
                        $scope.sizes = [];
                    }
                }
            })
            .catch(function(error) {
                console.error('Error loading sizes:', error);
            });
    }
    
    // Load all products
    function loadProducts() {
        $scope.loading = true;
        dataFactory.get('products')
            .then(function(response) {
                console.log('Products API Response:', response);
                if (response.success) {
                    $scope.products = response.data || response;
                    if (!Array.isArray($scope.products)) {
                        $scope.products = [];
                    }
                    console.log('Products loaded:', $scope.products.length);
                } else {
                    toastService.error(response.message || 'Failed to load products');
                    $scope.products = [];
                }
            })
            .catch(function(error) {
                console.error('Error loading products:', error);
                toastService.error(error);
                $scope.products = [];
            })
            .finally(function() {
                $scope.loading = false;
            });
    }
    
    loadCategories();
    loadSizes();
    loadProducts();
    
    // Open modal for add/edit
    $scope.openModal = function(type, product) {
        if (type === 'add') {
            $scope.form = {
                size_ids: []
            };
            $scope.modalTitle = 'Add Product';
        } else if (type === 'edit') {
            $scope.form = {
                id: product.id,
                name: product.name,
                price: product.price,
                category_id: product.category_id,
                size_ids: product.sizes ? product.sizes.map(function(s) { return s.id; }) : []
            };
            $scope.modalTitle = 'Edit Product';
        }
        $('#productModal').modal('show');
    };
    
    // Toggle size selection
    $scope.toggleSize = function(sizeId) {
        if (!$scope.form.size_ids) {
            $scope.form.size_ids = [];
        }
        var index = $scope.form.size_ids.indexOf(sizeId);
        if (index === -1) {
            $scope.form.size_ids.push(sizeId);
        } else {
            $scope.form.size_ids.splice(index, 1);
        }
    };
    
    // Check if size is selected
    $scope.isSizeSelected = function(sizeId) {
        return $scope.form.size_ids && $scope.form.size_ids.indexOf(sizeId) !== -1;
    };
    
    // Save new product
    $scope.save = function() {
        if (!$scope.form.name) {
            toastService.error('Please enter product name');
            return;
        }
        if (!$scope.form.price) {
            toastService.error('Please enter product price');
            return;
        }
        if (!$scope.form.category_id) {
            toastService.error('Please select a category');
            return;
        }
        
        $scope.loading = true;
        dataFactory.post('products', $scope.form)
            .then(function(response) {
                if (response.success) {
                    var newProduct = response.data || response;
                    $scope.products.push(newProduct);
                    $scope.form = { size_ids: [] };
                    $('#productModal').modal('hide');
                    toastService.success(response.message || 'Product created successfully!');
                } else {
                    toastService.error(response.message || 'Failed to create product');
                }
            })
            .catch(function(error) {
                toastService.error(error);
            })
            .finally(function() {
                $scope.loading = false;
            });
    };
    
    // Update existing product
    $scope.update = function() {
        if (!$scope.form.name) {
            toastService.error('Please enter product name');
            return;
        }
        if (!$scope.form.price) {
            toastService.error('Please enter product price');
            return;
        }
        if (!$scope.form.category_id) {
            toastService.error('Please select a category');
            return;
        }
        
        $scope.loading = true;
        dataFactory.put('products/' + $scope.form.id, $scope.form)
            .then(function(response) {
                if (response.success) {
                    var updatedProduct = response.data || response;
                    angular.forEach($scope.products, function(product, index) {
                        if (product.id === updatedProduct.id) {
                            $scope.products[index] = updatedProduct;
                        }
                    });
                    $scope.form = { size_ids: [] };
                    $('#productModal').modal('hide');
                    toastService.success(response.message || 'Product updated successfully!');
                } else {
                    toastService.error(response.message || 'Failed to update product');
                }
            })
            .catch(function(error) {
                toastService.error(error);
            })
            .finally(function() {
                $scope.loading = false;
            });
    };
    
    // Delete product
    $scope.remove = function(id, index) {
        if (confirm('Are you sure you want to delete this product?')) {
            $scope.loading = true;
            dataFactory.delete('products/' + id)
                .then(function(response) {
                    if (response.success) {
                        $scope.products.splice(index, 1);
                        toastService.success(response.message || 'Product deleted successfully!');
                    } else {
                        toastService.error(response.message || 'Failed to delete product');
                    }
                })
                .catch(function(error) {
                    toastService.error(error);
                })
                .finally(function() {
                    $scope.loading = false;
                });
        }
    };
});