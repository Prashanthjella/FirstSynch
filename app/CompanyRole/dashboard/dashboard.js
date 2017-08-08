'use strict';

/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CompanyDashboard", ["ngRoute"]);

/////////////////////////////////// Controllors ////////////////////////////////////

// home page - featured video
FirstSynch.controller("company_futuredvideo", function ($scope, $http, apiUrl, $compile) {
  // home page - featured video - default
  $http.get(apiUrl+"api/v1/flat_pages/feature_videos/?count=5")
      .then(function successCallback(response){
          $scope.feature = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get featurevideo");
  });
  // home page - featured video - showall and lessall
  $scope.showall_featuredvideo = function(){
    $http.get(apiUrl+"api/v1/flat_pages/feature_videos/")
      .then(function successCallback(response){
        if(jQuery('.less_all_purpose').is(":visible")){
          jQuery('.less_all_purpose').slideUp(500);
          jQuery('.home_featured_video_link').text('Less All');
          jQuery('.for_show_all_purpose').slideDown(500).empty();
          jQuery.each(response.data, function(i) {
            var featurevideo_showall =   '<div class="col-sm-4 custom-cols-thumbs-4">'
              +'<a href="#" data-id="'+response.data[i].id+'" ng-click="videoPopup('+response.data[i].id+')" class = "thumbnail custom-thumbnail-image-gallery customn-thumbs-color-{{10 | randomize}}">'
                +'<img src="'+response.data[i].thumbnail+'" class="img-responsive custom-img-responsive">'
              +'<div class="overlay "></div>'
              +'<span class="arrow-triangle"></span>'
              +'<div class="box-inside-content">'
                  +'<span class="logo-companies"><img src="'+response.data[i].company.logo+'" class="img-responsive"></span>'
                  +'<h6 class="h6 custom-h6">'+response.data[i].company.name+'</h6>'
                +'<h1 class="h1 custom-gallery-h1">'+response.data[i].title.substring(0, 10)+'...'+'</h1>'
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
FirstSynch.controller("company_mostrecentedfairvideo" , function ($timeout,$window,$scope, $http, apiUrl) {

  $http.get(apiUrl+"api/v1/flat_pages/recent_career_fairs/?when=next&now&count=10")
      .then(function successCallback(response){
          $scope.recent_fairs = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get recent_fairs");
  });
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );
  });

});

// home page - students
FirstSynch.controller("company_dbstudents" , function ($scope, $http, apiUrl, $compile) {
  // home page - students - default
  $http.get(apiUrl+"api/v1/flat_pages/students_video_list/?count=3")
      .then(function successCallback(response){
          $scope.dbstudents = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get dbstudents");
  });
  // home page - students - showall and lessall
  $scope.showall_studentsvideo = function(){
    $http.get(apiUrl+"api/v1/flat_pages/students_video_list/")
      .then(function successCallback(response){
        if(jQuery('.for_home_stu_less_all').is(":visible")){
          jQuery('.for_home_stu_less_all').slideUp(500);
          jQuery('.home_students_all_link').text('Less All');
          jQuery('.for_home_stu_show_all').slideDown(500).empty();
          jQuery.each(response.data, function(i) {
            var students_showall =   '<div class="col-sm-4">'
                                        +'<a data-id="'+response.data[i].id+'" ng-click="videoPopup('+response.data[i].id+')"  href="#" class = "thumbnail customn-thumbs-color-{{10 | randomize}} custom-thumbnail-image-gallery">'
                                          +'<img src="'+response.data[i].thumbnail+'" class="img-responsive custom-img-responsive">'
                                        +'<div class="overlay "></div>'
                                        +'<span class="arrow-triangle"></span>'
                                        +'<span class="link-new">New</span>'
                                          +'<div class="box-inside-content">'
                                              +'<h1 class="h1 custom-gallery-h1">'+response.data[i].title.substring(0, 10)+'...'+'</h1>'
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
FirstSynch.controller("company_dbcompany" , function ($scope, $http, apiUrl,$compile) {
 // home page - company - default
  $http.get(apiUrl+"api/v1/flat_pages/companies_video_list/?count=3")
      .then(function successCallback(response){
          $scope.dbcompany = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get dbcompany");
  });
  // home page - company - show all and less all
  $scope.showall_companyvideo = function(){
    $http.get(apiUrl+"api/v1/flat_pages/companies_video_list/")
      .then(function successCallback(response){
        if(jQuery('.for_home_com_less_all').is(":visible")){
          jQuery('.for_home_com_less_all').slideUp(500);
          jQuery('.home_company_all_link').text('Less All');
          jQuery('.for_home_com_show_all').slideDown(500).empty();
          jQuery.each(response.data, function(i) {
            var company_showall =   '<div class="col-sm-4">'
                                      +'<a href="#" data-id="'+response.data[i].id+'" ng-click="videoPopup('+response.data[i].id+')"  class = "thumbnail customn-thumbs-color-{{10 | randomize}} custom-thumbnail-image-gallery">'
                                        +'<img src="'+response.data[i].thumbnail+'" class="img-responsive custom-img-responsive">'
                                        +'<div class="overlay "></div>'
                                        +'<span class="arrow-triangle"></span>'
                                        +'<span class="link-new">New</span>'
                                        +'<div class="box-inside-content">'
                                            +'<span class="logo-companies">'
                                              +'<img src="'+response.data[i].company.logo+'" class="img-responsive">'
                                            +'</span>'
                                              +'<h6 class="h6 custom-h6">'+response.data[i].company.name+'</h6>'
                                              +'<h1 class="h1 custom-gallery-h1">'+response.data[i].title.substring(0, 10)+'...'+'</h1>'
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

FirstSynch.directive("owlCarousel", function() {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function(element) {
			  // provide any default options you want
				var defaultOptions = {
				};
				var customOptions = scope.$eval($(element).attr('data-options'));
				// combine the two options objects
				for(var key in customOptions) {
					defaultOptions[key] = customOptions[key];
				}
				// init carousel
				$(element).owlCarousel(defaultOptions);
			};
		}
	};
})
.directive('owlCarouselItem', [function() {
	return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element) {
		  // wait for the last item in the ng-repeat then call init
			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}]);
