(function () {
  'use strict';

  angular
    .module('members')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Members',
      state: 'members.list',
      type: 'item',
      roles: ['user']
    });
  }
}());
