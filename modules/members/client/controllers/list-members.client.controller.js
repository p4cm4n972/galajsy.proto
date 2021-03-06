(function () {
  'use strict';

  angular
    .module('members')
    .controller('MembersListController', MembersListController);

  MembersListController.$inject = ['$scope', '$filter', 'MembersService', '$http'];

  function MembersListController($scope, $filter, MembersService, $http) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;

    vm.members = MembersService.query(function (data) {

      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
      vm.pageChanged = pageChanged;
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.members, {
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

}());
