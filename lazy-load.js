const targetImgs = document.querySelectorAll('img');
const targetIframes = document.querySelectorAll('iframe');

const lazyLoadImg = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('lazy');
            const srcset = img.getAttribute('srcset-lazy');

            if(src) {
                console.log(`src: ${src}`);
                img.setAttribute('src', src);
            }
            if(srcset) {
                console.log(`srcset: ${srcset}`);
                img.setAttribute('srcset', srcset);
            }

            observer.disconnect();
        }
        });
    });
io.observe(target)
};

targetImgs.forEach(lazyLoadImg);
targetIframes.forEach(lazyLoadImg);
