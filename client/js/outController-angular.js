angular.module('MainApp')
    .controller('outController',outController);


function outController($location, $timeout, handleToken) {

    handleToken.deleteToken();
    
    $timeout(function() {
        $location.path('/');
    },1000);
}