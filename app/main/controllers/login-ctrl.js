'use strict';
angular.module('main')
    .controller('LoginCtrl', function($ionicModal, $scope, $global, authentication, $state, $ionicLoading, $timeout, $rootScope) {
        $scope.loginInfo = {};
        $rootScope.$emit('initMenu', "ok");
        $scope.loginSubmit = function(form, loginInfo) {
            $scope.loginError = "";
            if (form.$invalid) {
                return false;
            }
            $ionicLoading.show();
            authentication.login(loginInfo).then(function(res) {
                if (res.status == $global.SUCCESS) {
                    $global.setLocalItem("authentication", res, true);
                    $ionicLoading.hide();
                    $state.go("main.dashboard");
                } else if (res.status == $global.FAILURE) {
                    $ionicLoading.hide();
                    $global.showToastMessage(res.error.message, 'short', 'center');
                }
            }, function(err) {
                $scope.loginError = $global.ERR_CONNECTION_REFUSED;
                $ionicLoading.hide();
            });
        };
    });
