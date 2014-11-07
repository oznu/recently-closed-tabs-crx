var app = angular.module("app", [])

app.factory("recentlyClosed", function($q)
{
  var deferredData = $q.defer();
  chrome.sessions.getRecentlyClosed(function(data){
    deferredData.resolve(data)
  });
  return {
    get: function() {
      return deferredData.promise;
    }
  }
});

app.filter("locale", function() {
  return function(input) {
    return chrome.i18n.getMessage(input);
  }
});

app.controller("listCtrl", function($scope, $timeout, recentlyClosed) {
  recentlyClosed.get().then(function(data) {
    $scope.tabs = data;
  });
  $scope.getFavicon = function(url, id) {
    var a = new Image();
    a.src = "chrome://favicon/" + url;
    a.onload = function() {
      angular.element(document.getElementById(String("entry_" + id))).append(a);
    }
  }
  $scope.restoreTab = function(sessionId) {
    chrome.sessions.restore(String(sessionId));
  }
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-55756605-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = 'https://ssl.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
