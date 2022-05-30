//the time it waits before page scrolls from the top
var waitBeforePageScrolls = -100;
//the time it waits when it hits the end of the page before looping back to the top
var waitBeforePageTop = 50;
//current height of the page
var height = waitBeforePageScrolls;
//if the mouse is hovering on iframe
var hover = false;
//the time it takes to scroll again in milliseconds
var scrollInterval = 5;
//how much it scrolls per interval
var scrollAmount = .26;

setInterval(function() {
    var iframe = document.getElementById('bannerIframe');
    if(!hover) {
        iframe.contentWindow.scrollTo(0, height);
        height += scrollAmount;
    }
    else {
        height = iframe.contentWindow.pageYOffset;
    }

    if(height > iframe.contentWindow.pageYOffset + waitBeforePageTop) {
        height = waitBeforePageScrolls;
    }

}, scrollInterval);

function iframeMouseEnter() {
    hover = true;
}

function iframeMouseOut() {
    hover = false;
}