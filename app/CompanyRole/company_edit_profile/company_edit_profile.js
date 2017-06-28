'use strict';

/////////////////////////////////// Module ////////////////////////////////////

var FirstSynch = angular.module("CompanyEditProfile", ["ngRoute","firstSync","ngFileUpload"]);

/////////////////////////////////// Module ////////////////////////////////////

// Student edit profile - studenteditprofiles
FirstSynch.controller("companyeditprofiles" , function (Upload,$rootScope,$scope, $http, apiUrl,$timeout) {

    // GET THE FILE INFORMATION.
    $scope.getFileDetails = function (e) {

        $scope.files = [];
        $scope.$apply(function () {

            // STORE THE FILE OBJECT IN AN ARRAY.
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i])
            }

        });
    };

    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {

        //FILL FormData WITH FILE DETAILS.
        var data = new FormData();
        for (var i in $scope.files) {
            data.append("video_file", $scope.files[i]);
        }
        //alert(angular.element('#result')[0].value);
        data.append("title", angular.element('#title')[0].value);
        data.append("company", $rootScope.user_id);
        data.append("skill_text", angular.element('#skill_text')[0].value);
        data.append("video_chapters", angular.element('#result')[0].value);
        data.append("company_video", 'True');
        data.append("active", 'True');
        data.append("published", 'True');
        // ADD LISTENERS.
        var objXhr = new XMLHttpRequest();
        objXhr.addEventListener("progress", updateProgress, false);
        objXhr.addEventListener("load", transferComplete, false);

        // SEND FILE DETAILS TO THE API.
        objXhr.open("POST", apiUrl+"api/v1/career_fairs/api/v1/video/");
        objXhr.send(data);
    }

    // UPDATE PROGRESS BAR.
    function updateProgress(e) {
        if (e.lengthComputable) {
            document.getElementById('pro').setAttribute('value', e.loaded);
            document.getElementById('pro').setAttribute('max', e.total);
        }
    }

    // CONFIRMATION.
    function transferComplete(e) {
        //alert("Files uploaded successfully.");
    }

    // company profile date of establishmentform edit
    $scope.establishmentform = {
        id:"",
        establishment_date : "",
        est_date_description : ""
    };
    $scope.establishment_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.establishmentform.id = response.data[0].id;
                $scope.establishmentform.establishment_date = response.data[0].establishment_date;
                $scope.establishmentform.est_date_description = response.data[0].est_date_description;
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
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.internshipform.id = response.data[0].id;
                $scope.internshipform.internships_to_jobs = response.data[0].internships_to_jobs;
                $scope.internshipform.internships_job_description = response.data[0].internships_job_description;
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
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.salaryform.id = response.data[0].id;
                $scope.salaryform.average_entry_level_sal = response.data[0].average_entry_level_sal;
                $scope.salaryform.average_entry_level_sal_description = response.data[0].average_entry_level_sal_description;
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
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.companysizeform.id = response.data[0].id;
                $scope.companysizeform.company_size = response.data[0].company_size;
                $scope.companysizeform.company_size_description = response.data[0].company_size_description;
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
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.hirerateform.id = response.data[0].id;
                $scope.hirerateform.hire_rates = response.data[0].hire_rates;
                $scope.hirerateform.hire_rates_description = response.data[0].hire_rates_description;
                $scope.hirerateform.departure_rate = response.data[0].departure_rate;
                $scope.hirerateform.departure_rate_description = response.data[0].departure_rate_description;
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
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.fundingform.id = response.data[0].id;
                $scope.fundingform.funding_size = response.data[0].funding_size;
                $scope.fundingform.funding_size_description = response.data[0].funding_size_description;
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
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.growthrateform.id = response.data[0].id;
                $scope.growthrateform.growth_rate = response.data[0].growth_rate;
                $scope.growthrateform.growth_rate_description = response.data[0].growth_rate_description;
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
    $scope.workforus_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.workforusform.id = response.data[0].hiring[0].id;
                $scope.workforusform.benefits = response.data[0].hiring[0].benefits;
                $scope.workforusform.perks = response.data[0].hiring[0].perks;
                $scope.workforusform.culture = response.data[0].hiring[0].culture;
            }, function errorCallback(response){
                console.log("Unable to perform growthrate_edit details");
        });
    };

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
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.investorform.id = response.data[0].id;
                $scope.investorform.investor_confidence = response.data[0].investor_confidence;
                $scope.investorform.investor_conf_description = response.data[0].investor_conf_description;
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
        $http.get(apiUrl+"api/v1/setups/api/v1/get_location_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.locationform.id = response.data[0].id;
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
    $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $rootScope.comp_id = response.data[0].id;
            $scope.basicinfoform.id = response.data[0].id;
            $scope.basicinfoform.name = response.data[0].name;
            $scope.basicinfoform.category = response.data[0].category;
            $scope.basicinfoform.product_category = response.data[0].product_category;
            $scope.basicinfoform.website = response.data[0].website;
            $scope.basicinfoform.linkedin_url = response.data[0].linkedin_url;
            $scope.basicinfoform.twitter_url = response.data[0].twitter_url;
            $scope.basicinfoform.facebook_url = response.data[0].facebook_url;
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
