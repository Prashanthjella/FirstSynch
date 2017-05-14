$(document).ready(function() {

    $(window).scroll(function() {

        var scroll = $(window).scrollTop();

        if (scroll >= 100) {
            $(".sidebar-navi-default").addClass("sidebar-navi-fixed");
            $(".custom-navbar-default").addClass("navbar-fixed-top");
            $("body").addClass("fixed-scroll");
        } else {
            $(".sidebar-navi-default").removeClass("sidebar-navi-fixed");
            $(".custom-navbar-default").removeClass("navbar-fixed-top");
            $("body").removeClass("fixed-scroll");
        }
    });

    // $(window).on("load", function() {
    //     var getQueryString = function(field, url) {
    //         var href = url ? url : window.location.href;
    //         var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    //         var string = reg.exec(href);
    //         return string ? string[1] : null;
    //     };

    //     var token = getQueryString('resetpassword');
    //     if (token !== null && token !== undefined && token.length > 0) {
    //         jQuery("#resetpassword").modal('show');
    //         jQuery("#token").val(token);
    //     }

    //     //email activate function
    //     var email_activate = getQueryString('activate');
    //     if (email_activate !== null && email_activate !== undefined && email_activate.length > 0) {
    //         jQuery("#activate").modal('show');
    //         data = {
    //             'token': email_activate
    //         }
    //         url = "http://52.43.26.31:8000/api/v1/accounts/activate/"

    //         $.ajax({
    //             type: "POST",    
    //             url: url,
    //             data: data,
    //             success: function(output) {
    //                 $('#activate_message').html('Congratulations! You have successfully registered!. Please activate your account.')
    //             },
    //             error: function(data) {
    //                 $('#activate_message').html('Your Account is already active.')
    //             }
    //         });
    //     }

    // });

    $('.grid').masonry({
        itemSelector: '.grid-item',
        //columnWidth: 373,
    });


});