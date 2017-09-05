(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'about',
      state: 'about',
      type: 'item',
      class: 'asterisk',
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'contact',
      state: 'contact',
      type: 'item',
      class: 'send',
      roles: ['*']
    });
    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });
    menuService.addSubMenuItem('account', 'settings', {
      title: '💛',
      state: 'friends'
    });
    menuService.addSubMenuItem('account', 'settings', {
      title: '👤',
      state: 'settings.profile'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: '🖼️',
      state: 'settings.picture'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: '🔑',
      state: 'settings.password'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: '⚙️',
      state: 'settings.accounts'
    });
  }
}());
