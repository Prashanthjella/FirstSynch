'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CstudentProfile", ["ngRoute"]);


/////////////////////////////////// controllers ////////////////////////////////////

// student details
FirstSynch.controller("company_student_profile" ,function ($timeout,$window,$scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/student/api/v1/student_profile/"+$routeParams.studentid+"/")
      .then(function successCallback(response){
          $scope.student_profile_details = response.data;
          jwplayer("jwplayerforprofile").setup({
            "file": response.data.video,
            "primary": 'flash'
          });
      }, function errorCallback(response){
          console.log("Unable to perform get student profile details");
  });
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );
  });

});
