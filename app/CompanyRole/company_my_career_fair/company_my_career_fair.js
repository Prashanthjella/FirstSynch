/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CCompanyRequest", ["ngRoute"]);

/////////////////////////////////// Controllors ////////////////////////////////////

//Company My Career Fair page
FirstSynch.controller("company_my_career_fair" ,function ($scope, $http, apiUrl, $rootScope) {
    if ($rootScope.request_member_id){
      $scope.companypk = $rootScope.request_member_id;
    }
    if($rootScope.company_userid){
      $scope.companypk = $rootScope.company_userid;
    }

    $http.get(apiUrl+"api/v1/career_fairs/company_career_fair/"+$scope.companypk+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
    }).then(function successCallback(response){
            $scope.my_career_fair = response.data;
            $("#upcoming").css({"display": "block"});
    }, function errorCallback(response){
        console.log("Unable to perform get company career fair details");
    });

});
