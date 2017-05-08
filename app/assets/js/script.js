
$(document).ready(function(){
$("#VideoPopup1").on("hidden.bs.modal", function () {
    // put your default event here
    alert("sdfs");
});

		$(window).scroll(function() {



    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
        $(".sidebar-navi-default").addClass("sidebar-navi-fixed");
		$(".custom-navbar-default").addClass("navbar-fixed-top");
		$("body").addClass("fixed-scroll");
    }
	else{
		$(".sidebar-navi-default").removeClass("sidebar-navi-fixed");
		$(".custom-navbar-default").removeClass("navbar-fixed-top");
		$("body").removeClass("fixed-scroll");
		}
});

$( window ).on( "load", function() {
    var getQueryString = function ( field, url ) {
        var href = url ? url : window.location.href;
        var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
        var string = reg.exec(href);
        return string ? string[1] : null;
    };

    var token = getQueryString('resetpassword');
    if (token !== null && token !== undefined && token.length > 0 ) {
            jQuery("#resetpassword").modal('show');
            jQuery("#token").val(token);
    }

      //email activate function
      var email_activate = getQueryString('activate');
      if (email_activate !== null && email_activate !== undefined && email_activate.length > 0 ) {
          jQuery("#activate").modal('show');
          data = {'token': email_activate}
          url = "http://52.43.26.31:8000/api/v1/accounts/activate/"

          $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function(output){
              $('#activate_message').html('Congratulations! You have successfully registered!. Please activate your account.')
            },
            error: function(data){
              $('#activate_message').html('Your Account is already active.')
            }
          });
      }

   });




// $('#slider-carousel').owlCarousel({
//     loop:true,
//     margin:40,
//     nav:true,
// 	slideBy:2,
// 	navText:['',''],
// 	navClass:['fair-prev','fair-next'],
// 	dots:true,
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:2
//         },
//         1000:{
//             items:2
//         }
//     }
// });

// $('#upcoming-slider').owlCarousel({
//     loop:true,
//     margin:40,
//     nav:false,
// slideBy:2,
// 	navText:['',''],
// 	navClass:['fair-prev','fair-next'],
// 	dots:false,
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:2
//         },
//         1000:{
//             items:2
//         }
//     }
// });


// $('#careere-fairs').owlCarousel({
//     loop:true,
//     margin:40,
//     nav:true,
// 	slideBy:1,
// 	navText:['',''],
// 	navClass:['fair-prev','fair-next'],
// 	dots:true,
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:1
//         },
//         1000:{
//             items:1
//         }
//     }
// });


});
