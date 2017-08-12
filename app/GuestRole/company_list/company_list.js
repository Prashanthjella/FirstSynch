'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CompanyList", ["ngRoute"]);



/////////////////////////////////// Controllors ////////////////////////////////////
FirstSynch.controller("student_categorys" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/employee/employees_category/")
      .then(function successCallback(response){
          $scope.student_cate = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get student details as category wise");
  });

});
//company page - top 3 details
FirstSynch.controller("top_three_companies" ,function ($timeout,$window,$scope, $http,$routeParams,apiUrl,$compile,$templateCache) {

  $http.get(apiUrl+"api/v1/toplist/top3companies/")
      .then(function successCallback(response){
          $scope.top_three_company = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });

  $scope.company_filters = function(obj){
  	obj.currentTarget.parentElement.parentElement.childNodes[1].attributes.datacompanyval.value = obj.currentTarget.attributes.datavalue.value;
	var city_data = $('#all_com_city').attr('datacompanyval');
	var company_data = $('#all_com_company').attr('datacompanyval');
	var query_string = '';
	if(city_data != ''){
		query_string += 'city='+city_data;
	}
	if(company_data != ''){
		query_string += '&category='+company_data;
	}

    $('.allcompanies_act').hide();
    $('.companies_act_categ').hide();
    $('.top_three_company_act').hide();
    $('.company_search_result').empty();
    $('.video_filter_search_result_empty').addClass('hide');
    $http.get(apiUrl+"api/v1/setups/api/v1/company_filters/?"+query_string)
    .then(function successCallback(response){
        if(!response.data.length){
            $('.video_filter_search_result_empty').removeClass('hide');
            $('#company_count').text(response.data.length+" Companies");
        }
       jQuery.each(response.data, function(i) {
        var video_result ='';
        if(response.data[i].related_video.length > 0){
            if(response.data[i].related_video[0]){
                video_result += '<div class="col-sm-6">'
                                    +'<a href="" ng-click="videoPopup('+response.data[i].related_video[0].id+')" class="thumbnail customn-thumbs-color-{{10 | randomize}} custom-thumbs-box-views">'
                                        +'<img src="'+response.data[i].related_video[0].thumbnail+'">'
                                        +'<div class="overlay "></div>'
                                        +'<span class="icon-btn-play"></span>'
                                    +'</a>'
                                +'</div>';
            }
            if(response.data[i].related_video[1]){
                video_result += '<div class="col-sm-6">'
                                    +'<a href="" ng-click="videoPopup('+response.data[i].related_video[1].id+')" class="thumbnail customn-thumbs-color-{{10 | randomize}} custom-thumbs-box-views">'
                                        +'<img src="'+response.data[i].related_video[1].thumbnail+'">'
                                        +'<div class="overlay "></div>'
                                        +'<span class="icon-btn-play"></span>'
                                    +'</a>'
                                +'</div>';
            }
            if(response.data[i].related_video[2]){
                video_result += '<div class="col-sm-6">'
                                    +'<a href="" ng-click="videoPopup('+response.data[i].related_video[2].id+')" class="thumbnail customn-thumbs-color-{{10 | randomize}} custom-thumbs-box-views">'
                                        +'<img src="'+response.data[i].related_video[2].thumbnail+'">'
                                        +'<div class="overlay "></div>'
                                        +'<span class="icon-btn-play"></span>'
                                    +'</a>'
                                +'</div>';
            }

        }
        var city = ''
        if(response.data[i].city  == null || response.data[i].city == '' || typeof response.data[i].city == "undefined"){
            city = '';
        }
        else{
            city = response.data[i].city;
        }
        var state = ''
        if(response.data[i].state  == null || response.data[i].state == '' || typeof response.data[i].state == "undefined"){
            state = '';
        }
        else{
            state = ','+response.data[i].state;
        }
        var description = ''
        if(response.data[i].description  == null || response.data[i].description == '' || typeof response.data[i].description == "undefined"){
            description = '';
        }
        else{
            description = response.data[i].description;
        }
        var search_result = '<a href="/company/'+response.data[i].slug+'">'
        					+'<div class="col-sm-4 custom-box">'
                            +'<div class="thumbnail custom-thumbnail-company-visit-gallery">'
                                +'<div class="media custom-media-company-gallery">'
                                    +'<div class="media-left media-middle custom-media-left">'
                                        +'<img class="media-object custom-media-object" src="'+(response.data[i].logo != null?response.data[i].logo:"assets/images/profileicon.png")+'" alt="forester-logo.jpg">'
                                    +'</div>'
                                    +'<div class="media-body">'
                                        +'<h4 class="media-heading">'+response.data[i].name+'</h4>'
                                        +'<h5 class="media-eading-h5">'+city+''+state+'</h5>'
                                    +'</div>'
                                    +'<div> </div>'
                                +'</div>'
                                +'<p class="para-company">'+description+'</p>'
                                +'<div class="row custom-row-5">'
                                +video_result
                                +'</div>'
                            +'</div></a>';
        angular.element(jQuery('.company_search_result')).append($compile(search_result)($scope));
        $('#company_count').text(response.data.length+" Companies");
       });
    }, function errorCallback(response){
        console.log("Unable to perform get upcoming career fair");
    });
  };
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );
  });
});
//company page - company category
FirstSynch.controller("company_category" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/setups/company_categories/")
      .then(function successCallback(response){
          $scope.company_cate = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get company details as category wise");
  });

});

//company page - All companies
FirstSynch.controller("all_companies" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/setups/top3_companies/?count=all")
      .then(function successCallback(response){
          $scope.all_company = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });

});
FirstSynch.controller("all_cities_list" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/career_fairs/api/v1/career_fair_city/")
      .then(function successCallback(response){
          $scope.all_city_list = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });

});
/////////////////////////////////// filters ////////////////////////////////////

FirstSynch.filter('unique', function() {
   return function(collection, keyname) {
      var output = [],
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});


////////////////////////////////// Directives //////////////////////////////////////
