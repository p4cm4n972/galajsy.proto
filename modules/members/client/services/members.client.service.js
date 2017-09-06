// Members service used to communicate Members REST endpoints
(function () {
  'use strict';

  angular
    .module('members')
    .factory('MembersService', MembersService);

  MembersService.$inject = ['$resource', '$log'];

  function MembersService($resource, $log) {
    var Member = $resource('/api/members/:memberId', {
      memberId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    return Member;
  }
}());
