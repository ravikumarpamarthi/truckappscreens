'use strict';
angular.module('main')
    .controller('MenuCtrl', function($ionicModal, $scope, $cordovaNetwork, $ionicLoading, $state, $global, $rootScope, $ionicPopup, $timeout) {

        $rootScope.go = function(state) {
            $state.go(state);
        }
        var myPopup = function() {
            $scope.offlinePopup = $ionicPopup.show({
                template: 'Check your data connection',
                title: 'Network Problem',
                buttons: [

                    {
                        text: '<b>Try Again</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if ($cordovaNetwork.isOnline()) {
                                $scope.offlinePopup.close();
                            } else {
                                e.preventDefault();
                            }
                        }
                    }
                ]
            });
        }
        var badRequest = function() {
            $scope.badRequest = $ionicPopup.show({
                template: 'Unable to connect server',
                title: 'Server Error',
                buttons: [

                    {
                        text: '<b>Try Again</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            $scope.badRequest.close();
                            $state.go($state.current, {}, {
                                reload: true
                            });
                        }
                    }
                ]
            });
        }

        var badGps = function() {
            $scope.badGps = $ionicPopup.show({
                template: 'Please Share your location',
                title: 'Geolocation Problem',
                buttons: [

                    {
                        text: '<b>Try Again</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            $global.getCurrentLocation().then(function(latlng) {
                                $scope.badGps.close();
                            }, function(err) {

                            })
                        }
                    }
                ]
            });
        }
        $scope.authentication = $global.authentication;
        $rootScope.$on("initMenu", function() {
            $scope.authentication = $global.authentication;
        })

        $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
            if ($scope.offlinePopup) {
                $scope.offlinePopup.close();
                $state.go($state.current, {}, {
                    reload: true
                });
                $scope.offlinePopup = null;
            }
        })

        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
            if (!$scope.offlinePopup) {
                myPopup();
            }
        })
        $rootScope.$on('badRequest', function(event, networkState) {
            if (!$scope.badRequest) {
                badRequest();
            }
        })
        $rootScope.$on('badGps', function(event, networkState) {
            // badGps();
        })
        $rootScope.$on('invalidApiToken', function(event) {
            $global.showToastMessage('Your Session has expired please login again', 'short', 'center');
            $ionicLoading.hide();
            $state.go("main.login");
        })


    });
