'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CompanycareerFairDetail", ["ngRoute"]);


/////////////////////////////////// Configuration ////////////////////////////////////

FirstSynch.config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider) {
  $routeProvider.when('/company/careerfair/:carredid', {
    templateUrl: 'GuestRole/career_fair_detail/career_fair.html',
    controller: 'company_careerfair_detail'
  });
  if(window.history && window.history.pushState){
     //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">
     // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase
     // if you don't wish to set base URL then use this
    $locationProvider.html5Mode({
       enabled: true,
       requireBase: false
    }).hashPrefix('!');
   }
}]);


/////////////////////////////////// Controllors ////////////////////////////////////

// career fair details
FirstSynch.controller("company_careerfair_detail" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/career_fairs/"+$routeParams.carredid+"/?fields=id,title,city,state,where,start_date,image,description,viewed,followed,member")
      .then(function successCallback(response){
          $scope.careerfair_details = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get career fair details");
  });

});

// students
FirstSynch.controller("company_cfdstudents" , function ($scope, $http, apiUrl, $compile) {
  // home page - students - default
  $http.get(apiUrl+"api/v1/flat_pages/students_video_list/?fields=id,company,thumbnail,company_logo,company,title")
      .then(function successCallback(response){
          $scope.cfdstudents = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get dbstudents");
  });
  //  students - showall and lessall
  $scope.showall_studentsvideo = function(){
    $http.get(apiUrl+"api/v1/flat_pages/students_video_list/?fields=id,company,thumbnail,company_logo,company,title")
      .then(function successCallback(response){
        if(jQuery('.for_home_stu_less_all').is(":visible")){
          jQuery('.for_home_stu_less_all').slideUp(500);
          jQuery('.home_students_all_link').text('Less All');
          jQuery('.for_home_stu_show_all').slideDown(500).empty();
          jQuery.each(response.data, function(i) {
            var students_showall =   '<div class="col-sm-4">'
                                        +'<a data-id="'+response.data[i].id+'" ng-click="videoPopup('+response.data[i].id+')"  href="#" class = "thumbnail customn-thumbs-color-02 custom-thumbnail-image-gallery">'
                                          +'<img src="'+response.data[i].company_logo+'" class="img-responsive custom-img-responsive">'
                                        +'<div class="overlay "></div>'
                                        +'<span class="arrow-triangle"></span>'
                                        +'<span class="link-new">New</span>'
                                          +'<div class="box-inside-content">'
                                              +'<h1 class="h1 custom-gallery-h1">'+response.data[i].title+'</h1>'
                                          +'</div>'
                                        +'</a> '
                                      +'</div>';
               angular.element(jQuery('.for_home_stu_show_all')).append($compile(students_showall)($scope));
          })
        }else{
            jQuery('.for_home_stu_show_all').slideUp(500);
            jQuery('.for_home_stu_less_all').slideDown(500);
            jQuery('.home_students_all_link').text('Show All');
        }
      }, function errorCallback(response){
          console.log("Unable to perform get featurevideo showall");
    });
  }

});

// company
FirstSynch.controller("company_cfdcompany" , function ($scope, $http, apiUrl, $compile) {
 // company - default
  $http.get(apiUrl+"api/v1/flat_pages/companies_video_list/?fields=id,company,thumbnail,company_logo,company,title")
      .then(function successCallback(response){
          $scope.cfdcompany = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get dbcompany");
  });
  // company - show all and less all
  $scope.showall_companyvideo = function(){
    $http.get(apiUrl+"api/v1/flat_pages/companies_video_list/?fields=id,company,thumbnail,company_logo,company,title")
      .then(function successCallback(response){
        if(jQuery('.for_home_com_less_all').is(":visible")){
          jQuery('.for_home_com_less_all').slideUp(500);
          jQuery('.home_company_all_link').text('Less All');
          jQuery('.for_home_com_show_all').slideDown(500).empty();
          jQuery.each(response.data, function(i) {
            var company_showall =   '<div class="col-sm-4">'
                                      +'<a href="#" data-id="'+response.data[i].id+'" ng-click="videoPopup('+response.data[i].id+')"  class = "thumbnail  customn-thumbs-color-02 custom-thumbnail-image-gallery">'
                                        +'<img src="'+response.data[i].thumbnail+'" class="img-responsive custom-img-responsive">'
                                        +'<div class="overlay "></div>'
                                        +'<span class="arrow-triangle"></span>'
                                        +'<span class="link-new">New</span>'
                                        +'<div class="box-inside-content">'
                                            +'<span class="logo-companies">'
                                              +'<img src="'+response.data[i].company_logo+'" class="img-responsive">'
                                            +'</span>'
                                              +'<h6 class="h6 custom-h6">'+response.data[i].company+'</h6>'
                                              +'<h1 class="h1 custom-gallery-h1">'+response.data[i].title+'</h1>'
                                        +'</div>'
                                      +'</a>'
                                    +'</div>';
            angular.element(jQuery('.for_home_com_show_all')).append($compile(company_showall)($scope));
          })
        }else{
            jQuery('.for_home_com_show_all').slideUp(500);
            jQuery('.for_home_com_less_all').slideDown(500);
            jQuery('.home_company_all_link').text('Show All');
        }
      }, function errorCallback(response){
          console.log("Unable to perform get featurevideo showall");
    });
  }
});

// near by career fair
FirstSynch.controller("company_near_by_career_fair" ,function ($scope, $http,$routeParams,apiUrl,$compile) {

  $http.get(apiUrl+"api/v1/flat_pages/recent_career_fairs/?count=3&fields=id,image,start_date,city,state,title")
      .then(function successCallback(response){
          $scope.near_by_career = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get upcoming near by career");
  });

  // near by career - show all and less all
  $scope.showall_near_by_career = function(){
    $http.get(apiUrl+"api/v1/flat_pages/recent_career_fairs/?fields=id,image,start_date,city,state,title")
      .then(function successCallback(response){
        if(jQuery('.for_cfd_nc_less_all').is(":visible")){
          jQuery('.for_cfd_nc_less_all').slideUp(500);
          jQuery('.cfd_nc_all_link').text('Less All');
          jQuery('.for_cfd_nc_show_all').slideDown(500).empty();
          jQuery.each(response.data, function(i) {
            var company_showall =   '<div class="col-sm-4">'
                                      +'<a href="/careerfair/'+response.data[i].id+'" style="color:#fff;">'
                                      +'<div class="thumbnail customn-thumbs-color-10 custom-thumbnail-image-gallery"> <img src="'+response.data[i].image+'">'
                                        +'<div class="overlay"></div>'
                                        +'<div class="box-inside-content">'
                                         +' <p class="date-location">'+response.data[i].start_date+'<span> •</span> '+response.data[i].city+', '+response.data[i].state+'</p>'
                                          +'<h1 class="custom-gallery-h1">'+response.data[i].title+'</h1>'
                                        +'</div>'
                                      +'</div>'
                                      +'</a>'
                                    +'</div>';
            angular.element(jQuery('.for_cfd_nc_show_all')).append($compile(company_showall)($scope));
          })
        }else{
            jQuery('.for_cfd_nc_show_all').slideUp(500);
            jQuery('.for_cfd_nc_less_all').slideDown(500);
            jQuery('.cfd_nc_all_link').text('Show All');
        }
      }, function errorCallback(response){
          console.log("Unable to perform get featurevideo showall");
    });
  }
});
/////////////////////////////////// filters ////////////////////////////////////




////////////////////////////////// Directives //////////////////////////////////////
