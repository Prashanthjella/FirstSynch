/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CCompanySetting", ["ngRoute"]);



/////////////////////////////////// Controllors ////////////////////////////////////

//student page - top 3 details
FirstSynch.controller("company_settings" ,function ($location,$timeout,$window,$scope,$rootScope, $http,$routeParams,apiUrl) {
  $http.get(apiUrl+"api/v1/accounts/v2/users/"+$rootScope.user_id+"/",{
        headers: {'Authorization' : 'Token '+$rootScope.token_id}
  }).then(function successCallback(response){
          $scope.company_setting = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });
  $scope.company_setting_email_update = function(email){
      $http.post(apiUrl+"api/v1/accounts/changemail/",{'e_mail':email},{
            headers: {'Authorization' : 'Token '+$rootScope.token_id }
      }).then(function successCallback(response){
              $scope.company_setting.e_mail = email;
          }, function errorCallback(response){
              console.log("Unable to perform get top 3 company details");
      });
  }
  $scope.company_setting_change_password = function(password){
      $http.post(apiUrl+"api/v1/accounts/changepass/",{'password':password},{
            headers: {'Authorization' : 'Token '+$rootScope.token_id}
      }).then(function successCallback(response){
              $scope.company_setting.password = password;
          }, function errorCallback(response){
              console.log("Unable to perform get top 3 company details");
      });
  }
  $scope.company_setting_delete_account = function(){
      $http.post(apiUrl+"api/v1/accounts/removeme/",{},{
            headers: {'Authorization' : 'Token '+$rootScope.token_id}
      }).then(function successCallback(response){
              if(response.data.result='ok'){
                  $window.sessionStorage.removeItem('token');
                  $window.sessionStorage.removeItem('profileimage');
                  $window.sessionStorage.removeItem('usertype');
                  delete $rootScope.companyuserInfo
                  delete $rootScope.studentuserInfo
                  delete $rootScope.token_id
                  $location.path( "/" );
              }
          }, function errorCallback(response){
              console.log("Unable to perform get top 3 company details");
      });
  }
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );
  });

});
