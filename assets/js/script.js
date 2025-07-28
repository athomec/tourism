$(function () {//JS開頭

	var WINDOW = $(window).width();//視窗寬度
	var WINDOWH = $(window).height();//視窗高度

	//-------------字級大小
	$(".js-top-function button").click(function () {
		if ($(this).hasClass("js-font-sm")) {
			$("html").addClass("sm");
		} else if ($(this).hasClass("js-font-md")) {
			$("html").removeClass("sm").removeClass("lg");
		} else if ($(this).hasClass("js-font-lg")) {
			$("html").addClass("lg");
		}
		$(this).addClass("active");
		return false;
	})

	//-------------menu陰影

	$(window).on('scroll', function () {
		if ($(window).width() > 992){
			if ($(window).scrollTop() > 100) {
				$('.js-nav').addClass('active');
				$('.js-brand').addClass('active');
				$('.js-shop').addClass('active');
			} else {
				$('.js-nav').removeClass('active');
				$('.js-brand').removeClass('active');
				$('.js-shop').removeClass('active');
			}
		}
	});

	//-------------toogle-----------
	$(".js-toggle-btn").click(function (){
		$(this).toggleClass(".active");
	})

	//-------------下拉選單設定
	function toggleCollapseOnBreakpoint() {
		const isDesktop = $(window).width() > 992;

		$('.js-nav .navbar-nav-link').each(function () {
			const $link = $(this);
			const toggle = $link.attr('data-bs-toggle');
			const target = $link.attr('data-bs-target');
			// 如果有 collapse 行為，就先備份
			if (!isDesktop && !$link.attr('data-original-toggle') && toggle === 'collapse') {
				$link.attr('data-original-toggle', toggle);
				$link.attr('data-original-target', target);
				$link.attr('data-original-expanded', $link.attr('aria-expanded'));
			}
			// 桌機：移除 collapse 行為
			if (isDesktop && toggle === 'collapse') {
				$link.removeAttr('data-bs-toggle data-bs-target aria-expanded');
			}
			// 手機：還原原始 collapse 屬性
			if (!isDesktop && $link.attr('data-original-toggle')) {
				$link.attr('data-bs-toggle', $link.attr('data-original-toggle'));
				$link.attr('data-bs-target', $link.attr('data-original-target'));
				$link.attr('aria-expanded', $link.attr('data-original-expanded'));
			}
		});
		// 桌機時把 dropdown 區塊收起來
		if (isDesktop) {
			$('.js-nav .navbar-dropdown').removeClass('show').addClass('collapse');
		}
	}

	toggleCollapseOnBreakpoint(); // 初始執行
	$(window).on('resize', toggleCollapseOnBreakpoint); // resize 時自動處理

	//--------------側邊選單設定
	$(".js-side-menu-toggler").click(function () {//側邊選單收合
		$(".js-side-menu").toggleClass("close");
	});
	RESIZE();

	function RESIZE() {
		var WINDOW = $(window).width();
		var WINDOWH = $(window).height();
		if (WINDOW < 992) {
			$('.js-side-menu').addClass("close");
			$(".js-side-content").addClass("close");
		} else {
			$('.js-side-menu').removeClass("close");
			$(".js-side-content").removeClass("close");
		}
		toggleCollapseOnBreakpoint();
	}
	$(window).resize(function () {
		RESIZE();
	})

	//---------------全站大圖設定
	$('.popup-gallery-basic').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		}
	});

	$('.js-video').magnificPopup({
		delegate: 'a',
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		iframe: {
			markup:
				'<div class="mfp-iframe-scaler">' +
				'<div class="mfp-close"></div>' +
				'<iframe class="mfp-iframe" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>' +
				'</div>',
			patterns: {
				youtube: {
					index: 'youtube.com/',
					id: function (url) {
						var match = url.match(/[?&]v=([^&]+)/) || url.match(/embed\/([^?&]+)/);
						return match ? match[1] : null;
					},
					src: 'https://www.youtube.com/embed/%id%?autoplay=1&rel=0'
				}
			}
		}
	});

	function renderFBPage() {
		var containerWidth = $('.fb-wrapper').width();
		$('.fb-page').attr('data-width', containerWidth);

		if (typeof FB !== 'undefined') {
			FB.XFBML.parse();
		}
	}

	// 初始載入執行一次
	renderFBPage();

	// debounce 避免 resize 太頻繁觸發
	let resizeTimer;
	$(window).on('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			renderFBPage();
		}, 300); // 延遲 300ms 再執行
	});
	




	//banner滑鼠滑動
	$('.carousel-inner').on('mousedown', function (e) {
		var startX = e.pageX || e.touches[0].pageX;
		$(this).on('mousemove touchmove', function (e) {
			var endX = e.pageX || e.touches[0].pageX;
			if (startX - endX > 50) {
				$('.carousel').carousel('next');
				$(this).off('mousemove touchmove');
			} else if (endX - startX > 50) {
				$('.carousel').carousel('prev');
				$(this).off('mousemove touchmove');
			}
		});
	}).on('mouseup touchend', function () {
		$(this).off('mousemove touchmove');
	});

	$(".js-toggle-btn").click(function () {
		$(this).toggleClass("active");
	})
	$(".js-dropdown-menu").find("a").click(function () {
		$(this).toggleClass("active");
		$(".js-dropdown-menu").find("a").not(this).removeClass("active");
	})

})//JS尾端	
