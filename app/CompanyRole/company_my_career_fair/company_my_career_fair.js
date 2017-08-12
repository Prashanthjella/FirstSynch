/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CCompanyRequest", ["ngRoute"]);

/////////////////////////////////// Controllors ////////////////////////////////////

//Company My Career Fair page
FirstSynch.controller("company_my_career_fair" ,function ($scope, $http, $routeParams, apiUrl, $rootScope) {

    $http.get(apiUrl+"api/v1/career_fairs/company_career_fair/"+$rootScope.companyedit_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
    }).then(function successCallback(response){
            $scope.my_career_fair = response.data;
    }, function errorCallback(response){
        console.log("Unable to perform get company career fair details");
    });

});
