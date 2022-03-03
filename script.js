var hamburger = document.getElementById('hamburger');

function hamburgerClick() {
    var navlinks = document.getElementById('nav-links');  //stating varible does not work outside the fuction
    if(navlinks.style.display === 'none') {
        navlinks.style.display = 'block';
    }
    else {
        navlinks.style.display = 'none';
    }
}