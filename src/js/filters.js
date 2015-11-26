'use strict';

var moduleName = 'app.filters';

module.exports = moduleName;

angular.module(moduleName, [])

.filter('locale', function() {
  return function(input) {
    return chrome.i18n.getMessage(input);
  };
});
