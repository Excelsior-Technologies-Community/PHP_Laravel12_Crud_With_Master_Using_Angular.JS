app.controller('CategoryController', function($scope, dataFactory, toastService) {
    $scope.categories = [];
    $scope.form = {};
    $scope.loading = false;
    $scope.modalTitle = 'Add Category';
    
    // Load all categories
    function loadCategories() {
        $scope.loading = true;
        dataFactory.get('categories')
            .then(function(response) {
                console.log('API Response:', response); // Debug log
                // FIX: Check if data is in response.data or directly in response
                if (response.success) {
                    // Handle both response formats
                    $scope.categories = response.data || response;
                    if (Array.isArray($scope.categories)) {
                        console.log('Categories loaded:', $scope.categories.length);
                    } else {
                        $scope.categories = [];
                    }
                } else {
                    toastService.error(response.message || 'Failed to load categories');
                    $scope.categories = [];
                }
            })
            .catch(function(error) {
                console.error('Error loading categories:', error);
                toastService.error(error);
                $scope.categories = [];
            })
            .finally(function() {
                $scope.loading = false;
            });
    }
    
    loadCategories();
    
    // Open modal for add/edit
    $scope.openModal = function(type, category) {
        if (type === 'add') {
            $scope.form = {};
            $scope.modalTitle = 'Add Category';
        } else if (type === 'edit') {
            $scope.form = angular.copy(category);
            $scope.modalTitle = 'Edit Category';
        }
        $('#categoryModal').modal('show');
    };
    
    // Save new category
    $scope.save = function() {
        if (!$scope.form.name) {
            toastService.error('Please enter category name');
            return;
        }
        
        $scope.loading = true;
        dataFactory.post('categories', $scope.form)
            .then(function(response) {
                if (response.success) {
                    var newCategory = response.data || response;
                    $scope.categories.push(newCategory);
                    $scope.form = {};
                    $('#categoryModal').modal('hide');
                    toastService.success(response.message || 'Category created successfully!');
                } else {
                    toastService.error(response.message || 'Failed to create category');
                }
            })
            .catch(function(error) {
                toastService.error(error);
            })
            .finally(function() {
                $scope.loading = false;
            });
    };
    
    // Update existing category
    $scope.update = function() {
        if (!$scope.form.name) {
            toastService.error('Please enter category name');
            return;
        }
        
        $scope.loading = true;
        dataFactory.put('categories/' + $scope.form.id, $scope.form)
            .then(function(response) {
                if (response.success) {
                    var updatedCategory = response.data || response;
                    // Update in list
                    angular.forEach($scope.categories, function(cat, index) {
                        if (cat.id === updatedCategory.id) {
                            $scope.categories[index] = updatedCategory;
                        }
                    });
                    $scope.form = {};
                    $('#categoryModal').modal('hide');
                    toastService.success(response.message || 'Category updated successfully!');
                } else {
                    toastService.error(response.message || 'Failed to update category');
                }
            })
            .catch(function(error) {
                toastService.error(error);
            })
            .finally(function() {
                $scope.loading = false;
            });
    };
    
    // Delete category
    $scope.remove = function(id, index) {
        if (confirm('Are you sure you want to delete this category?')) {
            $scope.loading = true;
            dataFactory.delete('categories/' + id)
                .then(function(response) {
                    if (response.success) {
                        $scope.categories.splice(index, 1);
                        toastService.success(response.message || 'Category deleted successfully!');
                    } else {
                        toastService.error(response.message || 'Failed to delete category');
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