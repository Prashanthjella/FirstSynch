'use strict';

/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("hoMe", ["ngRoute","firstSync"]);




/////////////////////////////////// Controllors ////////////////////////////////////

// home page - featured video
FirstSynch.controller("guestfuturedvideo", function ($scope, $http, apiUrl,$compile) {
  // home page - featured video - default
  $http.get(apiUrl+"api/v1/flat_pages/feature_videos/?count=5&fields=id,company,thumbnail,company_logo,company,title")
      .then(function successCallback(response){
          $scope.feature = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get featurevideo");
  });
  // home page - featured video - showall and lessall
  $scope.showall_featuredvideo = function(){
    $http.get(apiUrl+"api/v1/flat_pages/feature_videos/?fields=id,company,thumbnail,company_logo,company,title")
      .then(function successCallback(response){
        if(jQuery('.less_all_purpose').is(":visible")){
          jQuery('.less_all_purpose').slideUp(500);
          jQuery('.home_featured_video_link').text('Less All');
          jQuery('.for_show_all_purpose').slideDown(500).empty();
          jQuery.each(response.data, function(i) {
            var featurevideo_showall =   '<div class="col-sm-4 custom-cols-thumbs-4">'
              +'<a href="#" data-id="'+response.data[i].id+'" ng-click="videoPopup('+response.data[i].id+')" class = "thumbnail custom-thumbnail-image-gallery customn-thumbs-color-01">'
                +'<img src="'+response.data[i].thumbnail+'" class="img-responsive custom-img-responsive">'
              +'<div class="overlay "></div>'
              +'<span class="arrow-triangle"></span>'
              +'<div class="box-inside-content">'
                  +'<span class="logo-companies"><img src="'+response.data[i].company_logo+'" class="img-responsive"></span>'
                  +'<h6 class="h6 custom-h6">'+response.data[i].company+'</h6>'
                +'<h1 class="h1 custom-gallery-h1">'+response.data[i].title+'</h1>'
              +'</div>'
              +'</a>'
            +'</div>';
              angular.element(jQuery('.for_show_all_purpose')).append($compile(featurevideo_showall)($scope));
          })
        }else{
            jQuery('.for_show_all_purpose').slideUp(500);
            jQuery('.less_all_purpose').slideDown(500);
            jQuery('.home_featured_video_link').text('Show All');
        }
      }, function errorCallback(response){
          console.log("Unable to perform get featurevideo showall");
    });
  }

});

// home page - mostrecented fairs
FirstSynch.controller("guestmostrecentedfairvideo" , function ($scope, $http, apiUrl) {

  $http.get(apiUrl+"api/v1/flat_pages/recent_career_fairs/?count=10")
      .then(function successCallback(response){
          $scope.recent_fairs = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get recent_fairs");
  });

});

// home page - students
FirstSynch.controller("guestdbstudents" , function ($scope, $http, apiUrl,$compile) {
  // home page - students - default
  $http.get(apiUrl+"api/v1/flat_pages/students_video_list/?count=3&fields=id,company,thumbnail,company_logo,company,title")
      .then(function successCallback(response){
          $scope.dbstudents = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get dbstudents");
  });
  // home page - students - showall and lessall
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
                                          +'<img src="'+response.data[i].thumbnail+'" class="img-responsive custom-img-responsive">'
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

// home page - company
FirstSynch.controller("guestdbcompany" , function ($scope, $http, apiUrl, $compile) {
 // home page - company - default
  $http.get(apiUrl+"api/v1/flat_pages/companies_video_list/?count=3&fields=id,company,thumbnail,company_logo,company,title")
      .then(function successCallback(response){
          $scope.dbcompany = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get dbcompany");
  });
  // home page - company - show all and less all
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

/////////////////////////////////// filters ////////////////////////////////////

FirstSynch.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

////////////////////////////////// Directives //////////////////////////////////////
