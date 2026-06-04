var app = angular.module('main-App', ['ngRoute']);

app.factory('dataFactory', function($http, $q) {
    return {
        httpRequest: function(url, method, params, data) {
            var deferred = $q.defer();
            
            // Add base URL if needed
            var fullUrl = '/' + url;
            
            $http({
                url: fullUrl,
                method: method || 'GET',
                params: params || {},
                data: data || {},
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(function(response) {
                // Handle the response - Laravel API returns data directly
                var result = response.data;
                deferred.resolve(result);
            }).catch(function(error) {
                var errorMessage = error.data?.message || error.data?.error || 'An error occurred!';
                deferred.reject(errorMessage);
            });
            
            return deferred.promise;
        },
        
        get: function(url) {
            return this.httpRequest(url, 'GET');
        },
        
        post: function(url, data) {
            return this.httpRequest(url, 'POST', {}, data);
        },
        
        put: function(url, data) {
            return this.httpRequest(url, 'PUT', {}, data);
        },
        
        delete: function(url) {
            return this.httpRequest(url, 'DELETE');
        }
    };
});

app.factory('toastService', function($timeout) {
    var toastContainer = null;
    var currentToast = null;
    
    function showToast(message, type) {
        if (currentToast && currentToast.remove) {
            try {
                currentToast.remove();
            } catch(e) {}
        }
        
        if (!toastContainer) {
            toastContainer = document.getElementById('toast-container');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.id = 'toast-container';
                document.body.appendChild(toastContainer);
            }
        }
        
        var toast = document.createElement('div');
        toast.className = 'toast-msg toast-' + type;
        toast.innerHTML = '<span>' + message + '</span>';
        toast.style.opacity = '1';
        
        toastContainer.appendChild(toast);
        currentToast = toast;
        
        $timeout(function() {
            if (toast && toast.parentNode) {
                toast.style.opacity = '0';
                $timeout(function() {
                    if (toast && toast.parentNode) {
                        toast.remove();
                    }
                }, 500);
            }
        }, 3000);
    }
    
    return {
        success: function(message) {
            showToast(message, 'success');
        },
        error: function(message) {
            showToast(message, 'error');
        },
        info: function(message) {
            showToast(message, 'info');
        }
    };
});