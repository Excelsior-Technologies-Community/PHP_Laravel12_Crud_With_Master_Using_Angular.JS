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
