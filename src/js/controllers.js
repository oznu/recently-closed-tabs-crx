'use strict';

var moduleName = 'app.controllers';

module.exports = moduleName;

angular.module(moduleName, [])

.controller('popupCtrl', ['$scope', 'recentlyClosed', 'getFavicon', 'restoreTab',
  function($scope, recentlyClosed, getFavicon, restoreTab) {

    $scope.getFavicon = getFavicon;
    $scope.restoreTab = restoreTab;

    recentlyClosed.get().then(function(data) {
      $scope.tabs = data;
    });

  }]);
