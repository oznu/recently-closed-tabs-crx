'use strict';

var angular = require('angular');

angular.module('app', [
  require('./js/controllers'),
  require('./js/factories'),
  require('./js/filters'),
]);

angular.bootstrap(document, ['app']);
