function hamburgerClick() {
    //stating varibles do not work outside the fuction
    var navlinks = document.getElementById('nav-links');
    var navItem = document.querySelectorAll('.nav-item');
    var contactDropdown = document.getElementById('contactDropdown');

    contactDropdown.textContent = 'Contact';
    navlinks.classList.toggle('navLinksDropdown');
    navItem.forEach(item => {item.classList.toggle('navItemDropdown')});
}

var height = -70;
var hover = false;

setInterval(function() {
    var iframe = document.getElementById('bannerIframe');
    if(!hover) {
        iframe.contentWindow.scrollTo(0, height);
        height = height + .3;
    }
    else {
        height = iframe.contentWindow.pageYOffset;
    }

    if(height > iframe.contentWindow.pageYOffset + 100) {
        height = -50;
    }

}, 5);

function iframeMouseEnter() {
    hover = true;
}

function iframeMouseOut() {
    hover = false;
}

