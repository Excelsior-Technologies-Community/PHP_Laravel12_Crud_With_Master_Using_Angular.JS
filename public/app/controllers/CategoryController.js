// public/app/controllers/CategoryController.js

app.controller('CategoryController', function ($scope, dataFactory) {

    $scope.categories = [];
    $scope.form       = {};

    // ─── TOAST ───────────────────────────────────────────────────────────────
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

    // ─── OPEN MODAL ───────────────────────────────────────────────────────────
    $scope.openModal = function (type, category) {
        $scope.form = (type === 'edit') ? angular.copy(category) : {};
        $('#categoryModal').modal('show');
    };

    // ─── LOAD ─────────────────────────────────────────────────────────────────
    function loadCategories() {
        dataFactory.httpRequest('categories')
            .then(function (res) {
                $scope.categories = res;
            });
    }

    loadCategories();

    // ─── CREATE ───────────────────────────────────────────────────────────────
    $scope.save = function () {
        dataFactory.httpRequest('categories', 'POST', {}, $scope.form)
            .then(function (res) {
                $scope.categories.push(res);
                $scope.form = {};
                $('#categoryModal').modal('hide');
                $scope.showToast('Category created!', 'success');
            });
    };

    // ─── UPDATE ───────────────────────────────────────────────────────────────
    $scope.update = function () {
        dataFactory.httpRequest('categories/' + $scope.form.id, 'PUT', {}, $scope.form)
            .then(function (res) {
                angular.forEach($scope.categories, function (c, k) {
                    if (c.id == res.id) $scope.categories[k] = res;
                });
                $scope.form = {};
                $('#categoryModal').modal('hide');
                $scope.showToast('Category updated!', 'info');
            });
    };

    // ─── DELETE ───────────────────────────────────────────────────────────────
    $scope.remove = function (id, index) {
        if (!confirm('Delete Category?')) return;
        dataFactory.httpRequest('categories/' + id, 'DELETE')
            .then(function () {
                $scope.categories.splice(index, 1);
                $scope.showToast('Category deleted!', 'error');
            });
    };

});