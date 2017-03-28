(function() {
    'use strict';

    angular.module('timesheet')
        .config(routeConfig)
        .run(highLightMenu);

    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider


            .state('login', {
                url: '/login',
                templateUrl: '/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                title : 'Login',
                onEnter: ['$state', 'Authentication', function ($state, Authentication) {
                    if (Authentication.isAuthenticated()) {
                        $state.go('secure.home');
                    }
                }],
            })
            // .state('home', {
            //     url: '/',
            //     templateUrl: '/home/unsecurehome.html',
            //     title: 'Home',
            //     highlight : 'home',
            //     controller: 'HomeController',
            //     controllerAs: 'vm',
            //     onEnter: ['$state', 'Authentication', function ($state, Authentication) {
            //         if (Authentication.isAuthenticated()) {
            //             $state.go('secure.home');
            //         }
            //     }],
            // })
            .state('secure', {
                url: '/secure',
                templateUrl: '/shared/secure.html',
                title: 'Secure',
                controller: 'SecureController',
                controllerAs: 'vm',
                abstract: true,
                onEnter: ['$state', 'Authentication', function ($state, Authentication) {
                    if (!Authentication.isAuthenticated()) {
                        $state.go('login');
                    }
                }],
            })
            .state('home', {
                url: '/home',
                templateUrl: '/home/home.html',
                title: 'Home',
                highlight: 'home',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('Entry', {
                url: '/Entry',
                title : 'Entry',
                templateUrl: '/Entry/Entry.html',
                controller: 'AddEntriesController',
                controllerAs: 'vm'
            })
            .state('Project', {
                url: '/Project',
                templateUrl: '/Project/Project.html',
                controller: 'AddProjectController',
                controllerAs: 'vm',
                title : 'AddProject'
            })

            ;

        $urlRouterProvider.otherwise('/home');
    }

    function highLightMenu($rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;

        });
    }

})();
