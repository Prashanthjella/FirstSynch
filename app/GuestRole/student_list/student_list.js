'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CompanyList", ["ngRoute"]);



/////////////////////////////////// Controllors ////////////////////////////////////

//company page - top 3 details
FirstSynch.controller("top_three" ,function ($scope, $http,$routeParams,apiUrl,$compile,$templateCache) {
 
  $http.get(apiUrl+"api/v1/setups/top3_companies/?count=3&fields=name,logo,city,state,country")
      .then(function successCallback(response){
          $scope.top_three_company = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });

  $scope.allcitysearch = function(){
    $('.allcompanies_act').hide();
    $('.companies_act_categ').hide();
    $('.top_three_company_act').hide();
    for(var i=0;i<10;i++){
      var search_result = '<div class="grid-item col-sm-4">'
                            +'<div class="thumbnail custom-thumbnail-company-visit-gallery">'
                                +'<div class="media custom-media-company-gallery">'
                                    +'<div class="media-left media-middle custom-media-left">'
                                        +'<img class="media-object custom-media-object" src="assets/images/forester-logo.jpg" alt="forester-logo.jpg">'
                                    +'</div>'
                                    +'<div class="media-body">'
                                        +'<h4 class="media-heading">Foresters Financial Service</h4>'
                                        +'<h5 class="media-eading-h5">Denver, CO</h5>'
                                    +'</div>'
                                    +'<div> </div>'
                                +'</div>'
                                +'<div class="row custom-row-5">'
                                    +'<div class="col-sm-6">'
                                        +'<a class="thumbnail customn-thumbs-color-09 custom-thumbs-box-views">'
                                            +'<img src="assets/images/img1.png">'
                                            +'<div class="overlay "></div>'
                                            +'<span class="icon-btn-play"></span>'
                                        +'</a>'
                                    +'</div>'
                                    +'<div class="col-sm-6">'
                                        +'<a class="thumbnail customn-thumbs-color-09 custom-thumbs-box-views">'
                                            +'<img src="assets/images/img1.png">'
                                            +'<div class="overlay "></div>'
                                            +'<span class="icon-btn-play"></span>'
                                        +'</a>'
                                    +'</div>'
                                +'</div>'
                            +'</div>';
        angular.element(jQuery('.company_search_result')).append($compile(search_result)($scope));
    }
  }
});
//company page - company category
FirstSynch.controller("company_category" ,function ($scope, $http,$routeParams,apiUrl) {
 
  $http.get(apiUrl+"api/v1/setups/company_categories/?fields=id,industry_type,related_company,name,logo,city,state")
      .then(function successCallback(response){
          $scope.company_cate = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get company details as category wise");
  });

});

//company page - All companies
FirstSynch.controller("all_companies" ,function ($scope, $http,$routeParams,apiUrl) {
 
  $http.get(apiUrl+"api/v1/setups/top3_companies/?count=all&fields=name,logo,city,state,country")
      .then(function successCallback(response){
          $scope.all_company = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });

});
/////////////////////////////////// filters ////////////////////////////////////




////////////////////////////////// Directives //////////////////////////////////////
