(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

   
  HomeController.$inject = ['$scope', 'Authentication'];
  function HomeController($scope, Authentication) {
    var vm = this;
    
    $scope.authentication = Authentication;
  }
}());
