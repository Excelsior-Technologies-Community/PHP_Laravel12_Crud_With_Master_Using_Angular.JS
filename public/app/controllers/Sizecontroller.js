app.controller('SizeController', function ($scope, dataFactory) {
    $scope.sizes = [];
    $scope.form = {};

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

    function loadSizes() {
        dataFactory.httpRequest('sizes').then(function (res) { $scope.sizes = res; });
    }
    loadSizes();

    $scope.openModal = function (type, size) {
        $scope.form = (type === 'edit') ? angular.copy(size) : {};
        $('#sizeModal').modal('show');
    };

    $scope.save = function () {
        dataFactory.httpRequest('sizes', 'POST', {}, $scope.form).then(function (res) {
            $scope.sizes.push(res);
            $('#sizeModal').modal('hide');
            $scope.showToast('Size created!', 'success');
        });
    };

    $scope.update = function () {
        dataFactory.httpRequest('sizes/' + $scope.form.id, 'PUT', {}, $scope.form).then(function (res) {
            angular.forEach($scope.sizes, function (s, k) {
                if (s.id == res.id) $scope.sizes[k] = res;
            });
            $('#sizeModal').modal('hide');
            $scope.showToast('Size updated!', 'info');
        });
    };

    $scope.remove = function (id, index) {
        if (!confirm('Delete Size?')) return;
        dataFactory.httpRequest('sizes/' + id, 'DELETE').then(function () {
            $scope.sizes.splice(index, 1);
            $scope.showToast('Size deleted!', 'error');
        });
    };
});