var app;
app = angular.module('myApp', []);
app.controller('testController', ['$scope', 'testService', function($scope, testService) {
    $scope.myresult=testService.testme(6);
}]);