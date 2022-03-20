function hamburgerClick() {
    //stating varibles do not work outside the fuction
    var navlinks = document.getElementById('nav-links');
    var navItem = document.querySelectorAll('.nav-item');
    var contactDropdown = document.getElementById('contactDropdown');

    contactDropdown.textContent = 'Contact';
    navlinks.classList.toggle('navLinksDropdown');
    navItem.forEach(item => {item.classList.toggle('navItemDropdown')});
}
