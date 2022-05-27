const targetImgs = document.querySelectorAll('img');
const targetIframes = document.querySelectorAll('iframe');

const lazyLoad = target => {
    const src = target.getAttribute('lazy');
    const srcset = target.getAttribute('srcset-lazy');

    if(src) {
        target.setAttribute('src', src);
    }
    if(srcset) {
        target.setAttribute('srcset', srcset);
    }
};

targetImgs.forEach(lazyLoad);
targetIframes.forEach(lazyLoad);