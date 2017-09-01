'use strict';

angular
  .module('core')
  .controller('ContactController', ['$scope', '$http', '$location', 
    function ($scope, $http, $location) {

      $scope.sendMail = function () {
        var data = {
          name: this.name,
          email: this.email,
          message: this.body
        };

        $http.post('/contact', data).then(
          $location.url('/'));
      };
    }
  ]);
