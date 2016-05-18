'use strict';
angular.module('main')
    .controller('RegistrationCtrl', function($scope, $state, authentication, $global, $ionicLoading, $timeout) {
        $scope.authorization = {}
        $scope.signUp = function(form) {

            $scope.errMessage = "";
            if (form.$valid) {
                $ionicLoading.show();
                authentication.register($scope.authorization).then(function(res) {
                    $scope.cfdump = res;
                    if (res.status == $global.SUCCESS) {
                        $ionicLoading.hide();
                        $global.showToastMessage("Registration is successfull Please login", 'short', 'center');
                        $state.go('main.login', {
                            queryParams: $scope.authorization
                        });
                    } else if (res.status == $global.FAILURE) {
                        $ionicLoading.hide();
                        $global.showToastMessage(res.error.message, 'short', 'center');

                    }

                });
            }
        };

    });
