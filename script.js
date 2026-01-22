$(document).ready(function () {

    function isScrolledIntoView(elem) {
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        
        return elemBottom > viewportTop && elemTop < viewportBottom;
    }

    function fadeInAnimation() {
        $(".fade_in").each(function () {
            if (isScrolledIntoView(this) && $(this).css("opacity") == "0") {
                $(this).css("visibility", "visible").animate({ opacity: 1 }, 1000); //time of fade-in effect
            }
        });
    }

    //opacity to zero and visibility hidden
    $(".fade_in").css({ opacity: "0", visibility: "hidden" });

//run when section is in view
fadeInAnimation();

    // run after the page is fully loaded
    $(window).on("load", fadeInAnimation);

    // effect runs on scroll
    $(window).on("scroll", fadeInAnimation);

    // Run fade-in after delay
    setTimeout(fadeInAnimation, 700);
});


//Animation Of Text From Left to Right//

function measureWidths() {
    $(".animate-box").each(function() {
        $(this).css("width", "auto"); // Set to auto to measure
        let fullWidth = $(this).width(); // Get actual width
        $(this).data("full-width", fullWidth); // Store the width
        $(this).css("width", "0"); // Hide text again
    });
}

function animateElement(element, delay, callback) {
    let fullWidth = $(element).data("full-width"); // Retrieve stored width
    $(element).animate({ width: fullWidth }, delay, function() {
        if (callback) callback();
    });
}

function reverseAnimateElement(element, delay, callback) {
    $(element).animate({ width: 0 }, delay, function() {
        if (callback) callback();
    });
}

function startAnimationLoop() {
    measureWidths(); // Recalculate width on every loop
    animateElement("#animation_text1", 1000, function() {
        animateElement("#animation_text2", 1000, function() {
            reverseAnimateElement("#animation_text2", 1000, function() {
                reverseAnimateElement("#animation_text1", 1000, function() {
                    startAnimationLoop(); // Restart loop
                });
            });
        });
    });
}

$(document).ready(function() {
    measureWidths(); // Get widths initially
    startAnimationLoop(); // Start the infinite animation loop

    $(window).resize(function() {
        measureWidths(); // Recalculate widths when resizing the window
    });
});
//End Of Animation//


//slidebar jquery for when click close slidebar and scroll//

$(document).ready(function() {
    // Close the sidebar and scroll to the clicked section
    $('#slidebar .nav-link').on('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior

        // Get the target section id from the href attribute
        var targetSection = $(this).attr('href');

        // Scroll to the target section smoothly
        $('html, body').animate({
            scrollTop: $(targetSection).offset().top
        }, 500); // smooth scroll effect

        // Close the sidebar
        $('#slidebar').offcanvas('hide');
    });
});

//End jquery for when click close slidebar and scroll //


// //When you reload at any section scroll to top//

$(document).ready(function() {
    // Scroll to the section when clicking a link
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        
        var target = $(this.getAttribute('href'));
        
        // Scroll to the target section 
        $('html, body').scrollTop(target.offset().top);
    });

    // After page reload, scroll to the top
    if (window.location.hash) {
        // If there is a hash in the URL
        history.replaceState("", document.title, window.location.pathname + window.location.search); // Clear the hash
    } else {
        // If no hash, scroll to the top immediately
        $('html, body').scrollTop(0);
    }
});
//End of jquery reload at any section scroll to top//

//Add Year in copyright section dynamically//

$(document).ready(function() {
    $('.year_copyright').text(new Date().getFullYear() );
});

//End of jquery//