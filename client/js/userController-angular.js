angular.module('MainApp')
    .controller('userController',userController);



function userController ($http, $timeout, $location, handleToken) {

    var vm = this;
    
    vm.l = {
        logEmail: '',
        logPass: ''
    };
    vm.u = {
        userName: '',
        userEmail: '',
        userPass: '',
        userConPass: '',
        techSelect: 'Java'
    };
    vm.logError = false;
    vm.logSuccess = false;
    vm.registerError = false;
    vm.registerSuccess = false;
    
    vm.log = function() {

        $http.post('/user/login',vm.l)
            .then(function(d){
                handleToken.saveToken(d.data);
                vm.logSuccess=true;
                vm.logError=false;
                $timeout(function(){
                    vm.logSuccess=false;
                    $location.path('/profile');
                vm.l = {
                    logEmail: '',
                    logPass: ''
                };
                }, 1000);
        })
            .catch(function(e){
                vm.logError=true;
        });
    };
    
    vm.reset = function() {
        vm.logError=false;
        vm.registerError = false;
        vm.u = {
            userName: '',
            userEmail: '',
            userPass: '',
            userConPass: '',
            techSelect: 'Java'
        };
        vm.l = {
            logEmail: '',
            logPass: ''
        };
    };
    
    vm.register = function() {
        $http.post('/user/register',vm.u)
            .then(function(d){
                vm.u = {
                    userName: '',
                    userEmail: '',
                    userPass: '',
                    userConPass: '',
                    techSelect: 'Java'
                    };
            vm.registerSuccess = true;
            vm.registerError = false;
            
            $timeout(function(){
                console.log('timeout ran');
                vm.registerSuccess = false;
                angular.element('#login-form-link').trigger('click');
            }, 1000);
        })
            .catch(function(e){
            console.log(e);
            vm.registerError = true;
            vm.registerSuccess = false;
        });
        
    };
}