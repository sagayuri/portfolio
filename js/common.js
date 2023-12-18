// pageTop
const scrollTop = document.getElementById('js-scrollTop');
const windowHeight = window.outerHeight;

window.addEventListener('scroll', (e) => {
    const scroll = window.scrollY;

    if(scroll > windowHeight * 0.8) {
        scrollTop.classList.remove('js-hide');
    } else {
        scrollTop.classList.add('js-hide');
    }
});

const animateScrollToTop = (timestamp, startTime) => {
    const duration = 800;
    const startScroll = window.scrollY;
    const endScroll = 0;
    const progress = Math.min(1, (timestamp - startTime) / duration);
    const easeInOutCubic = t => t <0.5 ? 4 * t * t * t : 1 -Math.pow(-2 * t + 2, 3) / 2;

    const scrollTo = startScroll + (endScroll - startScroll) * easeInOutCubic(progress);
    window.scrollTo(0, scrollTo);

    if (progress < 1) {
        requestAnimationFrame((timestamp) => animateScrollToTop(timestamp,startTime));
    }
};

scrollTop.addEventListener('click', () => {
    const startTime = performance.now();
    requestAnimationFrame((timestamp) => animateScrollToTop(timestamp,startTime));
});

// anchor
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const anchorLinksArr = Array.prototype.slice.call(anchorLinks);

anchorLinksArr.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.hash;
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

