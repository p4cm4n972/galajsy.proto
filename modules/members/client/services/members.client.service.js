// Members service used to communicate Members REST endpoints
(function () {
  'use strict';

  angular
    .module('members.services')
    .factory('MembersService', MembersService);

  MembersService.$inject = ['$resource', '$log'];

  function MembersService($resource, $log) {
    var Member = $resource('http://localhost:3000/api/members/:memberId', {
      memberId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    return Member;
  }
}());
