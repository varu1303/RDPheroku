angular.module('MainApp',['ngRoute','ngAnimate'])
    .controller('MainController', MainController)
    .controller('profileController', profileController);




function MainController ($location) {
    var vm = this;
    
    vm.atHome = function() {
        return '/' == $location.path();
    };
    
    vm.atLoc = function (loc) {
        return loc == $location.path();
    }
    
}


function profileController (handleToken,$rootScope,$http) {
    var pc = this;
    var token = handleToken.getToken();
    $rootScope.userHeader = handleToken.getPayload(token);
    pc.userProfile = $rootScope.userHeader;
    console.log(pc.userProfile);
    pc.allRDP = [];
    pc.RDPname='';
    pc.RDPdate='';
    pc.savechange = false;
    
    
    $http.get('/user/RDP',{
                    headers: {Authorization: 'Bearer '+ handleToken.getToken()}
            })
        .then(function(d){
            console.log(typeof(pc.allRDP));
            for(var i in d.data){
                pc.allRDP.push(d.data[i]);
            }
    })
        .catch(function(e){
            console.log(e);
    });
    
    pc.newRDP = function () {

        $http.put('/user/RDP',{RDPemail:pc.userProfile.userID, RDPname: pc.RDPname, RDPdate: pc.RDPdate})
            .then(function(d){
                pc.allRDP.push({name:pc.RDPname, date:'', status:'Enrolled'});
                pc.RDPname='';
                pc.RDPdate='';
            })
            .catch(function(e){
                console.log(e);
            });

    }
    
    pc.resaveRDP = function () {
        $http.patch('/user/RDP',{embed : pc.allRDP, email: pc.userProfile.userID})
            .then(function(d){
                console.log(d);
            })
            .catch(function(e){
                console.log(e);
            });
    };
} 





