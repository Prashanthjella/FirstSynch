'use strict';

/////////////////////////////////// Module ////////////////////////////////////

var FirstSynch = angular.module("StudentEditProfile", ["ngRoute","firstSync"]);

/////////////////////////////////// Module ////////////////////////////////////

// Student edit profile - studenteditprofiles
FirstSynch.controller("studenteditprofiles" , function ($rootScope,$scope, $http, apiUrl,$timeout) {
    $http.get(apiUrl+"api/v1/user_profile/api/v1/student_profile/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.student_datas = response.data;
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });

    $scope.tellmeaboutyourvideo = function(){
        alert('Page under construction');
    };
    $scope.yourgoalsvideo = function(){
        alert('Page under construction');
    };
    $scope.yourhobbivideo = function(){
        alert('Page under construction');
    };
    $scope.wehireyouvideo = function(){
        alert('Page under construction');
    };
    $scope.yourstrengthvideo = function(){
        alert('Page under construction');
    };

    // student edit profile - hobbies
    $scope.hobbiesform = {
        user:"",
        name : ""
    };
    $scope.hobbies_edit = function(){

        $http.get(apiUrl+"api/v1/user_profile/api/v1/get_hobby_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.hobbiesform = response.data;
                $scope.hobbiesform.user = response.data[0].user;
                //alert(JSON.stringify(response.data));
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.hobbiessubmit = function(){
        var hobbies_data = {
            user : $scope.hobbiesform.user,
            name : $scope.hobbiesform.name,
            created_by : $scope.hobbiesform.user,
            updated_by : $scope.hobbiesform.user
        }
        // /alert(JSON.stringify(hobbies_data));
        $http.post(apiUrl+"api/v1/user_profile/api/v1/hobbyinfo/",JSON.stringify(hobbies_data))
        .then(function (response) {
            $scope.hobbiesmessage = 'Successfully updated';
            $scope.hobbiesform.splice(0, 0, response.data);
            $scope.hobbiesform.name = "";
        });
    };

    //student edit profile - personal skill set
    $scope.skillsetpersonnalform = {
        user:"",
        skilltype : "",
        name : "",
        rating : ""
    };
    $scope.skillpersonnaledit = function(){
        $http.get(apiUrl+"api/v1/user_profile/api/v1/get_skillset_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.skillsetpersonnalform = response.data;
                $scope.skillsetpersonnalform.user = response.data[0].user;
                $scope.skillsetpersonnalform.skilltype = response.data[0].skill_type;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.personnalskillsubmit = function(){
        var personnal_skill_data = {
            user : $scope.skillsetpersonnalform.user,
            skill_type : $scope.skillsetpersonnalform.skilltype,
            name : $scope.skillsetpersonnalform.name,
            rating : $scope.skillsetpersonnalform.rating,
            created_by : $scope.skillsetpersonnalform.user,
            updated_by : $scope.skillsetpersonnalform.user
        }
        // alert(JSON.stringify(personnal_skill_data));
        // $http.post(apiUrl+"api/v1/user_profile/api/v1/skillinfo/",JSON.stringify(personnal_skill_data))
        // .then(function (response) {
        //     $scope.personnalskillmessage = 'Successfully updated';
        //     $scope.skillsetpersonnalform.splice(0, 0, response.data);
        //     $scope.skillsetpersonnalform.name = "";
        //     $scope.skillsetpersonnalform.rating = "";
        // });
    };


    //student edit profile - professional skill set
    $scope.skillsetprofessionalform = {
        user:"",
        skilltype : "",
        name : "",
        rating : ""
    };
    $scope.skillprofessionaledit = function(){
        $http.get(apiUrl+"api/v1/user_profile/api/v1/get_skillset_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.skillsetprofessionalform = response.data;
                $scope.skillsetprofessionalform.user = response.data[0].user;
                $scope.skillsetprofessionalform.skilltype = response.data[0].skill_type;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.personnalskillsubmit = function(){
        var professional_skill_data = {
            user : $scope.skillsetprofessionalform.user,
            skill_type : $scope.skillsetprofessionalform.skilltype,
            name : $scope.skillsetprofessionalform.name,
            rating : $scope.skillsetprofessionalform.rating,
            created_by : $scope.skillsetprofessionalform.user,
            updated_by : $scope.skillsetprofessionalform.user
        }
        // alert(JSON.stringify(personnal_skill_data));
        // $http.post(apiUrl+"api/v1/user_profile/api/v1/skillinfo/",JSON.stringify(professional_skill_data))
        // .then(function (response) {
        //     $scope.professionalskillmessage = 'Successfully updated';
        //     $scope.skillsetprofessionalform.splice(0, 0, response.data);
        //     $scope.skillsetprofessionalform.name = "";
        //     $scope.skillsetprofessionalform.rating = "";
        // });
    };

    //student edit profile - software skill set
    $scope.skillsetsoftwareform = {
        user:"",
        skilltype : "",
        name : "",
        rating : ""
    };
    $scope.skillsoftwareedit = function(){
        $http.get(apiUrl+"api/v1/user_profile/api/v1/get_skillset_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.skillsetsoftwareform = response.data;
                $scope.skillsetsoftwareform.user = response.data[0].user;
                $scope.skillsetsoftwareform.skilltype = response.data[0].skill_type;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.softwareskillsubmit = function(){
        var software_skill_data = {
            user : $scope.skillsetsoftwareform.user,
            skill_type : $scope.skillsetsoftwareform.skilltype,
            name : $scope.skillsetsoftwareform.name,
            rating : $scope.skillsetsoftwareform.rating,
            created_by : $scope.skillsetsoftwareform.user,
            updated_by : $scope.skillsetsoftwareform.user
        }
        // alert(JSON.stringify(software_skill_data));
        // $http.post(apiUrl+"api/v1/user_profile/api/v1/skillinfo/",JSON.stringify(software_skill_data))
        // .then(function (response) {
        //     $scope.softwareskillmessage = 'Successfully updated';
        //     $scope.skillsetsoftwareform.splice(0, 0, response.data);
        //     $scope.skillsetsoftwareform.name = "";
        //     $scope.skillsetsoftwareform.rating = "";
        // });
    };

    //student edit profile - work histroy
    $scope.workhistroyform = {
        user:"",
        company : "",
        start_date : "",
        leave_date : "",
        job_title : "",
        job_description : ""
    };
    $scope.workhistroyeedit = function(){
        $http.get(apiUrl+"api/v1/user_profile/api/v1/get_experience_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.workhistroyform = response.data;
                $scope.workhistroyform.user = response.data[0].user;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.workhistroysubmit = function(){
        var workhistroy_data = {
            user : $scope.workhistroyform.user,
            company : $scope.workhistroyform.company,
            start_date : $scope.workhistroyform.start_date,
            leave_date : $scope.workhistroyform.leave_date,
            job_title : $scope.workhistroyform.job_title,
            job_description : $scope.workhistroyform.job_description,
            created_by : $scope.workhistroyform.user,
            updated_by : $scope.workhistroyform.user
        }
        //alert(JSON.stringify(workhistroy_data));
        // $http.post(apiUrl+"api/v1/user_profile/api/v1/skillinfo/",JSON.stringify(software_skill_data))
        // .then(function (response) {
        //     $scope.personnalskillmessage = 'Successfully updated';
        //     $scope.workhistroyform.splice(0, 0, response.data);

        // });
    };
    $scope.editworkinghistroy = function(workhistroy){
        $scope.workhistroyform.user = workhistroy.user;
        $scope.workhistroyform.company = workhistroy.company;
        $scope.workhistroyform.start_date = workhistroy.start_date;
        $scope.workhistroyform.leave_date= workhistroy.leave_date;
        $scope.workhistroyform.job_title= workhistroy.job_title
        $scope.workhistroyform.job_description = workhistroy.job_description
    };


    //student edit profile - projects
    $scope.projectsform = {
        user:"",
        title : "",
        start_date : "",
        completation_date : "",
        project_description : ""
    };
    $scope.projectsedit = function(){
        $http.get(apiUrl+"api/v1/user_profile/api/v1/get_project_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.projectsform = response.data;
                $scope.projectsform.user = response.data[0].user;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.projectsubmit = function(){
        var projects_data = {
            user : $scope.projectsform.user,
            title : $scope.projectsform.company,
            start_date : $scope.projectsform.start_date,
            completation_date : $scope.projectsform.completation_date,
            project_description : $scope.projectsform.project_description,
            created_by : $scope.projectsform.user,
            updated_by : $scope.projectsform.user
        }
        alert(JSON.stringify(projects_data));
        // $http.post(apiUrl+"api/v1/user_profile/api/v1/skillinfo/",JSON.stringify(software_skill_data))
        // .then(function (response) {
        //     $scope.personnalskillmessage = 'Successfully updated';
        //     $scope.workhistroyform.splice(0, 0, response.data);

        // });
    };
    $scope.editproject = function(projects){
        $scope.projectsform.user = projects.user;
        $scope.projectsform.title = projects.title;
        $scope.projectsform.start_date = projects.start_date;
        $scope.projectsform.completation_date= projects.completation_date
        $scope.projectsform.project_description = projects.project_description
    };

});





FirstSynch.controller("studentbasicprofileupload" , function ($rootScope, $scope, $http, apiUrl) {
    $scope.basicprofileform = {
        id:"",
        user:"",
        first_name : "",
        last_name : "",
        dob : "",
        gender : "",
        facebook_url : "",
        linkedin_url : "",
        twitter_url : "",
        website : ""
    };
    // student basic profile get information
    $http.get(apiUrl+"api/v1/user_profile/api/v1/get_basicprofile_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.basicprofileform.id = response.data[0].id;
            $scope.basicprofileform.user = response.data[0].user;
            $scope.basicprofileform.first_name = response.data[0].first_name;
            $scope.basicprofileform.last_name = response.data[0].last_name;
            $scope.basicprofileform.dob = response.data[0].dob;
            $scope.basicprofileform.gender = response.data[0].gender;
            $scope.basicprofileform.facebook_url = response.data[0].facebook_url;
            $scope.basicprofileform.linkedin_url = response.data[0].linkedin_url;
            $scope.basicprofileform.twitter_url = response.data[0].twitter_url;
            $scope.basicprofileform.website = response.data[0].website;
        }, function errorCallback(response){
            console.log("Unable to perform get student basic profile details");
    });

    $scope.basicprofilesubmit = function(){
        var data = {
            user:$scope.basicprofileform.user,
            first_name : $scope.basicprofileform.first_name,
            last_name: $scope.basicprofileform.last_name,
            dob: $scope.basicprofileform.dob,
            gender: $scope.basicprofileform.gender,
            facebook_url: $scope.basicprofileform.facebook_url,
            linkedin_url: $scope.basicprofileform.linkedin_url,
            twitter_url: $scope.basicprofileform.twitter_url,
            website: $scope.basicprofileform.website
        };
        //alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/user_profile/api/v1/userprofile/"+$scope.basicprofileform.user+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.basicprofilemessage = 'Successfully updated';
        });
    };
});
