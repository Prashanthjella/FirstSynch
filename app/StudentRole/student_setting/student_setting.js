/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("SStudentSetting", ["ngRoute"]);



/////////////////////////////////// Controllors ////////////////////////////////////

//student page - top 3 details
FirstSynch.controller("student_settings" ,function ($cookies,guest_token,$location,$timeout,$window,$scope,$rootScope, $http,$routeParams,apiUrl) {
  $http.get(apiUrl+"api/v1/accounts/v2/users/"+$rootScope.user_id+"/",{
    headers: {'Authorization' : 'Token '+$rootScope.token_id}
  }).then(function successCallback(response){
    $scope.student_setting = response.data;
  }, function errorCallback(response){
    console.log("Unable to fetch account information");
  });

  $scope.student_setting_email_update = function(email){
    $http.post(apiUrl+"api/v1/accounts/changemail/",{'e_mail':email},{
      headers: {'Authorization' : 'Token '+$rootScope.token_id }
    }).then(function successCallback(response){
      $scope.student_setting.e_mail = email;
      $scope.stu_email_success_msg = 'You have successfully updated email.';
      $scope.stu_email_failure_msg = '';
      $scope.stu_pass_failure_msg = "";
      $scope.stu_pass_success_msg = "";
      $('.edit_username_parent_act > .show_act').show();
      $('.edit_username_parent_act > .hide_act').hide();
      $('#student_edit_username, #student_setting_password').val('');
      $('.remove_class_act label, .remove_class_act input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
    }, function errorCallback(response){
      $scope.stu_email_failure_msg = 'Account already existed with this E-mail.';
      $scope.stu_email_success_msg = '';
      $scope.stu_pass_failure_msg = "";
      $scope.stu_pass_success_msg = "";
    });
  }
  $scope.student_setting_change_password = function(password){
    $http.post(apiUrl+"api/v1/accounts/changepass/",{'password':password},{
      headers: {'Authorization' : 'Token '+$rootScope.token_id}
    }).then(function successCallback(response){
      //$scope.student_setting.password = password;
      $scope.stu_pass_success_msg = 'You have successfully updated password.';
      $scope.stu_pass_failure_msg = "";
      $scope.stu_email_failure_msg = '';
      $scope.stu_email_success_msg = '';
      $('.edit_password_parent_act > .show_act').show();
      $('.edit_password_parent_act > .hide_password').hide();
      $('.remove_class_act label, .remove_class_act input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
      $('#student_edit_username, #student_setting_password').val('');
    }, function errorCallback(response){
      $scope.stu_pass_failure_msg = "Please enter different password.";
      $scope.stu_pass_success_msg = "";
      $scope.stu_email_failure_msg = '';
      $scope.stu_email_success_msg = '';
    });
  }
  $scope.student_setting_delete_account = function(){
    $http.post(apiUrl+"api/v1/accounts/removeme/",{},{
      headers: {'Authorization' : 'Token '+$rootScope.token_id}
    }).then(function successCallback(response){
      if(response.data.result='ok'){
          $window.sessionStorage.removeItem('token');
          $cookies.remove('token');
          $window.sessionStorage.removeItem('profileimage');
          $cookies.remove('profileimage');
          $window.sessionStorage.removeItem('usertype');
          $cookies.remove('usertype');
          $window.sessionStorage.removeItem('request_member_id');
          $cookies.remove('request_member_id');
          $window.sessionStorage.removeItem('company_userid');
          $cookies.remove('company_userid');
           $cookies.remove('user_id');
          $window.sessionStorage.removeItem('student_id');
          $cookies.remove('student_id');

          $rootScope.guest_login = true;
          $rootScope.dashboard = true;
          $rootScope.dashboardc = true;
          $rootScope.student_login = false;
          $rootScope.company_login = false;
          $scope.username = '';
          $scope.password = '';
          delete $rootScope.companyuserInfo
          delete $rootScope.studentuserInfo
          delete $rootScope.token_id
          delete $rootScope.request_member_id
          delete $rootScope.company_userid
          delete $rootScope.student_id
          $window.sessionStorage.setItem('token', guest_token);
          $cookies.put('token', guest_token);
          $rootScope.token_id = guest_token;
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
