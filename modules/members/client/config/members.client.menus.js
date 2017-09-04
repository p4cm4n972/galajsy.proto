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
      state: 'members',
      type: 'item',
      class: 'list-alt',    
      roles: ['user']
    });
  }
}());
