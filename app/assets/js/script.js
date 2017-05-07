
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

	$(window).on("load",function(){

				//$("#video-scroll-navi").mCustomScrollbar({
					//setHeight:500,
					//theme:"minimal-dark"
				//});

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
