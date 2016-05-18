'use strict';
angular.module('main')
.factory('authentication', function($global, httpService) {return {
            register: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().signup;
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
            login: function(data) {
                var url = $global.getApiUrl() + $global.getApiObject().login;
                var val=data.userId+':'+data.password;
                var header=$global.getLoginAuthorization(val);
                var $request = httpService.httpLogin(url,data, header);
                return $request;
            },
            logout: function() {
                var url = $global.getApiUrl() + $global.getApiObject().logout;
                var $request = httpService.httpRequest(url, "P", "");
                return $request;
            }
        };
});
