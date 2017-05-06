'use strict';

// Declare app level module which depends on views, and components
var FirstSynch = angular.module("firstSync", [
  "ngRoute",
  "hoMe",
  "careerFair",
  "careerFairDetail",
  "CompanyList",
  "StudentDashboard",
  "StudentcareerFair",
  "StudentcareerFairDetail",
  "StudentCompanyList",
  "CompanyDashboard",
  "CompanycareerFair",
  "CompanycareerFairDetail",
  "CompanyCompanyList"
]);

FirstSynch.constant('apiUrl', 'http://52.43.26.31:8000/');


///////////////////////////////////////////////// directive ////////////////////////////////////////
FirstSynch.directive('uixBxslider', function(){
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            $scope.$on('repeatFinished', function () {
                iElm.bxSlider($scope.$eval('{' + iAttrs.uixBxslider + '}'));
            });
        }
    }
}).directive('notifyWhenRepeatFinished', ['$timeout',
    function ($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, iElm, iAttrs) {
                if ($scope.$last === true) {
                    $timeout(function () {
                        $scope.$emit('repeatFinished');
                    });
                }
            }
        }
    }
]);
