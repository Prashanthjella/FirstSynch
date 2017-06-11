'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CompanyList", ["ngRoute"]);



/////////////////////////////////// Controllors ////////////////////////////////////

//company page - top 3 details
FirstSynch.controller("top_three_companies" ,function ($scope, $http,$routeParams,apiUrl,$compile,$templateCache) {

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
    $http.get(apiUrl+"api/v1/setups/api/v1/company_filters/?"+query_string)
    .then(function successCallback(response){
       jQuery.each(response.data, function(i) {
        var search_result = '<a href="/company/'+response.data[i].id+'">'
        					+'<div class="grid-item col-sm-4">'
                            +'<div class="thumbnail custom-thumbnail-company-visit-gallery">'
                                +'<div class="media custom-media-company-gallery">'
                                    +'<div class="media-left media-middle custom-media-left">'
                                        +'<img class="media-object custom-media-object" src="'+response.data[i].logo+'" alt="forester-logo.jpg">'
                                    +'</div>'
                                    +'<div class="media-body">'
                                        +'<h4 class="media-heading">'+response.data[i].name+'</h4>'
                                        +'<h5 class="media-eading-h5">'+response.data[i].city+', '+response.data[i].state+'</h5>'
                                    +'</div>'
                                    +'<div> </div>'
                                +'</div>'
                                +'<p class="para-company">'+response.data[i].description+'</p>'
                                +'<div class="row custom-row-5">'
                                    +'<div class="col-sm-6">'
                                        +'<a class="thumbnail customn-thumbs-color-09 custom-thumbs-box-views">'
                                            +'<img src="assets/images/img1.png">'
                                            +'<div class="overlay "></div>'
                                            +'<span class="icon-btn-play"></span>'
                                        +'</a>'
                                    +'</div>'
                                +'</div>'
                            +'</div></a>';
        angular.element(jQuery('.company_search_result')).append($compile(search_result)($scope));
       });
    }, function errorCallback(response){
        console.log("Unable to perform get upcoming career fair");
    });
  };
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
