(function () {
  'use strict';

  angular
    .module('members')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('members', {
        url: '/members',
        templateUrl: 'modules/members/client/views/list-members.client.view.html',
        controller: 'MembersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Members List'
        }
      })
      .state('members.edit', {
        url: '/:memberId/edit',
        templateUrl: 'modules/members/client/views/form-member.client.view.html',
        controller: 'MembersController',
        controllerAs: 'vm',
        resolve: {
          memberResolve: getMember
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Member {{ memberResolve.name }}'
        }
      })
      .state('members.friend', {
        url: '/:memberId',
        templateUrl: 'modules/members/client/views/view-member.client.view.html',
        controller: 'MembersController',
        controllerAs: 'vm',
        resolve: {
          memberResolve: getMember
        },
        data: {
          pageTitle: 'Member {{ memberResolve.name }}'
        }
      });
  }

  getMember.$inject = ['$stateParams', 'MembersService'];

  function getMember($stateParams, MembersService) {
    return MembersService.get({
      memberId: $stateParams.memberId
    }).$promise;
  }
}());
