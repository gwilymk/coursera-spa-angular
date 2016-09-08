(function () {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.message = '';
    $scope.lunchItems = '';

    $scope.checkTooMuch = function () {
      if($scope.lunchItems.trim() === '') {
        $scope.message = 'Please enter data first';
        return;
      }

      var numberOfItems = $scope.lunchItems.split(',').length;

      if(numberOfItems > 3) {
        $scope.message = 'Too Much';
      } else {
        $scope.message = 'Enjoy!';
      }
    };
  }
})();
