angular.module('MainApp')
    .service('handleToken', handleToken);


function handleToken($window) {
    
    this.saveToken = function(token) {
        $window.localStorage['mean-token'] = token;

    };
    
    this.getPayload = function(token) {

        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        
        return payload.data;
    };
    
    this.getToken = function() {
        return $window.localStorage['mean-token'];
    };
    
    this.deleteToken = function() {
        $window.localStorage.removeItem('mean-token');
    };
    
    this.isLoggedIn = function() {
        if(!$window.localStorage['mean-token'])
            return false;
        
        return true;
    };
}