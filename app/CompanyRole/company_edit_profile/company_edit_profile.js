'use strict';

/////////////////////////////////// Module ////////////////////////////////////

var FirstSynch = angular.module("CompanyEditProfile", ["ngRoute","firstSync","ngFileUpload"]);

/////////////////////////////////// Module ////////////////////////////////////

// Student edit profile - studenteditprofiles
FirstSynch.controller("companyeditprofiles" , function (Upload,$rootScope,$scope, $http, apiUrl,$timeout) {

  $scope.deleteVideo = function (value,index) {
      $http.delete(apiUrl+"api/v1/career_fairs/api/v1/video/"+value+"/",JSON.stringify({'id':value}))
      .then(function (response) {
          angular.element(event.target).parent().parent().parent().remove();
      });
      $('.student_uploaded_video'+index).fadeOut();
  };//Delete Video Popup - function end

  $scope.videoEditPopup = function (value) {
      var id = value;
      $http.get(apiUrl+"api/v1/flat_pages/rest/video_detail/"+id, {
        headers: {'Authorization' : 'Token '+$rootScope.token_id}
      })
      .then(function successCallback(response){
          $scope.editvid = response.data;
          $('#hidden_source').val(response.data.video.mp4_video);
          $("#page-editvideo-edit").modal('show');
      }, function errorCallback(response){
          console.log("Unable to perform get Video Details");
      });
  };//Edit Video Popup - function end

  $scope.uploadvideolist = function(){
      $http.get(apiUrl+"api/v1/setups/api/v1/company_uploadedvideo_list/"+$rootScope.user_id+"/")
          .then(function successCallback(response){
              $scope.video_list = response.data;
          }, function errorCallback(response){
              console.log("Unable to perform get Company videos details");
      });
  };

  //Upload New Video Here
    $scope.getFileDetails = function (e) {
        $scope.files = [];
        $scope.$apply(function () {

            // STORE THE FILE OBJECT IN AN ARRAY.
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i])
            }
            $scope.progressVisible = false
        });
    };

    $scope.companyuploadFile = function() {
      $('#company_video_end').modal('show');
      $('#comapny-video-add').css({'z-index':'999'});
        var fd = new FormData()
        for (var i in $scope.files) {
            fd.append("video_file", $scope.files[i])
        }
        fd.append("title", angular.element('#company_title')[0].value);
        fd.append("company", $rootScope.user_id);
        fd.append("skill_text", angular.element('#company_skill_text')[0].value);
        fd.append("video_chapters", angular.element('#company_result')[0].value);
        fd.append("description", angular.element('#company_description')[0].value);
        fd.append("company_video", 'True');
        fd.append("active", 'True');
        fd.append("created_by", $rootScope.user_id);
        if(angular.element('#company_published_allow')[0].value == 'allow'){
          fd.append("published", 'True');
        }else{
          fd.append("published", 'False');
        }

        var xhr = new XMLHttpRequest()
        xhr.upload.addEventListener("progress", uploadProgress, false)
        xhr.addEventListener("load", uploadComplete, false)
        xhr.open("POST", apiUrl+"api/v1/career_fairs/api/v1/video/")
        $scope.progressVisible = true
        xhr.send(fd)
    }

    function uploadProgress(evt) {
        $scope.$apply(function(){
            if (evt.lengthComputable) {
                $scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                $scope.progress = 'unable to compute'
            }
        })
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        $('#company_video_end').modal('hide');
        $('#comapny-video-add').modal('hide');
        $('#comapny-video-add').css({'z-index':'1050'});
        $('#company_chapterss ul').empty();
        $("#company_chapter_maker_thumb").show();
        $("#company_question").show();
        $('.second_video_data').hide();
        $('.none').show();
        $('#company-btn-upload').hide();
        $("#company_inoutbar").removeAttr("style");
        $('#company_inoutbar').empty();
        $('#company_chapterss ul').empty();
        $scope.$apply(function(){
          $http.get(apiUrl+"api/v1/setups/api/v1/company_uploadedvideo_list/"+$rootScope.user_id+"/")
              .then(function successCallback(response){
                  $scope.video_list = response.data;
              }, function errorCallback(response){
                  console.log("Unable to perform get student videos details");
          });
        });
    }

    function uploadFailed(evt) {
        console("There was an error attempting to upload the file.")
    }

    function uploadCanceled(evt) {
        $scope.$apply(function(){
            $scope.progressVisible = false
        })
        console("The upload has been canceled by the user or the browser dropped the connection.")
    }
    //Upload Video End

    // company profile date of establishmentform edit
    $scope.establishmentform = {
        id:"",
        establishment_date : "",
        est_date_description : ""
    };
    $scope.establishment_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.establishmentform.id = response.data.id;
                $scope.establishmentform.establishment_date = response.data.establishment_date;
                $scope.establishmentform.est_date_description = response.data.est_date_description;
            }, function errorCallback(response){
                console.log("Unable to perform get company basic profile details");
        });
    };

    $scope.establishmentsubmit = function(){
        var data = {
            establishment_date:$scope.establishmentform.establishment_date,
            est_date_description : $scope.establishmentform.est_date_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.establishmentmessage = 'Successfully updated';
        });
    };

    // company profile   internshipform edit
    $scope.internshipform = {
        id:"",
        internships_to_jobs : "",
        internships_job_description : ""
    };
    $scope.internship_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.internshipform.id = response.data.id;
                $scope.internshipform.internships_to_jobs = response.data.internships_to_jobs;
                $scope.internshipform.internships_job_description = response.data.internships_job_description;
            }, function errorCallback(response){
                console.log("Unable to perform get company basic profile details");
        });
    };

    $scope.internshipsubmit = function(){
        var data = {
            internships_to_jobs:$scope.internshipform.internships_to_jobs,
            internships_job_description : $scope.internshipform.internships_job_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.internshipmessage = 'Successfully updated';
        });
    };

    // company profile   salaryform edit
    $scope.salaryform = {
        id:"",
        average_entry_level_sal : "",
        average_entry_level_sal_description : ""
    };
    $scope.salary_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.salaryform.id = response.data.id;
                $scope.salaryform.average_entry_level_sal = response.data.average_entry_level_sal;
                $scope.salaryform.average_entry_level_sal_description = response.data.average_entry_level_sal_description;
            }, function errorCallback(response){
                console.log("Unable to perform get company basic profile details");
        });
    };

    $scope.salarysubmit = function(){
        var data = {
            average_entry_level_sal:$scope.salaryform.average_entry_level_sal,
            average_entry_level_sal_description : $scope.salaryform.average_entry_level_sal_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.salarymessage = 'Successfully updated';
        });
    };


    // company profile - comapnaysizeform edit
    $scope.companysizeform = {
        id:"",
        company_size : "",
        company_size_description : ""
    };
    $scope.companysize_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.companysizeform.id = response.data.id;
                $scope.companysizeform.company_size = response.data.company_size;
                $scope.companysizeform.company_size_description = response.data.company_size_description;
            }, function errorCallback(response){
                console.log("Unable to perform get company basic profile details");
        });
    };

    $scope.companysizesubmit = function(){
        var data = {
            company_size:$scope.companysizeform.company_size,
            company_size_description : $scope.companysizeform.company_size_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.companysizemessage = 'Successfully updated';
        });
    };

    // company profile date of hirerateform edit
    $scope.hirerateform = {
        id:"",
        hire_rates : "",
        hire_rates_description : "",
        departure_rate : "",
        departure_rate_description : ""
    };
    $scope.hirerate_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.hirerateform.id = response.data.id;
                $scope.hirerateform.hire_rates = response.data.hire_rates;
                $scope.hirerateform.hire_rates_description = response.data.hire_rates_description;
                $scope.hirerateform.departure_rate = response.data.departure_rate;
                $scope.hirerateform.departure_rate_description = response.data.departure_rate_description;
            }, function errorCallback(response){
                console.log("Unable to perform get departure_rate details");
        });
    };

    $scope.hireratesubmit = function(){
        var data = {
            hire_rates:$scope.hirerateform.hire_rates,
            hire_rates_description:$scope.hirerateform.hire_rates_description,
            departure_rate:$scope.hirerateform.departure_rate,
            departure_rate_description : $scope.hirerateform.departure_rate_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.hireratemessage = 'Successfully updated';
        });
    };

    // company profile salary edit
    $scope.fundingform = {
        id:"",
        funding_size : "",
        funding_size_description : ""
    };
    $scope.funding_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.fundingform.id = response.data.id;
                $scope.fundingform.funding_size = response.data.funding_size;
                $scope.fundingform.funding_size_description = response.data.funding_size_description;
            }, function errorCallback(response){
                console.log("Unable to perform getfunding details");
        });
    };

    $scope.fundingsubmit = function(){
        var data = {
            funding_size:$scope.fundingform.funding_size,
            funding_size_description : $scope.fundingform.funding_size_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.fundingmessage = 'Successfully updated';
        });
    };

    // company profile growth edit
    $scope.growthrateform = {
        id:"",
        growth_rate : "",
        growth_rate_description : ""
    };
    $scope.growthrate_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.growthrateform.id = response.data.id;
                $scope.growthrateform.growth_rate = response.data.growth_rate;
                $scope.growthrateform.growth_rate_description = response.data.growth_rate_description;
            }, function errorCallback(response){
                console.log("Unable to perform growthrate_edit details");
        });
    };

    $scope.growthratesubmit = function(){
        var data = {
            growth_rate:$scope.growthrateform.growth_rate,
            growth_rate_description : $scope.growthrateform.growth_rate_description
        };

        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.growthratemessage = 'Successfully updated';
        });
    };

    // company profile investor edit
    $scope.workforusform = {
        id:"",
        benefits : "",
        perks : "",
        culture : ""
    };
    // $scope.workforus_edit = function(){
    //     $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/",{
    //       headers: {'Authorization' : 'Token '+$rootScope.token_id}
    //     }).then(function successCallback(response){
    //             $scope.workforusform.id = response.data.hiring[0].id;
    //             $scope.workforusform.benefits = response.data.hiring[0].benefits;
    //             $scope.workforusform.perks = response.data.hiring[0].perks;
    //             $scope.workforusform.culture = response.data.hiring[0].culture;
    //         }, function errorCallback(response){
    //             console.log("Unable to perform growthrate_edit details");
    //     });
    // };

    $scope.workforussubmit = function(){
        if(!$scope.workforusform.id){
            var data = {
                company : $rootScope.companyedit_id,
                benefits:$scope.workforusform.benefits,
                perks : $scope.workforusform.perks,
                culture : $scope.workforusform.culture
            };

            $http.post(apiUrl+"api/v1/setups/api/v1/hiring/",JSON.stringify(data))
            .then(function (response) {
                $scope.workforusmessage = 'Successfully updated';
            });
        }
        else{
            var data = {
                benefits:$scope.workforusform.benefits,
                perks : $scope.workforusform.perks,
                culture : $scope.workforusform.culture
            };

            $http.patch(apiUrl+"api/v1/setups/api/v1/hiring/"+$scope.workforusform.id+"/",JSON.stringify(data))
            .then(function (response) {
                $scope.workforusmessage = 'Successfully updated';
            });
        }

    };

    $scope.investorform = {
        id:"",
        investor_confidence : "",
        investor_conf_description : ""
    };
    $scope.investor_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.investorform.id = response.data.id;
                $scope.investorform.investor_confidence = response.data.investor_confidence;
                $scope.investorform.investor_conf_description = response.data.investor_conf_description;
            }, function errorCallback(response){
                console.log("Unable to perform growthrate_edit details");
        });
    };

    $scope.investorsubmit = function(){
        var data = {
            investor_confidence:$scope.investorform.investor_confidence,
            investor_conf_description : $scope.investorform.investor_conf_description
        };

        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.investormessage = 'Successfully updated';
        });
    };

    $scope.gallerysubmit = function(uploadimags){
        if (uploadimags && uploadimags.length) {
            for (var i = 0; i < uploadimags.length; i++) {
              Upload.upload({
                  url: apiUrl+"api/v1/setups/api/v1/gallery/",
                  data: {company:$rootScope.company_userid,photo: uploadimags[i]},
                  method:'POST',
              }).then(function(response){
                  $scope.gallerymessage = 'Successfully updated';
              });
            }
        }
    };
    // company profile date of location edit
    $scope.locationform = {
        id:"",
        address_1 : "",
        address_2 : "",
        city : "",
        state : "",
        country : "",
        zip_code : "",
        contact_no : "",
        e_mail : "",
        fax_no : ""
    };
    $scope.location_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/get_location_details/"+$rootScope.user_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.locationform.id = response.data.id;
                $scope.locationform.address_1 = response.data.address_1;
                $scope.locationform.address_2 = response.data.address_2;
                $scope.locationform.city = response.data.city;
                $scope.locationform.state = response.data.state;
                $scope.locationform.country = response.data.country;
                $scope.locationform.zip_code = response.data.zip_code;
                $scope.locationform.contact_no = response.data.contact_no;
                $scope.locationform.e_mail = response.data.e_mail;
                $scope.locationform.fax_no = response.data.fax_no;
            }, function errorCallback(response){
                console.log("Unable to perform get departure_rate details");
        });
    };

    $scope.locationsubmit = function(){
        // alert(JSON.stringify(data));
        if(!$scope.locationform.id){
            var data = {
                company : $rootScope.company_userid,
                address_1 : $scope.locationform.address_1,
                address_2 :$scope.locationform.address_2,
                city :$scope.locationform.city,
                state :$scope.locationform.state,
                country :$scope.locationform.country,
                zip_code :$scope.locationform.zip_code,
                contact_no :$scope.locationform.contact_no,
                e_mail :$scope.locationform.e_mail,
                fax_no :$scope.locationform.fax_no
            };
            $http.post(apiUrl+"api/v1/setups/api/v1/contact/",JSON.stringify(data))
            .then(function (response) {
                $scope.locationmessage = 'Successfully updated';
            });
        }
        else{
            var data = {
                address_1 : $scope.locationform.address_1,
                address_2 :$scope.locationform.address_2,
                city :$scope.locationform.city,
                state :$scope.locationform.state,
                country :$scope.locationform.country,
                zip_code :$scope.locationform.zip_code,
                contact_no :$scope.locationform.contact_no,
                e_mail :$scope.locationform.e_mail,
                fax_no :$scope.locationform.fax_no
            };
            $http.patch(apiUrl+"api/v1/setups/api/v1/contact/"+$scope.locationform.id+"/",JSON.stringify(data))
            .then(function (response) {
                $scope.locationmessage = 'Successfully updated';
            });
        }

    };

});
FirstSynch.controller("companybasicprofileupload" , function ($timeout,$window,$rootScope, $scope, $http, apiUrl) {
    $scope.basicinfoform = {
        id:"",
        name : "",
        category : "",
        product_category : "",
        website : "",
        facebook_url : "",
        linkedin_url : "",
        twitter_url : "",
    };
    // student basic profile get information
    $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.company_userid+"/",{
      headers: {'Authorization' : 'Token '+$rootScope.token_id}
    }).then(function successCallback(response){
            $rootScope.comp_id = response.data.id;
            $scope.basicinfoform.id = response.data.id;
            $scope.basicinfoform.name = response.data.name;
            $scope.basicinfoform.category = response.data.category;
            $scope.basicinfoform.product_category = response.data.product_category;
            $scope.basicinfoform.website = response.data.website;
            $scope.basicinfoform.linkedin_url = response.data.linkedin_url;
            $scope.basicinfoform.twitter_url = response.data.twitter_url;
            $scope.basicinfoform.facebook_url = response.data.facebook_url;
        }, function errorCallback(response){
            console.log("Unable to perform get company basic profile details");
    });

    $scope.basicinfosubmit = function(){
        var data = {
            name:$scope.basicinfoform.name,
            category : $scope.basicinfoform.category,
            product_category : $scope.basicinfoform.product_category,
            website : $scope.basicinfoform.website,
            facebook_url : $scope.basicinfoform.facebook_url,
            linkedin_url : $scope.basicinfoform.linkedin_url,
            twitter_url : $scope.basicinfoform.twitter_url,
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.basicinfomessage = 'Successfully updated';
        });
    };
    $scope.$watch('$viewContentLoaded', function(){
        $timeout( function(){
            $window.loading_screen.finish();
       }, 3000 );
    });
});
