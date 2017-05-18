'use strict';

FirstSynch.config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider,apiUrl) {
    ////////////////////////////////////////// Common /////////////////////////////////

    // Term and conditions - general
    $routeProvider.when('/termsandcondtion', {
        templateUrl: 'common/terms.html',
    });

    // Privacy policy - general
    $routeProvider.when('/privacy', {
        templateUrl: 'common/privacy.html',
    });

    //  search landing
    $routeProvider.when('/search', {
        templateUrl: 'GuestRole/search/search.html',
    });

    //  search landing
    $routeProvider.when('/login', {
        templateUrl: 'GuestRole/home/home.html',
    });

    //////////////////////////////////////////Guest role ///////////////////////////////
    //  home page
    $routeProvider.when('/', {
      templateUrl: 'GuestRole/home/home.html',
      resolve:{
        "check":function($location){
            if(window.sessionStorage.getItem("usertype") == '48KL3'){
                $location.path('/com/dashboard');
            }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                $location.path('/stu/dashboard');
            }
            else{
                $location.path('/');
            }
        }
      }
    });
    // guest - careerfair
    $routeProvider.when('/careerfair', {
        templateUrl: 'GuestRole/career_fair/career_fair.html',
        resolve:{
          "check":function($location){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/com/careerfair');
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/careerfair');
              }
              else{
                  $location.path('/careerfair');
              }
          }
        }
    });
    // guest - careerfair details
    $routeProvider.when('/careerfair/:carredid', {
        templateUrl: 'GuestRole/career_fair_detail/career_fair.html',
        controller: 'careerfair_detail',
        resolve:{
          "check":function($location,$route){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/com/careerfair/'+$route.current.params.carredid);
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/careerfair/'+$route.current.params.carredid);
              }
          }
        }
    });

    //  guest - company list
    $routeProvider.when('/companies', {
        templateUrl: 'GuestRole/company_list/company_list.html',
        resolve:{
          "check":function($location){
              if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/companies');
              }
          }
        }
    });

    //  guest - company profile
    $routeProvider.when('/company/:companyid', {
        templateUrl: 'GuestRole/company_profile/company_profile.html',
        controller: 'guest_company_profile',
        resolve:{
          "check":function($location,$route){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/com/company/'+$route.current.params.companyid);
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/company/'+$route.current.params.companyid);
              }
          }
        }
    });

    //  guest - student list
    $routeProvider.when('/students', {
        templateUrl: 'GuestRole/student_list/student_list.html',
        resolve:{
          "check":function($location){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/com/employee/profile');
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/employee/profile');
              }
              else{
                  $location.path('/students');
              }
          }
        }
    });

    //  guest - student profile
    $routeProvider.when('/student/:studentid', {
        templateUrl: 'GuestRole/student_profile/student_profile.html',
        controller: 'guest_student_profile',
        resolve:{
          "check":function($location,$route){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/com/student/'+$route.current.params.companyid);
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/student/'+$route.current.params.companyid);
              }
          }
        }
    });

    //  guest - employee profile
    $routeProvider.when('/guest/employee/profile', {
        templateUrl: 'GuestRole/employee_profile/employee_profile.html',
        resolve:{
          "check":function($location){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/com/employee/profile');
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/employee/profile');
              }
              else{
                  $location.path('/guest/employee/profile');
              }
          }
        }
    });



    // student - dashboard page
    $routeProvider.when('/stu/dashboard', {
        templateUrl: 'StudentRole/dashboard/dashboard.html',
        resolve:{
          "check":function($location){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/');
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/dashboard');
              }
              else{
                  $location.path('/login');
              }
          }
        }
    });

    // student - career fair
    $routeProvider.when('/stu/careerfair', {
        templateUrl: 'StudentRole/career_fair/career_fair.html',
    });

    // student - career fair details
    $routeProvider.when('/stu/careerfair/:carredid', {
        templateUrl: 'StudentRole/career_fair_detail/career_fair.html',
        controller: 'student_careerfair_detail'
    });

    // student - companies list
    $routeProvider.when('/stu/companies', {
        templateUrl: 'StudentRole/company_list/company_list.html'
    });

    // student - companies profile
    $routeProvider.when('/stu/company/:companyid', {
        templateUrl: 'StudentRole/company_profile/company_profile.html',
        controller: 'student_company_profile'
    });

    // student - employee profile
    $routeProvider.when('/stu/employee/profile', {
        templateUrl: 'StudentRole/employee_profile/employee_profile.html',
    });

    //  student - student list
    // $routeProvider.when('/stu/students', {
        // templateUrl: 'StudentRole/student_list/student_list.html'
    // });

    // student - student profile
    $routeProvider.when('/stu/student/:studentid', {
        templateUrl: 'StudentRole/student_profile/student_profile.html',
        controller: 'student_student_profile'
    });

    // company - dashboard
    $routeProvider.when('/com/dashboard', {
        templateUrl: 'CompanyRole/dashboard/dashboard.html'
    });

    // company - careerfair
    $routeProvider.when('/com/careerfair', {
        templateUrl: 'CompanyRole/career_fair/career_fair.html',
    });

    // company - careerfair details
    $routeProvider.when('/com/careerfair/:carredid', {
        templateUrl: 'CompanyRole/career_fair_detail/career_fair.html',
        controller: 'company_careerfair_detail'
    });

    // company - companies
    // $routeProvider.when('/com/companies', {
        // templateUrl: 'CompanyRole/company_list/company_list.html'
    // });

    // company - company profile
    $routeProvider.when('/com/company/:companyid', {
        templateUrl: 'CompanyRole/company_profile/company_profile.html',
        controller: 'company_company_profile'
    });

    // company - employee profile
    $routeProvider.when('/com/employee/profile', {
        templateUrl: 'CompanyRole/employee_profile/employee_profile.html',
    });

    //  student - student list
    $routeProvider.when('/com/students', {
        templateUrl: 'CompanyRole/student_list/student_list.html'
    });

    // company - student profile
    $routeProvider.when('/com/student/:studentid', {
        templateUrl: 'CompanyRole/student_profile/student_profile.html',
    });

    // remove hash bang
    if(window.history && window.history.pushState){
         //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">
         // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase
         // if you don't wish to set base URL then use this
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('');
    }
}]);
