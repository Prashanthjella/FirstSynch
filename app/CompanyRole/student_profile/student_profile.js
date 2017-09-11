'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CstudentProfile", ["ngRoute"]);


/////////////////////////////////// controllers ////////////////////////////////////

// student details
FirstSynch.controller("company_student_profile" ,function ($rootScope,$timeout,$window,$scope, $http,$routeParams,apiUrl) {
  $scope.company_seeker_notfound = true;
  $http.get(apiUrl+"api/v1/student/"+$routeParams.studentid+"/",{
    headers: {'Authorization' : 'Token '+$rootScope.token_id}
  }).then(function successCallback(response){
          $scope.student_profile_details = response.data;
          $scope.company_seeker_notfound = true;
          jwplayer("jwplayerforprofile").setup({
            "file": response.data.video,
            "primary": 'flash'
          });
      }, function errorCallback(response){
          $scope.company_seeker_notfound = false;
          console.log("Unable to perform get student profile details");
  });
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );
  });

});
