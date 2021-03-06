'use strict';

/////////////////////////////////// Module ////////////////////////////////////

var FirstSynch = angular.module("CompanyEditProfile", ["ngRoute","firstSync","ngFileUpload"]);

/////////////////////////////////// Module ////////////////////////////////////

// Student edit profile - studenteditprofiles
FirstSynch.controller("companyeditprofiles" , function ($window,Upload,$rootScope,$scope, $http, apiUrl,$timeout) {

  $scope.deleteVideo = function (value,index) {
      $http.delete(apiUrl+"api/v1/career_fairs/api/v1/video/"+value+"/",JSON.stringify({'id':value}))
      .then(function (response) {
          angular.element(event.target).parent().parent().parent().remove();
      });
      $('.student_uploaded_video'+index).fadeOut();
  };//Delete Video Popup - function end

  $scope.videoEditPopup = function (value) {
      var id = value;
      $http.get(apiUrl+"api/v1/flat_pages/rest/video_detail/"+id+"/", {
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

      $http.get(apiUrl+"api/v1/setups/api/v1/company_uploadedvideo_list/"+$rootScope.user_id+"/")
          .then(function successCallback(response){
              $scope.video_list = response.data;
          }, function errorCallback(response){
              console.log("Unable to perform get Company videos details");
      });

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

      $scope.uploadFile = function() {
        $('.custom_fade').show();
        $('#video_end').show();
          var fd = new FormData()
          for (var i in $scope.files) {
              fd.append("video_file", $scope.files[i])
          }
          fd.append("title", angular.element('#title')[0].value);
          fd.append("company", $rootScope.companyedit_id);
          fd.append("skill_text", angular.element('#skill_text')[0].value);
          fd.append("video_chapters", angular.element('#result')[0].value);
          fd.append("description", angular.element('#description')[0].value);
          fd.append("company_video", 'True');
          fd.append("active", 'True');
          fd.append("created_by", $rootScope.user_id);
          var pub_date = $("input[name='published']:checked").val();
          if (pub_date == null && pub_date == undefined){
            var pub_date = 'True';
          }
          fd.append("published", pub_date);
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
          $timeout( function(){
              /* This event is raised when the server send back a response */
              $('#page-video-edit').modal('hide');
              $('.after_video_process').hide();
              $('.before_video_process').show();
              $('.custom_fade').hide();
              $('#video_end').hide();
              $('#chapterss ul').empty();
              $("#chapter_maker_thumb").show();
              $("#question").show();
              $('.second_video_data').hide();
              $('.none').show();
              $('#btn-upload').hide();
              $("#inoutbar").removeAttr("style");
              $('#inoutbar').empty();
              $('#chapterss ul').empty();
              $('#page-video-edit form').trigger("reset");
              $scope.$apply(function(){
                $http.get(apiUrl+"api/v1/setups/api/v1/company_uploadedvideo_list/"+$rootScope.user_id+"/")
                    .then(function successCallback(response){
                        $scope.video_list = response.data;
                    }, function errorCallback(response){
                        console.log("Unable to perform get Company videos details");
                });
              });
         }, 60000 );
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
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.company_userid+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.establishmentform.id = response.data.id;
                $scope.establishmentform.establishment_date = response.data.establishment_date;
                $scope.establishmentform.est_date_description = response.data.est_date_description;
            }, function errorCallback(response){
                console.log("Unable to perform get company basic profile details");
        });
    };
    $scope.company_edit_doe_reset = function(){
        $scope.establishment_edit();
    }
    $scope.establishmentsubmit = function(){
        var data = {
            establishment_date:$scope.establishmentform.establishment_date,
            est_date_description : $scope.establishmentform.est_date_description
        };
        // api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/"
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.establishmentmessage = 'Successfully updated';
            $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
            $scope.establishment_edit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };

    // company profile   internshipform edit
    $scope.internshipform = {
        id:"",
        internships_to_jobs : "",
        internships_job_description : ""
    };
    $scope.internship_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.company_userid+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.internshipform.id = response.data.id;
                $scope.internshipform.internships_to_jobs = response.data.internships_to_jobs;
                $scope.internshipform.internships_job_description = response.data.internships_job_description;
            }, function errorCallback(response){
                console.log("Unable to perform get company basic profile details");
        });
    };
    $scope.company_edit_intern_reset = function(){
        $scope.internship_edit();
    }
    $scope.internshipsubmit = function(){
        var data = {
            internships_to_jobs:$scope.internshipform.internships_to_jobs,
            internships_job_description : $scope.internshipform.internships_job_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.internshipmessage = 'Successfully updated';
            $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };

    // company profile   salaryform edit
    $scope.salaryform = {
        id:"",
        average_entry_level_sal : "",
        average_entry_level_sal_description : ""
    };
    $scope.salary_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.company_userid+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.salaryform.id = response.data.id;
                $scope.salaryform.average_entry_level_sal = response.data.average_entry_level_sal;
                $scope.salaryform.average_entry_level_sal_description = response.data.average_entry_level_sal_description;
            }, function errorCallback(response){
                console.log("Unable to perform get company basic profile details");
        });
    };
    $scope.company_edit_salary_reset = function(){
        $scope.salary_edit();
    }

    $scope.salarysubmit = function(){
        var data = {
            average_entry_level_sal:$scope.salaryform.average_entry_level_sal,
            average_entry_level_sal_description : $scope.salaryform.average_entry_level_sal_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.salarymessage = 'Successfully updated';
            $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };


    // company profile - comapnaysizeform edit
    $scope.companysizeform = {
        id:"",
        company_size : "",
        company_size_description : ""
    };
    $scope.companysize_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.company_userid+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.companysizeform.id = response.data.id;
                $scope.companysizeform.company_size = response.data.company_size;
                $scope.companysizeform.company_size_description = response.data.company_size_description;
            }, function errorCallback(response){
                console.log("Unable to perform get company basic profile details");
        });
    };
    $scope.company_edit_size_reset = function(){
        $scope.companysize_edit();
    }
    $scope.companysizesubmit = function(){
        var data = {
            company_size:$scope.companysizeform.company_size,
            company_size_description : $scope.companysizeform.company_size_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.companysizemessage = 'Successfully updated';
            $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
            $scope.companysize_edit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
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
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.company_userid+"/",{
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
    $scope.company_edit_hire_reset = function(){
        $scope.hirerate_edit();
    }
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
            $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };

    // company profile salary edit
    $scope.fundingform = {
        id:"",
        funding_size : "",
        funding_size_description : ""
    };
    $scope.funding_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.company_userid+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.fundingform.id = response.data.id;
                $scope.fundingform.funding_size = response.data.funding_size;
                $scope.fundingform.funding_size_description = response.data.funding_size_description;
            }, function errorCallback(response){
                console.log("Unable to perform getfunding details");
        });
    };
    $scope.company_edit_funding_reset = function(){
        $scope.funding_edit();
    }
    $scope.fundingsubmit = function(){
        var data = {
            funding_size:$scope.fundingform.funding_size,
            funding_size_description : $scope.fundingform.funding_size_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.fundingmessage = 'Successfully updated';
            $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };

    // company profile growth edit
    $scope.growthrateform = {
        id:"",
        growth_rate : "",
        growth_rate_description : ""
    };
    $scope.growthrate_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.company_userid+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.growthrateform.id = response.data.id;
                $scope.growthrateform.growth_rate = response.data.growth_rate;
                $scope.growthrateform.growth_rate_description = response.data.growth_rate_description;
            }, function errorCallback(response){
                console.log("Unable to perform growthrate_edit details");
        });
    };
    $scope.company_edit_growth_reset = function(){
        $scope.growthrate_edit();
    }
    $scope.growthratesubmit = function(){
        var data = {
            growth_rate:$scope.growthrateform.growth_rate,
            growth_rate_description : $scope.growthrateform.growth_rate_description
        };

        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.growthratemessage = 'Successfully updated';
            $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };

    // company profile investor edit
    $scope.workforusform = {
        id:"",
        benefits : "",
        perks : "",
        culture : ""
    };
    $scope.workforus_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.companyedit_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.workforusform.id = response.data.hiring[0].id;
                $scope.workforusform.benefits = response.data.hiring[0].benefits;
                $scope.workforusform.perks = response.data.hiring[0].perks;
                $scope.workforusform.culture = response.data.hiring[0].culture;
            }, function errorCallback(response){
                console.log("Unable to perform growthrate_edit details");
        });
    };

    $scope.company_edit_workforus_reset = function(){
        $scope.workforus_edit();
    }

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
                $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
                $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
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
                $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
                $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            });
        }

    };

    $scope.investorform = {
        id:"",
        investor_confidence : "",
        investor_conf_description : ""
    };
    $scope.investor_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.company_userid+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.investorform.id = response.data.id;
                $scope.investorform.investor_confidence = response.data.investor_confidence;
                $scope.investorform.investor_conf_description = response.data.investor_conf_description;
            }, function errorCallback(response){
                console.log("Unable to perform growthrate_edit details");
        });
    };
    $scope.company_edit_invester_reset = function(){
        $scope.investor_edit();
    }
    $scope.investorsubmit = function(){
        var data = {
            investor_confidence:$scope.investorform.investor_confidence,
            investor_conf_description : $scope.investorform.investor_conf_description
        };

        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.investormessage = 'Successfully updated';
            $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };


    $scope.office_gallery_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/get_gallery_details/"+$rootScope.companyedit_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.office_image = response.data;
            }, function errorCallback(response){
                console.log("Unable to perform get office gallery details");
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
                  $scope.office_gallery_edit();
                  $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
                  $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
              });
            }
        }
    };
    // founder information
    $scope.founder_image_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/get_company_founders/"+$rootScope.companyedit_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
                $scope.founder_image = response.data;
            }, function errorCallback(response){
                console.log("Unable to perform get office gallery details");
        });
    };

    $scope.founder_image_submit = function(uploadimags){
        if (uploadimags && uploadimags.length) {
            for (var i = 0; i < uploadimags.length; i++) {
              Upload.upload({
                  url: apiUrl+"api/v1/setups/api/v1/founder/",
                  data: {company:$rootScope.company_userid,photo: uploadimags[i]},
                  method:'POST',
              }).then(function(response){
                  $scope.foundermessage = 'Successfully updated';
                  $scope.founder_image_edit();
                  $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
                  $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
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
                $scope.locationform.address_1 = response.data[0].address_1;
                $scope.locationform.address_2 = response.data[0].address_2;
                $scope.locationform.city = response.data[0].city;
                $scope.locationform.state = response.data[0].state;
                $scope.locationform.country = response.data[0].country;
                $scope.locationform.zip_code = response.data[0].zip_code;
                $scope.locationform.contact_no = response.data[0].contact_no;
                $scope.locationform.e_mail = response.data[0].e_mail;
                $scope.locationform.fax_no = response.data[0].fax_no;
            }, function errorCallback(response){
                console.log("Unable to perform get departure_rate details");
        });
    };
    $scope.company_edit_location_reset = function(){
        $scope.location_edit();
    }
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
                $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
                $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
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
                $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
                $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            });
        }

    };


    // employees section
    $scope.employees_edit = function(){
        $http.get(apiUrl+"api/v1/setups/company_employees/"+$rootScope.companyedit_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
            $scope.c_edit_employees = response.data;
            }, function errorCallback(response){
                console.log("Unable to perform get departure_rate details");
        });
    };

    // interview section
    $scope.interviewform = {
        interview_question:"",
        existing_id : 0
    };
    $scope.interview_edit = function(){
        $http.get(apiUrl+"api/v1/setups/company_interview_questions/"+$rootScope.companyedit_id+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
            $scope.c_edit_interview = response.data;
            }, function errorCallback(response){
                console.log("Unable to perform get departure_rate details");
        });
    };

    $scope.company_edit_interview_reset = function(){
        $scope.interview_edit();
        $scope.interviewform.interview_question = '';
        $scope.interviewform.existing_id = 0;
    }
    $scope.editinterview = function(interview){
        $scope.interviewform.existing_id = interview.id;
        $scope.interviewform.interview_question = interview.question;
    };
    $scope.removeinterview = function(interviewid){
        $http.delete(apiUrl+"api/v1/setups/api/v1/interview_question/"+interviewid+"/")
        .then(function (response) {
            $scope.interviewmessage = 'Successfully Deleted';
            $scope.interview_edit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };
    $scope.interviewsubmit = function(){
        var interview_data = {
            company : $rootScope.companyedit_id,
            question : $scope.interviewform.interview_question
        }
        // alert(JSON.stringify(workhistroy_data));
        if($scope.interviewform.existing_id){
            $http.patch(apiUrl+"api/v1/setups/api/v1/interview_question/"+$scope.interviewform.existing_id+"/",interview_data)
            .then(function (response) {
                $scope.interviewmessage = 'Successfully updated';
                $scope.interview_edit();
                $scope.interviewform.interview_question = '';
                $scope.interviewform.existing_id = 0;
                $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            });
        }
        else{
            $http.post(apiUrl+"api/v1/setups/api/v1/interview_question/",interview_data)
            .then(function (response) {
                $scope.interviewmessage = 'Successfully Added';
                $scope.interview_edit();
                $scope.interviewform.interview_question = '';
                $scope.interviewform.existing_id = 0;
                $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            });
        }
    };

});
FirstSynch.controller("companybasicprofileupload" , function ($location,Upload,$timeout,$window,$rootScope, $scope, $http, apiUrl) {
    $scope.company_edit_profile_basic_data = function(){
        $scope.basicinfoform = {
            id:"",
            name : "",
            description : "",
            category : "",
            product_category : "",
            website : "",
            facebook_url : "",
            linkedin_url : "",
            twitter_url : "",
        };
        // Company basic information
        if($location.search()['addvideo']){
          $('.accordion-toggle').removeClass('active');
          $('.company_edit_profile_sidebar_addvideo').parents('.company_edit_profile_side_parent').find('.company_edit_profile_side_child_collapsable').toggle();
          $('.company_edit_profile_sidebar_addvideo').addClass('active');
          $('.company_edit_profile_main_content_child').hide();
          $timeout( function(){
              $(document).find('#proudest-achievementc').removeClass('hide').show();
              $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.companyedit_id+"/",{
                headers: {'Authorization' : 'Token '+$rootScope.token_id}
              }).then(function successCallback(response){
                      $scope.workforusform.id = response.data.hiring[0].id;
                      $scope.workforusform.benefits = response.data.hiring[0].benefits;
                      $scope.workforusform.perks = response.data.hiring[0].perks;
                      $scope.workforusform.culture = response.data.hiring[0].culture;
                  }, function errorCallback(response){
                      console.log("Unable to perform growthrate_edit details");
              });
         }, 1000 );
        }else{
          $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.company_userid+"/",{
            headers: {'Authorization' : 'Token '+$rootScope.token_id}
          }).then(function successCallback(response){
                  $rootScope.comp_id = response.data.id;
                  $scope.basicinfoform.id = response.data.id;
                  $scope.basicinfoform.user = response.data.user.id;
                  $scope.basicinfoform.name = response.data.name;
                  $scope.basicinfoform.description = response.data.description;
                  $scope.basicinfoform.category = response.data.category;
                  $scope.basicinfoform.product_category = response.data.product_category;
                  $scope.basicinfoform.website = response.data.website;
                  $scope.basicinfoform.linkedin_url = response.data.linkedin_url;
                  $scope.basicinfoform.twitter_url = response.data.twitter_url;
                  $scope.basicinfoform.facebook_url = response.data.facebook_url;
                  $scope.basicinfoform.logos = response.data.logo;
              }, function errorCallback(response){
                  console.log("Unable to perform get company basic profile details");
          });
        }
        $scope.company_edit_basic_reset = function(){
            $scope.company_edit_profile_basic_data();
        }
        $scope.basicinfosubmit = function(file){
            var data = {
                name:$scope.basicinfoform.name,
                description: $scope.basicinfoform.description,
                category : $scope.basicinfoform.category,
                product_category : $scope.basicinfoform.product_category,
                website : $scope.basicinfoform.website,
                facebook_url : $scope.basicinfoform.facebook_url,
                linkedin_url : $scope.basicinfoform.linkedin_url,
                twitter_url : $scope.basicinfoform.twitter_url,
            };
            if(file){
                file.upload = Upload.upload({
                    url: apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",
                    data: {user:$scope.basicinfoform.user,logo: file},
                    method:'PUT',
                });
            }
            // alert(JSON.stringify(data));
            $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
            .then(function (response) {
                $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
                $window.scrollTo(0, angular.element(document.getElementById('edit_succ_msg')).offsetTop);
                $scope.basicinfomessage = 'Successfully updated';
            });
        };
        };
    $scope.$watch('$viewContentLoaded', function(){
        $timeout( function(){
            $window.loading_screen.finish();
       }, 3000 );
    });
});
