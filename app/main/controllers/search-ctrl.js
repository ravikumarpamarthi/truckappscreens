'use strict';
angular.module('main')
.controller('SearchCtrl', function ($scope) {

  //Slider with ticks and values
  $scope.slider_ticks_values = {
    value: 0,
    options: {
      ceil: 5,
      floor: 0,
      showTicksValues: true,
      ticksValuesTooltip: function(v) {
        return 'Tooltip for ' + v;
      }
    }
  };  

});
