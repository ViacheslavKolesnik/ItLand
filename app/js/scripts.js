$(function () {

	//Overlay Scrollbars
	$("#chat-room").overlayScrollbars({ });
	if($(window).width() < 576){
		$(".section-content .description").overlayScrollbars({ });
		$(".thanks-form").overlayScrollbars({ });
	}
	//end Overlay Scrollbars
	//full page
	$('#fullpage').fullpage({
		anchors:['home', 'about', 'what-we-do', 'testimonials', 'partners', 'careers', 'blog', 'ask-for-free-quote'],
		normalScrollElements: '.room .message-container, .room .seen, .room .time-sent, .room .logo-big, .room .logo-small, .room .message, .section-content .description .os-content, .thanks-text, .thanks-text a',
		sectionSelector: 'section',
		navigation: true,
		navigationPosition: 'left',
		touchSensitivity: 10,
		onLeave: function(origin, destination, direction){
			if(destination.anchor == "home" || destination.anchor == "ask-for-free-quote"){
				$("#fp-nav").hide();
			}
		},
		afterLoad: function(origin, destination, direction){
			if(origin.anchor == "home" || origin.anchor == "ask-for-free-quote"){
				$("#fp-nav").show();
				$("#fp-nav").css('display', 'flex');
			}
		}
	});

		//custom navigation dots
		$('#fp-nav ul li a').each(function(id, element){
			var title = $($("#fullpage section")[id]).data("navigation-title");
			$(element).html(title);
		});
		//custom navigation dots end

	//full page end

	//slick sliders
	$(".testimonials-slider").slick({
		infinite: false,
		arrows: false,
		dots: true,
		touchThreshold: 20
	});
		//paging
		var refreshPaging = function(element, slick, currentSlide){
			var slidesOnPage = $(window).width() >= 992 ? 3 : $(window).width() >= 576 ? 2 : 1;
			var i = (currentSlide ? currentSlide : 0) + 1;
			var currentPage = $(window).width() >= 576 ? Math.floor(i / slidesOnPage) + 1 : i;
			var pages = slick.slideCount / slidesOnPage;
			var pagesCount = pages > Math.floor(pages)? Math.floor(pages) + 1 : pages;
			$(element).parent().find(".slider-paging").text(currentPage + ' / ' + pagesCount);
		}
		//end paging
	$(".blog-slider").on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
		refreshPaging(this, slick, currentSlide);
	});
	$(".blog-slider").slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 3,
		touchThreshold: 20,
		prevArrow: "<img class='slider-arrow-prev' src='img/slider-arrow-left.png'>",
		nextArrow: "<img class='slider-arrow-next' src='img/slider-arrow-right.png'>",
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	$(".projects-slider").on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
		$(this).parent().find(".slider-paging").text((currentSlide ? currentSlide : 0) + 1 + ' / ' + slick.slideCount);
	});
	$(".projects-slider").slick({
		infinite: false,
		touchThreshold: 20,
		prevArrow: "<img class='slider-arrow-prev' src='img/slider-arrow-left.png'>",
		nextArrow: "<img class='slider-arrow-next' src='img/slider-arrow-right.png'>"
	});

	if($(window).width()<768) {
		$('.partners-slider').slick({
			touchThreshold: 20
		});
	}

	if($(window).width()<576) {
		$('.ask-quote-wrapper').slick({
			infinite: false,
			touchThreshold: 20
		});
		$('.clients-slider').slick({
			infinite: false,
			touchThreshold: 20,
			slidesToShow: 2,
			slidesToScroll: 2
		});
		$('.we-do').slick({
			infinite: false,
			touchThreshold: 20,
			slidesToShow: 2,
			slidesToScroll: 2
		});
		$('.career-offers').slick({
			infinite: false,
			touchThreshold: 20
		});
	}
	//end slick sliders

	//nice select
	$('select').niceSelect();
	//end nice select

	//functions
	$(".messenger .fa-facebook-messenger").click(function(){
		if($(this).hasClass("click-disabled")){
			return;
		}
		$(this).closest(".messenger").find(".chat-offer").show();
		$(this).toggleClass("click-disabled");
	});
	$(".messenger .chat-offer .chat-now").click(function(){
		var messenger = $(this).closest(".messenger");
		messenger.find(".chat").show();
		messenger.find(".chat-offer").hide();
	});
	$(".messenger .ion-close-round").click(function(){
		$(this).parent().parent().hide();
		$(this).closest(".messenger").find(".fa-facebook-messenger").toggleClass("click-disabled");
	});

	$('.section-content.contact .submit').click(function(){
		$(this).closest('.ask-form').next().toggleClass('d-none');
		$(this).closest('.ask-form').toggleClass('d-none');
	});
	$('.section-content.contact .ion-android-close').click(function(){
		$(this).closest('.thanks-form').prev().toggleClass('d-none');
		$(this).closest('.thanks-form').toggleClass('d-none');
	});
	$('.section-content.contact.contact-us .country-item').mouseover(function(){
		$(this).parent().children().removeClass('active');
		$(this).addClass('active');
	});
	if($(window).width() < 768) {
		$('.section-content.blog-item').append($('.section-content.blog-item .text'));
	}
	//end functions
});