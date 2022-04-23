function hamburgerClick() {
    //stating varibles do not work outside the fuction
    var navlinks = document.getElementById('nav-links');
    var navItem = document.querySelectorAll('.nav-item');
    var contactDropdown = document.getElementById('contactDropdown');

    contactDropdown.textContent = 'Contact';
    navlinks.classList.toggle('navLinksDropdown');
    navItem.forEach(item => {item.classList.toggle('navItemDropdown')});
}

//the time it waits before page scrolls from the top
var waitBeforePageScrolls = -50;
//the time it waits when it hits the end of the page before looping back to the top
var waitBeforePageTop = 100;
//current height of the page
var height = waitBeforePageScrolls;
//if the mouse is hovering on iframe
var hover = false;
//the time it takes to scroll again in milliseconds
var scrollInterval = 5;
//how much it scrolls per interval
var scrollAmount = .3;

setInterval(function() {
    var iframe = document.getElementById('bannerIframe');
    if(!hover) {
        iframe.contentWindow.scrollTo(0, height);
        height += .3;
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
