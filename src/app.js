(function (angular) {

  var moviecat = angular.module("moviecat", [
    "myService",
    "movie_list",
    "moviecat_details",
  ]);
  //配置锚链接前置符号
  moviecat.config(["$locationProvider", function ($locationProvider) {
    $locationProvider.hashPrefix("");
  }]);

  moviecat.controller("search", ["$scope", "$window", function ($scope, $window) {
    $scope.btnSearch = function () {
      //拿到文本值
      //jsonp中用$routeParams拿到后会拼接到url上
      $window.location.hash = "search?q=" + $scope.text;
    };
  }]);
})(angular);