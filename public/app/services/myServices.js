app.factory('dataFactory', function($http){

    return {
        httpRequest: function(url, method, params, data){

            return $http({
                url: url,
                method: method || 'GET',
                params: params || {},
                data: data || {}
            }).then(function(response){
                return response.data;
            });

        }
    };

});
