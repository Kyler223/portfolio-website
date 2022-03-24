function hamburgerClick() {
    //stating varibles do not work outside the fuction
    var hamburger = document.getElementById('hamburger');
    var navlinks = document.getElementById('nav-links');
    var navItem = document.querySelectorAll('.nav-item');
    var contactDropdown = document.getElementById('contactDropdown');

    classToggler(hamburger, 'hamburger-center');
    classToggler(navlinks, 'navLinksDropdown');
    navItem.forEach(item => {classToggler(item, 'navItemDropdown')});
    contactDropdown.textContent = 'Contact';
}

function classToggler(element, className) {
    element.classList.toggle(className);
}