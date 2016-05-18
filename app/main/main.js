'use strict';
angular.module('main', [
        'ionic',
        'ngCordova',
        'ui.router',
        'LocalStorageModule',
        'base64',
        'ngCordova',
        'ui.router',
        'ngMessages',
        'rzModule'
    ])
    .config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, envServiceProvider, localStorageServiceProvider) {
        $ionicConfigProvider.navBar.alignTitle('left');
        localStorageServiceProvider.setPrefix('truckapp')
            .setStorageType('localStorage')
            .setNotify(true, true);
        /* environment start*/
        var restApi = {
            signup: "/adduser",
            login: "/login",
        };
        var debugmode = false;
        envServiceProvider.config({
            vars: {
                development: {
                    apiUrl: 'http://10.80.80.121:9080/rest',
                    staticUrl: 'http://localhost:3000',
                    restApi: restApi

                },
                qaserver: {
                    apiUrl: 'http://192.241.177.45:8080/tckapp',
                    staticUrl: 'http://192.241.177.45:8080/tckapp',
                    restApi: restApi
                }
            }
        });
        envServiceProvider.check();
        envServiceProvider.set('qaserver');
        /* environment end*/
        // ROUTING with ui.router
        $urlRouterProvider.otherwise('/main/dashboard');
        $stateProvider
        // this state is placed in the <ion-nav-view> in the index.html
            .state('main', {
                url: '/main',
                abstract: true,
                cache: false,
                templateUrl: 'main/templates/menu.html',
                controller: 'MenuCtrl as menu',
            })
            .state('main.login', {
                url: '/login',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/login.html',
                        controller: 'LoginCtrl as login'
                    }
                }
            }).state('main.dashboard', {
                url: '/dashboard',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/dashboard.html',
                        controller: 'DashboardCtrl'
                    }
                }
            }).state('main.registration', {
                url: '/registration',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/registration.html',
                        controller: 'RegistrationCtrl'
                    }
                }
            })
            .state('main.supplierslist', {
                url: '/supplierslist',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/supplierslist.html',
                        //controller: 'RegistrationCtrl'
                    }
                }
            })
            .state('main.booking', {
                url: '/booking',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/booking.html',
                        //controller: 'RegistrationCtrl'
                    }
                }
            })
            .state('main.search', {
                url: '/search',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/search.html',
                        controller: 'SearchCtrl'
                    }
                }
            })
            .state('main.confirmorder', {
                url: '/confirmorder',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/confirmorder.html',
                        //controller: 'SearchCtrl'
                    }
                }
            })
            .state('main.vendororderhistory', {
                url: '/vendororderhistory',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/vendororderhistory.html',
                        //controller: 'SearchCtrl'
                    }
                }
            })
            .state('main.vendorvehicleregistration', {
                url: '/vendorvehicleregistration',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/vendorvehicleregistration.html',
                        //controller: 'SearchCtrl'
                    }
                }
            })
            .state('main.vendorregistration', {
                url: '/vendorregistration',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/vendorregistration.html',
                        //controller: 'SearchCtrl'
                    }
                }
            })
            .state('main.vendordashboard', {
                url: '/vendordashboard',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/vendordashboard.html',
                        //controller: 'SearchCtrl'
                    }
                }
            })
            .state('main.vendororderlist', {
                url: '/vendororderlist',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/vendororderlist.html',
                        //controller: 'SearchCtrl'
                    }
                }
            })
            .state('main.vendorinvoicegeneration', {
                url: '/vendorinvoicegeneration',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/vendorinvoicegeneration.html',
                        //controller: 'SearchCtrl'
                    }
                }
            })
            .state('main.vendoralerts', {
                url: '/vendoralerts',
                views: {
                    'pageContent': {
                        templateUrl: 'main/templates/vendoralerts.html',
                        //controller: 'SearchCtrl'
                    }
                }
            })

    }).run(function($state, $ionicPopup, $ionicHistory, $global, $log, $rootScope, $ionicPlatform, $cordovaStatusbar) {
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            var isLogin = toState.name === 'main.login';
            $global.init();
            $rootScope.$emit('initMenu', "ok");
            if (isLogin) {
                $global.removeLocalItem("authentication");
                $global.removeLocalItem("registration");
                return;
            } else {
                var toStateName = toState.name;
                if (toStateName == 'main.vendoralerts' || toStateName == 'main.vendorinvoicegeneration' || toStateName == 'main.vendororderlist' || toStateName == 'main.vendordashboard' || toStateName == 'main.vendorregistration' || toStateName == 'main.vendorvehicleregistration' || toStateName == 'main.vendororderhistory' || toStateName == 'main.confirmorder' || toStateName == 'main.search' || toStateName == 'main.booking' || toStateName == 'main.supplierslist' || toStateName == 'main.dashboard' || toStateName == 'main.registration' || toStateName == 'main.forgotpassword') {
                    return;
                }
                if ($global.authentication == null || $global.authentication == undefined || $global.authentication == '') {
                    e.preventDefault();
                    $state.go('main.login');
                    return;
                }


            }
        });
    })
