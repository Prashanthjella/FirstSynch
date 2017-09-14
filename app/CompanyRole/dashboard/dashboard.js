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
FirstSynch.controller("dashboard_filter_process_company" ,function ($rootScope,$scope, $http,$routeParams,apiUrl,$timeout,$compile) {
    $http.get(apiUrl+"api/v1/student/api/v1/student_major_list/")
        .then(function successCallback(response){
            $scope.student_indus_list_c = response.data;
        }, function errorCallback(response){
            console.log("Unable to perform get student Major list");
    });
    $http.get(apiUrl+"api/v1/student/api/v1/student_univeristy_list/")
        .then(function successCallback(response){
            $scope.student_univ_list_c = response.data;
        }, function errorCallback(response){
            console.log("Unable to perform get student university list");
    });
    $scope.dashboard_filter_form_c = function(){
        $rootScope.dashboardc = false;
        var keywords = '';
        var industries = '';
        var salary = '';
        var employee_type ='';
        var skiills = '';
        var companyd = '';

        $('.filtered_kw_industryc').empty();
        $('.all_industry_typec .checkbox-input:checked').each(function(){
            keywords += ','+$(this).next().text();
        });
        if(keywords.substring(1)==''){
            $('.filtered_kw_industry_c').text('Not specified');
            industries = '';
        }
        else{
            $('.filtered_kw_industry_c').text(keywords.substring(1));
            industries = keywords.substring(1);
        }
        // document.querySelectorAll(".all_salary_rangec .salary_range").forEach(function(rd){
        //     rd.addEventListener("mousedown",function(){
    	// 	    if (this.checked) {
        //             this.onclick =  function(){
        //                                 this.checked=false;
        //                                 $('.filtered_kw_salary_c').text('Not specified');
        //                                 salary ='';
        //                                 jQuery('.video_filter_search_resultc').empty();
        //                             }
        //         }
        //         else{
        //             this.onclick=null
        //         }
    	//     })
        // });
        // if($('.all_salary_rangec .salary_range:checked').val() === undefined){
        //     $('.filtered_kw_salary_c').text('Not specified');
        //     salary ='';
        // }
        // else{
        //     $('.filtered_kw_salary_c').text($('.all_salary_rangec .salary_range:checked').attr('data-value'));
        //     salary = $('.all_salary_rangec .salary_range:checked').val();
        // }
        var salariesc = '';
        var salariestextc = '';
        $('.filtered_kw_salary_c').empty();
        $('.all_salary_rangec .salary_range:checked').each(function(){
            salariesc += ','+$(this).val();
            salariestextc += ','+$(this).next().text();
        });
        if(salariestextc.substring(1)==''){
            $('.filtered_kw_salary_c').text('Not specified');
            salary = '';
        }
        else{
            $('.filtered_kw_salary_c').text(salariestextc.substring(1));
            salary = salariesc.substring(1);
        }
        // if($('.all_employeement_typec .employement:checked').val() === undefined){
        //     $('.filtered_kw_employement_c').text('Not specified');
        //     employee_type = '';
        // }
        // else{
        //     $('.filtered_kw_employement_c').text($('.all_employeement_typec .employement:checked').val());
        //     employee_type = $('.all_employeement_typec .employement:checked').attr('data-val');
        // }
        var emptype = '';
        $('.filtered_kw_employement_c').empty();
        $('.all_employeement_typec .employement:checked').each(function(){
            emptype += ','+$(this).next().text();
        });
        if(emptype.substring(1)==''){
            $('.filtered_kw_employement_c').text('Not specified');
            employee_type = '';
        }
        else{
            $('.filtered_kw_employement_c').text(emptype.substring(1));
            employee_type = emptype.substring(1);
        }
        var prev_skill_data = $('.filtered_kw_skills_c').text();
        if($('.all_skills_filterc .skillname').val() == '' && prev_skill_data.replace(/\s/g, '')=="Notspecified"){
            $('.filtered_kw_skills_c').text(prev_skill_data);
            skiills = '';
        }
        else{
            if(prev_skill_data.replace(/\s/g, '')=="Notspecified"){
                var new_skill_data = $('.all_skills_filterc .skillname').val();
            }
            else if($('.all_skills_filterc .skillname').val()!='' ){
                var new_skill_data = prev_skill_data+','+$('.all_skills_filterc .skillname').val();
            }
            else{
                var new_skill_data = prev_skill_data;
            }
            if(new_skill_data.charAt(0)==','){
                $('.filtered_kw_skills_c').text(new_skill_data.substring(1));
            }
            else{
                $('.filtered_kw_skills_c').text(new_skill_data);
            }
            skiills = $('.filtered_kw_skills_c').text();
        }

        $('.all_skills_filterc .skillname').val('');
        var companies = '';
        $('.filtered_kw_company_c').empty();
        $('.all_company_filterc .checkbox-input:checked').each(function(){
            companies += ','+$(this).next().text();
        });
        if(companies.substring(1)==''){
            $('.filtered_kw_company_c').text('Not specified');
            companyd = '';
        }
        else{
            $('.filtered_kw_company_c').text(companies.substring(1));
            companyd = companies.substring(1);
        }
        if(industries == '' && salary == '' && employee_type == '' && skiills =='' && companyd ==''){
            $rootScope.dashboardc = true;
            return false;
        }
        var query_params = '?';
        if(industries != ''){
            query_params += 'major='+industries;
        }
        if(salary != ''){
            query_params += '&salary_range='+salary;
        }
        if(employee_type != ''){
            query_params += '&employement_type='+employee_type;
        }
        if(skiills != ''){
            query_params += '&skills='+skiills;
        }
        if(companyd != ''){
            query_params += '&school_name='+companyd;
        }
        $http.get(apiUrl+"api/v1/career_fairs/video_filter_company/"+query_params)
            .then(function successCallback(response){
                //$scope.video_filter_results = response.data;
                var filter_job_count = 0;
                jQuery('.video_filter_search_resultc').empty();
                jQuery('.video_filter_search_result_emptyc').hide();
                jQuery.each(response.data, function(i) {
                  var video_fileter_search_resul = '<div class="col-sm-4">'
                                                      +'<a data-id="'+response.data[i].id+'" ng-click="videoPopup('+response.data[i].id+')"  href="#" class = "thumbnail customn-thumbs-color-{{10 | randomize}} custom-thumbnail-image-gallery">'
                                                          +'<img src="'+response.data[i].thumbnail+'" class="img-responsive custom-img-responsive">'
                                                          +'<div class="overlay "></div>'
                                                          +'<span class="arrow-triangle"></span> <span class="link-new">New</span>'
                                                          +'<div class="box-inside-content">'
                                                              +'<h1 class="h1 custom-gallery-h1">'+response.data[i].title+'</h1>'
                                                          +'</div>'
                                                      +'</a>'
                                                  +'</div>';
                    angular.element(jQuery('.video_filter_search_resultc')).append($compile(video_fileter_search_resul)($scope));
                    filter_job_count++;
                });
                if(!filter_job_count){
                    jQuery('.video_filter_search_result_emptyc').show();
                }
                angular.element(jQuery('.filter_job_countc')).text('('+filter_job_count+' jobs)');
            }, function errorCallback(response){
                console.log("Unable to perform get top 3 company details");
        });
    };
    $scope.reset_filter_form_c = function(){
        $rootScope.dashboardc = true;
        angular.element(jQuery('.filtered_kw_industryc,.filtered_kw_salary_c,.filtered_kw_employement_c,.filtered_kw_skills_c,.filtered_kw_company_c')).text('Not specified');
        angular.element(jQuery('.filter_job_countc,.video_filter_search_resultc')).empty();
        angular.element(jQuery('.video_filter_search_result_emptyc')).show();
        $("#dashboard-filter input[type=radio],#dashboard-filter input[type=checkbox]").prop('checked', false);
    };
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
