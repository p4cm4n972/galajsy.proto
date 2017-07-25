'use strict';

angular
  .module('core')
  .controller('ContactController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.sendMail = function () {
        var data = {
          name: this.name,
          email: this.email,
          message: this.body
        };

        $http.post('/contact', data).then(
          console.log(data));
      };
    }
  ]);
