(function () {
  'use strict';

  angular
    .module('users')
    .controller('FriendsController', FriendsController);

  FriendsController.$inject = ['$scope', '$filter', 'AdminService', '$http'];

  function FriendsController($scope, $filter, AdminService, $http) {
    var vm = this;
    $scope.title = "My Friends";
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;

   /* vm.friends = AdminService.query(function (data) {
      console.log(data);
      vm.buildPager();
    });*/

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
      vm.pageChanged = pageChanged;
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.friends, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
})();
