const gVal = {
	vw : function() {
		return window.innerWidth;
	},
	top : function() {
		return window.pageYOffset || document.documentElement.scrollTop;
	},
	chkLinkGo: function(event) {
		var chk = 1,
			ele = event.target;
		if(ele.tagName != 'A') {
			ele = ele.parentNode;
		}
		// 0 = stop; 1 = continue;
		var	link = ele.getAttribute('href');
		if(ele.getAttribute('target') == "_blank" || link == '' || link.indexOf('#') == 0 || link.indexOf('javascript') == 0 || link.indexOf('tel') == 0 || link.indexOf('mailto') == 0 || link.indexOf('youtube') != -1 ) {
			chk = 0;
		}
		var pEle = ele;
		while(!!pEle.parentNode) {
			if(pEle.classList.contains('titan')) {
				chk = 0;
				break;
			} else {
				pEle = pEle.parentNode;
			}
		}
		var result = {
			'go' : !!chk,
			'link' : link
		}
		return result;
	}
};

//iframe rwd
function iframeRwd(dom) {
	if($(dom).find('iframe').length > 0) {
		var iframeBox = '<div class="iframeBox"/>';
		$(dom).find('iframe').each(function() {
			$(this).removeAttr('width height');
			$(this).after(iframeBox);
			$(this).appendTo($(this).next('.iframeBox'));
		});
	}
}


// footer menu
$(function() {
	$(window).on('resize', function() {
		var windowsize = window.innerWidth;
		if (windowsize >= 769) {
		   $('footer .downMenu').removeClass('mb');
		} else {
		   $('footer .downMenu').addClass('mb');
		}

	}).trigger('resize');
	$('footer .downMenu li.dropDown > a').removeAttr("href");
	// $('footer .downMenu.mb li.dropDown > a').click(function(event){
	$(document).on('click', 'footer .downMenu.mb li.dropDown > a', function(event) {
		event.preventDefault();
		$("footer .downMenu.mb li.dropDown .submenu").stop().slideUp();
		$(this).toggleClass('open').parent().siblings().find('a').removeClass('open');
		$(this).siblings().stop().slideToggle(400);
		// $(this).toggleClass('open');
		// $(this).siblings('.submenu').stop().slideToggle(200);
	});
});



$(function(){

	//submenu
	$('header .dropDown').hover(function(){
		if($(this).parent().hasClass('nav')) return false;
		// $(this).find('.submenu').stop(false,true).slideDown(200);
		$(this).find('.submenu').addClass('open');
	},function(){
		if($(this).parent().hasClass('nav')) return false;
		// $(this).find('.submenu').stop(false,true).slideUp(200);
		$(this).find('.submenu').removeClass('open');
	});

	// $('header .submenu .innerBox').find('a').removeClass('current');
	$('header .menu a:not(.theme) +.submenu .innerBox').find('a').removeClass('current');


	//mobile menu
	// var $m_menu = $('ul.menu').clone();
	// var $top_m_menu = "" ;//$('.topLink').find('.rightBox').children('a').not('.exclude').clone();

	// $m_menu.insertAfter('.m_menu .hideBox p.sp_menu').removeClass().addClass('nav').find('b').remove().end().append($top_m_menu).children('a').wrap('<li/>').end().find('li.dropDown').each(function(){
	// 	$(this).children('a').removeClass().append('<i class="fa fa-angle-down" />').attr('href','');
	// });

	$('.m_menu').find('a.main').click(function(){
		if(!$(this).parents('.m_menu').hasClass('active')){
			$(this).parents('.m_menu').addClass('active');
			$(this).addClass('show');
			$('.m_menu').find('.mask').fadeIn(100);
			$('.m_menu').find('.hideBox').fadeIn(100);
			$('body').css('overflow','hidden');
			$('.m_menu').find('.mask').click(function(){/*點空白處收起menu*/
				$('.m_menu').removeClass('active');
				$('.m_menu').find('.hideBox').fadeOut();
				$('.m_menu').find('.mask').fadeOut();
			});
		}else{
			$(this).parents('.m_menu').removeClass('active');
			$(this).removeClass('show');
			$('.m_menu').find('.mask').fadeOut();
			$('.m_menu').find('.hideBox').fadeOut();
			$('body').css('overflow','auto');
		}//end if hasClass

		return false;
	});

	// for mobile abou author
	$('.m_menu .nav .submenu a[data-id], footer .downMenu.mb li.dropDown a[data-id]').click(function(){
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(hash).offset().top - $('.m_menu').outerHeight()
		}, 1000);

		$('.m_menu').removeClass('active');
		$('.m_menu .main').removeClass('show');
		$('.m_menu').find('.mask').fadeOut();
		$('.m_menu').find('.hideBox').fadeOut();
		$('body').css('overflow','auto');
	});

	$('.m_menu').find('li.dropDown').children('a').click(function(){
		$(this).siblings().slideToggle();
		$(this).toggleClass('open');
		return false;
	});

	//mobile classLink
	$('.mainArea .classLink').each(function(){
		var currentText = $(this).find('a.current').last().text() || $('.menu > li > a.current').text();
		// console.log('last:'+$(this).find('a.current').last().text()+' ,eq'+$(this).children('li:eq(0) > a').text());
		$(this).after('<div class="mClassLink"></div');
		$(this).next('.mClassLink').append('<div class="main">'+currentText+'</div>', $(this).clone().removeClass('classLink').addClass('mClassList'));
	});

	$('.mClassList li, .classColumnBox > ul li').each(function(){
		if($(this).has('ul').length > 0) {
			$(this).children('a').addClass('linkHasItems');
		}
	});
	// mClassLink open
	$('.mClassLink > .main').on('click', function(){
		// $('.mClassLink').toggleClass('open');
		$(this).parent('.mClassLink').toggleClass('open');
	});

	$('.mClassLink a').not('.linkHasItems').on('click', function(){

		var text = $(this).text(),
			box = $(this).parents('.mClassLink').children('.main');

		if ($(this).is('[data-disable]') == true || $(this).hasClass('current')) {
			return false;
		} else {
			$(this).addClass('current').siblings().removeClass('current');
			box.text(text);
		}

	});

	$('.linkHasItems').each(function(){
		if($(this).siblings('ul').has('.current').length > 0) {
			$(this).addClass('open');
		}
	});

	$('.linkHasItems').on('click', function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).hasClass('open') ? $(this).removeClass('open') : $(this).addClass('open');
	});

	//mailLink
	$('.contactLink').click(function(){
		if(isMobile){
			var href = $(this).data('mail');
			window.location.href= 'mailto:'+href;
			return false;
		}
	});

	//gotop
	$('.goTop').click(function(){
		$('body,html').stop().animate({scrollTop:0});
		return false;
	});

	//module box
	$('.outerWrap').after('<div class="moduleMask"></div>');
	$(document).on('click','.openModule',function() {
		var obj = $(this).attr('href');
		// var moduleWidth = $(obj).outerWidth() / 2;
		// var moduleHeight = $(obj).outerHeight() / 2;
		// $(obj).css({
		// 	'margin-left': -moduleWidth,
		// 	'margin-top': -moduleHeight
		// }).addClass('show');
		$(obj).addClass('show');
		$('.moduleMask').addClass('show');
		$('body').css('overflow','hidden');
		return false;
	});
	$('.moduleMask, .moduleClose').click(function() {
		$('.moduleBox, .moduleMask').removeClass('show');
		$('body').css('overflow','auto');
	});

	//item
	$(document).on('click','.item',function() {
		if($(this).hasClass('hasVideo') && isMobile==true){
			var href= $(this).siblings().find('a').attr('href');
			window.open(href);
		}else if($(this).hasClass('hasVideo') && isMobile==false){
			$(this).siblings().find('a').eq(0).click();
		}else if($(this).hasClass('hasAlbum')){
			$(this).siblings().find('a').eq(0).click();
		}
	});
});
