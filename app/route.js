'use strict';

FirstSynch.config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider,apiUrl) {

    //////////////////////////////////////////Guest role //////////////////////////////////
    //  home page
    $routeProvider.when('/', {
      templateUrl: 'GuestRole/home/home.html',
      resolve:{
        "check":function($location){   
            if(window.sessionStorage.getItem("usertype") == '48KL3'){
                $location.path('/company/dashboard'); 
            }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                $location.path('/student/dashboard'); 
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
    });
    // guest - careerfair details
    $routeProvider.when('/careerfair/:carredid', {
        templateUrl: 'GuestRole/career_fair_detail/career_fair.html',
        controller: 'careerfair_detail'
    });

    //  guest - company list
    $routeProvider.when('/companies', {
        templateUrl: 'GuestRole/company_list/company_list.html'
    });

    //  guest - student profile
    $routeProvider.when('/guest/student/profile', {
        templateUrl: 'GuestRole/student_profile/student_profile.html',
    });

    //  guest - company profile
    $routeProvider.when('/guest/company/profile', {
        templateUrl: 'GuestRole/company_profile/company_profile.html',
    });

    //  guest - employee profile
    $routeProvider.when('/guest/employee/profile', {
        templateUrl: 'GuestRole/employee_profile/employee_profile.html',
    });

    //  guest - search landing
    $routeProvider.when('/search', {
        templateUrl: 'GuestRole/search/search.html',
    });

    // student - dashboard page
    $routeProvider.when('/student/dashboard', {
        templateUrl: 'StudentRole/dashboard/dashboard.html'
    });

    // student - career fair
    $routeProvider.when('/student/careerfair', {
        templateUrl: 'StudentRole/career_fair/career_fair.html',
    });

    // student - career fair details
    $routeProvider.when('/student/careerfair/:carredid', {
        templateUrl: 'StudentRole/career_fair_detail/career_fair.html',
        controller: 'student_careerfair_detail'
    });

    // student - companies list
    $routeProvider.when('/student/companies', {
        templateUrl: 'StudentRole/company_list/company_list.html'
    });

    // student - companies profile
    $routeProvider.when('/student/company/profile', {
        templateUrl: 'StudentRole/company_profile/company_profile.html',
    });

    // student - employee profile
    $routeProvider.when('/student/employee/profile', {
        templateUrl: 'StudentRole/employee_profile/employee_profile.html',
    });

    // student - student profile
    $routeProvider.when('/student/student/profile', {
        templateUrl: 'StudentRole/student_profile/student_profile.html',
    });

    // company - dashboard
    $routeProvider.when('/company/dashboard', {
        templateUrl: 'CompanyRole/dashboard/dashboard.html'
    });

    // company - careerfair
    $routeProvider.when('/company/careerfair', {
        templateUrl: 'GuestRole/career_fair/career_fair.html',
    });

    // company - careerfair details
    $routeProvider.when('/company/careerfair/:carredid', {
        templateUrl: 'GuestRole/career_fair_detail/career_fair.html',
        controller: 'company_careerfair_detail'
    });

    // company - companies
    $routeProvider.when('/company/companies', {
        templateUrl: 'GuestRole/company_list/company_list.html'
    });

    // company - company profile
    $routeProvider.when('/company/company/profile', {
        templateUrl: 'CompanyRole/company_profile/company_profile.html',
    });

    // company - employee profile
    $routeProvider.when('/company/employee/profile', {
        templateUrl: 'CompanyRole/employee_profile/employee_profile.html',
    });

    // company - student profile
    $routeProvider.when('/company/student/profile', {
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