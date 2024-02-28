const defaultDeg = 5;

const swiper = new Swiper(".tinyflow-slider", {
    slidesPerView: "auto",
    spaceBetween: 0,
    threshold: 0,
    freeMode: true,
    grabCursor: true,
    loop: true,
    lazy: true,
    keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
    effect: "coverflow",
    coverflowEffect: {
        stretch: 48,
        depth: 0,
        slideShadows: false,
    },
    on: {
        beforeInit: function (swiper) {
            swiper.params.coverflowEffect.rotate = swiper.el.dataset.rotate * -1 || (defaultDeg * -1);
            swiper.params.speed = swiper.el.dataset.speed * 1 || swiper.params.speed;
        },
        init: function (swiper) {
            let maxCardWidth = 0;
            let maxCardHeight = 0;
            swiper.slides.map(slideItem =>{
                maxCardWidth = Math.max(maxCardWidth, slideItem.getBoundingClientRect().width);
                maxCardHeight = Math.max(maxCardHeight, slideItem.offsetHeight);
            });
            const rotationAngle = swiper.el.dataset.rotate || defaultDeg;
            const rotationAngleRad = rotationAngle * Math.PI / 180;
            const rotatedContainerHeightSize = (Math.abs(maxCardWidth * Math.cos(rotationAngleRad)) + Math.abs(maxCardHeight * Math.sin(rotationAngleRad))) - maxCardHeight;
            swiper.el.style.cssText = `--_padding-block: ${rotatedContainerHeightSize / 2.4}; --_min-card-height: ${maxCardHeight}`;
        },
    },
});