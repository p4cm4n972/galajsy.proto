(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

   
  HomeController.$inject = ['$window', '$rootScope', '$scope', 'Authentication'];
  function HomeController($scope, Authentication) {
    var vm = this;
    
    $scope.authentication = Authentication;
  }
}());
