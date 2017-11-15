angular.module('MainApp')
    .controller('orderController',orderController);


function orderController(handleToken, $http) {
    var vm = this;
    
    var t = handleToken.getToken();
    vm.auth = false;

    vm.user = handleToken.getPayload(t);
    console.log(vm.user);
    
    vm.getRDP = function () {
        $http.get('/user/allorders', {
                    headers: {Authorization: 'Bearer '+ handleToken.getToken()}
            })
            .then(function(d){
                vm.auth = true;
                console.log('got details ', d.data);
                vm.arr = d.data;
                console.log('vm.arr ', vm.arr);
        })
            .catch(function(e) {
                vm.auth = false;
            
        });
        
    };
    
    vm.getRDP();

}