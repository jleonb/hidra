// Page ready
$(document).ready(function()
{
	$('body').append('<div id="page-loading-blocs-notifaction"></div>'); // Add page loading UI
	$('.bloc-fill-screen').css('height', $(window).height()+'px'); // Set initial hero height
	$('#scroll-hero').click(function(event)
	{
		event.preventDefault();
		$('html,body').animate({scrollTop: $('#scroll-hero').closest('.bloc').height()}, 'slow');
	});

	setUpDropdownSubs(); // Set Up Dropdown Menu Support
	setUpLightBox(); // Add lightbox Support
});

// Loading page complete
$(window).load(function()
{
	setFillScreenBlocHeight();
	animateWhenVisible();  // Activate animation when visible
	$('#page-loading-blocs-notifaction').remove(); // Remove page loading UI
}
).resize(function() // Window resize
{
	setFillScreenBlocHeight();
});

// Set Fill Screen Bloc heights
function setFillScreenBlocHeight()
{
	$('.bloc-fill-screen').each(function(i) // Loop all fill Screens
	{
		var parentFillDiv = $(this);
		window.fillBodyHeight = 0;
		$(this).find('.container').each(function(i) // Loop all fill Screens
		{
			fillPadding = parseInt($(this).css('padding-top'))*2

			if(parentFillDiv.hasClass('bloc-group')) // Bloc Groups
			{
				fillBodyHeight = fillPadding + $(this).outerHeight()+50; // Set hero body height
			}
			else
			{
				fillBodyHeight = fillBodyHeight + fillPadding + $(this).outerHeight()+50; // Set hero body height
			}
		});
		$(this).css('height', (getFillHeight()) + 'px'); // Set Fill height
	});
}

// Get Fill Height
function getFillHeight()
{
	var H = $(window).height(); // Window height

	if(H < fillBodyHeight) // If window height is less than content height
	{
		H = fillBodyHeight+100;
	}
	return H
}

// Scroll to target
function scrollToTarget(D)
{
	if(D == 1) // Top of page
	{
		D = 0;
	}
	else if(D == 2) // Bottom of page
	{
		D = $(document).height();
	}
	else // Specific Bloc
	{
		D = $(D).offset().top;
		if($('.sticky-nav').length) // Sticky Nav in use
		{
			D = D-$('.sticky-nav').height();
		}
	}

	$('html,body').animate({scrollTop:D}, 'slow');
	$(".navbar-collapse").collapse('hide');
}

// Initial tooltips
$(function()
{
  $('[data-toggle="tooltip"]').tooltip()
})


// Animate when visible
function animateWhenVisible()
{
	hideAll(); // Hide all animation elements
	inViewCheck(); // Initail check on page load

	$(window).scroll(function()
	{
		inViewCheck(); // Check object visability on page scroll
		scrollToTopView(); // ScrollToTop button visability toggle
		stickyNavToggle(); // Sticky nav toggle
	});
};

// Set Up Dropdown Menu Support
function setUpDropdownSubs()
{
	$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event)
	{
		event.preventDefault();
		event.stopPropagation();
		$(this).parent().siblings().removeClass('open');
		$(this).parent().toggleClass('open');

		var targetMenu = $(this).parent().children('.dropdown-menu');
		var leftVal = targetMenu.offset().left+targetMenu.width();
		if(leftVal > $(window).width())
		{
			targetMenu.addClass('dropmenu-flow-right');
		}
	});
}

// Hide all animation elements
function stickyNavToggle()
{
	var V = 0; // offset Value
	var C = "sticky"; // Classes

	if($('.sticky-nav').hasClass('fill-bloc-top-edge')) // If nav is in hero animate in
	{
		var heroBackgroundColor = $('.fill-bloc-top-edge.sticky-nav').parent().css('background-color');

		if(heroBackgroundColor == "rgba(0, 0, 0, 0)")
		{
			heroBackgroundColor = '#FFFFFF'
		}

		$('.sticky-nav').css('background', heroBackgroundColor);

		V = $('.sticky-nav').height();
		C = "sticky animated fadeInDown";
	}

	if($(window).scrollTop() > V)
	{
		$('.sticky-nav').addClass(C);

		if(C == "sticky")
		{
			$('.page-container').css('padding-top',$('.sticky-nav').height());
		}
	}
	else
	{
		$('.sticky-nav').removeClass(C).removeAttr('style');
		$('.page-container').removeAttr('style');
	}
}

// Hide all animation elements
function hideAll()
{
	$('.animated').each(function(i)
	{
		if(!$(this).closest('.hero').length) // Dont hide hero object
		{
			$(this).removeClass('animated').addClass('hideMe');
		}
	});
}

// Check if object is inView
function inViewCheck()
{
	$($(".hideMe").get().reverse()).each(function(i)
	{
		var target = jQuery(this);
		var a = target.offset().top + target.height();
		var b = $(window).scrollTop() + $(window).height();

		if(target.height() > $(window).height()) // If object height is greater than window height
		{
			a = target.offset().top;
		}

		if (a < b)
		{
			var objectClass = target.attr('class').replace('hideMe' , 'animated');
			target.css('visibility','hidden').removeAttr('class');
			setTimeout(function(){target.attr('class',objectClass).css('visibility','visible');},0.01);
		}
	});
};

// ScrollToTop button toggle
function scrollToTopView()
{
	if($(window).scrollTop() > $(window).height()/3)
	{
		if(!$('.scrollToTop').hasClass('showScrollTop'))
		{
			$('.scrollToTop').addClass('showScrollTop');
		}
	}
	else
	{
		$('.scrollToTop').removeClass('showScrollTop');
	}
};
