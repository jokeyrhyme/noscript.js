/*jslint indent:2, browser:true*/
/*global angular*/ // Angular.JS

var app = angular.module('app', ['ng']);

app.controller('MainCtrl', function ($scope) {
  'use strict';

  $scope.message = 'JavaScript is disabled!';
});
