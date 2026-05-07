// public/app/services/myServices.js

app.factory('dataFactory', function ($http) {

    // CSRF token for POST/PUT/DELETE
    var csrfMeta = document.querySelector('meta[name="csrf-token"]');
    if (csrfMeta) {
        $http.defaults.headers.common['X-CSRF-TOKEN'] = csrfMeta.getAttribute('content');
    }

    return {
        httpRequest: function (url, method, params, data) {
            return $http({
                url:    url,
                method: method || 'GET',
                params: params || {},
                data:   data   || {}
            }).then(function (response) {
                return response.data;
            });
        }
    };

});