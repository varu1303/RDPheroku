angular.module('MainApp')
    .controller('orderController',orderController);


function orderController(handleToken, $http) {
    var vm = this;
    
    var t = handleToken.getToken();
    vm.auth = false;

    vm.user = handleToken.getPayload(t);
    console.log(vm.user);
    
    vm.getOrders = function () {
        $http.get('/api/allorders', {
                    headers: {Authorization: 'Bearer '+ handleToken.getToken()}
            })
            .then(function(d){
                vm.auth = true;
        })
            .catch(function(e) {
                vm.auth = false;
            
        });
        
    };
    
    vm.getOrders();

}