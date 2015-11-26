'use strict';

var moduleName = 'app.factories';

module.exports = moduleName;

angular.module(moduleName, [])

.factory('recentlyClosed', ['$q', function($q) {
  var deferredData = $q.defer();

  chrome.sessions.getRecentlyClosed(function(data) {
    deferredData.resolve(data);
  });

  return {
    get: function() {
      return deferredData.promise;
    }
  };
}])

.factory('getFavicon', [function() {
  return function(url, id) {
    var a = new Image();
    a.src = 'chrome://favicon/' + url;
    a.onload = function() {
      angular.element(document.getElementById('entry_' + id)).append(a);
    };
  };
}])

.factory('restoreTab', [function() {
  return function(sessionId) {
    chrome.sessions.restore(sessionId + '');
  };
}]);
