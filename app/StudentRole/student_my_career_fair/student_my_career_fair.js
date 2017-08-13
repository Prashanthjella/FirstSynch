/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("StudentFollowCareerFair", ["ngRoute"]);

/////////////////////////////////// Controllors ////////////////////////////////////

//Student My Career Fair page
FirstSynch.controller("student_my_career_fair" ,function ($scope, $http, apiUrl, $rootScope) {

    $http.get(apiUrl+"api/v1/career_fairs/student_career_fair/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
    }).then(function successCallback(response){
            $scope.my_career_fair = response.data;
            $("#upcoming").css({"display": "block"});
    }, function errorCallback(response){
        console.log("Unable to perform get student career fair details");
    });

});
