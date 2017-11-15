angular.module('MainApp')
    .config(function($routeProvider,$locationProvider){

    $routeProvider
		.when('/', {
			templateUrl: 'template/home.html',
			controller: 'userController',
            controllerAs: 'user'
		})
		.when('/profile', {
			templateUrl: 'template/profile.html',
			controller: 'profileController',
            controllerAs: 'pro'
		})
		.when('/keystat', {
			templateUrl: 'template/orders.html',
			controller: 'orderController',
            controllerAs: 'order'
		})
		.when('/logout', {
			templateUrl: 'template/logout.html',
			controller: 'outController',
            controllerAs: 'out'
		})
		.otherwise({
			redirectTo: '/'
		});

//To make the URLs pretty (getting rid of #)
    $locationProvider.html5Mode(true);
})

    .run(function($rootScope, $location, handleToken) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
          console.log($location.path());
          if ($location.path() !== '/' && !handleToken.isLoggedIn()) {
                $location.path('/');
          }
            
            if($location.path() == '/' && handleToken.isLoggedIn() ){
                $location.path('/profile');
            }
        });
});

















