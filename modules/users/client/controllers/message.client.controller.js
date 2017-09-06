(function() {
  'use strict';

  angular
    .module('users')
    .controller('MessageController', MessageController);

  MessageController.$inject = ['$scope'];

  function MessageController($scope) {
    var vm = this;
    $scope.title = 'My Mail Box';
    // Message controller logic
    // ...

    init();

    function init() {
    }
  }
})();
