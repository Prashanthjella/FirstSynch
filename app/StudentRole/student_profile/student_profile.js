'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("SstudentProfile", ["ngRoute"]);

/////////////////////////////////// controllers ////////////////////////////////////

// student details
FirstSynch.controller("student_student_profile" ,function ($scope, $http,$routeParams,apiUrl) {

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

});
