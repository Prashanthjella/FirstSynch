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
FirstSynch.controller("guestcompanyfilter" ,function ($timeout,$window,$scope,$rootScope,$http,$routeParams,apiUrl,$compile,$templateCache) {
    $rootScope.company_filters = function(obj){
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
        $('.video_filter_search_result_empty').addClass('hide');
        $scope.companyserchfilter(query_string);
        $('.grid').masonry({
          itemSelector: '.grid-item',
        });
    };
    $scope.companyserchfilter = function(query_string){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_filters/?"+query_string)
        .then(function successCallback(response){
            if(!response.data.length){
                $('.video_filter_search_result_empty').removeClass('hide');
                $('.company_search_result').addClass('hide');
                $('#company_count').text(response.data.length+" Companies");
            }
            else{
                $('.company_search_result').removeClass('hide');
                $('.video_filter_search_result_empty').addClass('hide');
                $scope.guestcompanyfilterresult = response.data;
                $('#company_count').text(response.data.length+" Companies");
            }

        }, function errorCallback(response){
            console.log("Unable to perform get upcoming career fair");
        });
    }

});
//company page - top 3 details
FirstSynch.controller("top_three_companies" ,function ($timeout,$window,$scope, $http,$routeParams,apiUrl,$compile,$templateCache) {

  $http.get(apiUrl+"api/v1/toplist/top3companies/")
      .then(function successCallback(response){
          $scope.top_three_company = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });
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
