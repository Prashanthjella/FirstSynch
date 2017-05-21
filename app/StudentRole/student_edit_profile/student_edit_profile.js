'use strict';

/////////////////////////////////// Module ////////////////////////////////////

var FirstSynch = angular.module("StudentEditProfile", ["ngRoute","firstSync"]);

/////////////////////////////////// Module ////////////////////////////////////

// home page - mostrecented fairs
FirstSynch.controller("studenteditprofiles" , function ($rootScope,$scope, $http, apiUrl) {
    $http.get(apiUrl+"api/v1/user_profile/api/v1/student_profile/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.student_datas = response.data;
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });
});
