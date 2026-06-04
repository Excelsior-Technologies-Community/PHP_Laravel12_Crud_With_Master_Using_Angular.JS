app.controller('SizeController', function($scope, dataFactory, toastService) {
    $scope.sizes = [];
    $scope.form = {};
    $scope.loading = false;
    $scope.modalTitle = 'Add Size';
    
    // Load all sizes
    function loadSizes() {
        $scope.loading = true;
        dataFactory.get('sizes')
            .then(function(response) {
                console.log('Sizes API Response:', response);
                if (response.success) {
                    $scope.sizes = response.data || response;
                    if (!Array.isArray($scope.sizes)) {
                        $scope.sizes = [];
                    }
                } else {
                    toastService.error(response.message || 'Failed to load sizes');
                    $scope.sizes = [];
                }
            })
            .catch(function(error) {
                console.error('Error loading sizes:', error);
                toastService.error(error);
                $scope.sizes = [];
            })
            .finally(function() {
                $scope.loading = false;
            });
    }
    
    loadSizes();
    
    // Open modal for add/edit
    $scope.openModal = function(type, size) {
        if (type === 'add') {
            $scope.form = {};
            $scope.modalTitle = 'Add Size';
        } else if (type === 'edit') {
            $scope.form = angular.copy(size);
            $scope.modalTitle = 'Edit Size';
        }
        $('#sizeModal').modal('show');
    };
    
    // Save new size
    $scope.save = function() {
        if (!$scope.form.name) {
            toastService.error('Please enter size name');
            return;
        }
        if (!$scope.form.code) {
            toastService.error('Please enter size code');
            return;
        }
        
        $scope.loading = true;
        dataFactory.post('sizes', $scope.form)
            .then(function(response) {
                if (response.success) {
                    var newSize = response.data || response;
                    $scope.sizes.push(newSize);
                    $scope.form = {};
                    $('#sizeModal').modal('hide');
                    toastService.success(response.message || 'Size created successfully!');
                } else {
                    toastService.error(response.message || 'Failed to create size');
                }
            })
            .catch(function(error) {
                toastService.error(error);
            })
            .finally(function() {
                $scope.loading = false;
            });
    };
    
    // Update existing size
    $scope.update = function() {
        if (!$scope.form.name) {
            toastService.error('Please enter size name');
            return;
        }
        if (!$scope.form.code) {
            toastService.error('Please enter size code');
            return;
        }
        
        $scope.loading = true;
        dataFactory.put('sizes/' + $scope.form.id, $scope.form)
            .then(function(response) {
                if (response.success) {
                    var updatedSize = response.data || response;
                    angular.forEach($scope.sizes, function(size, index) {
                        if (size.id === updatedSize.id) {
                            $scope.sizes[index] = updatedSize;
                        }
                    });
                    $scope.form = {};
                    $('#sizeModal').modal('hide');
                    toastService.success(response.message || 'Size updated successfully!');
                } else {
                    toastService.error(response.message || 'Failed to update size');
                }
            })
            .catch(function(error) {
                toastService.error(error);
            })
            .finally(function() {
                $scope.loading = false;
            });
    };
    
    // Delete size
    $scope.remove = function(id, index) {
        if (confirm('Are you sure you want to delete this size?')) {
            $scope.loading = true;
            dataFactory.delete('sizes/' + id)
                .then(function(response) {
                    if (response.success) {
                        $scope.sizes.splice(index, 1);
                        toastService.success(response.message || 'Size deleted successfully!');
                    } else {
                        toastService.error(response.message || 'Failed to delete size');
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