  //  const mainSplide = new Splide('#shopify-section-template--14947733504065__hero-slideshow .splide', {
  //       pagination: false,
  //       arrows: false,
  //       autoplay: true,
  //       interval: 5000,
  //       keyboard: true,
  //       focus: 'center',
  //       pauseOnHover: false,
  //       pauseOnFocus: false,
  //       type: 'loop',
  //     }).mount();
  
  //     const contentSplide = new Splide('#content-slider', {
  //       type: 'fade',
  //       rewind: true,
  //       pagination: false,
  //       arrows: true,
  //       autoplay: true,
  //       interval: 5000,
  //     }).mount();
  
  //     mainSplide.sync(contentSplide);
  
  //     mainSplide.on('autoplay:playing', function (rate) {
  //       document.querySelectorAll('#shopify-section-template--14947733504065__hero-slideshow .my-slider-progress-bar').forEach((e) => e.style.width = `${rate * 100}%`);
  //     });
  
  //     mainSplide.on('moved', function (rate) {
  //       setTimeout(function () {
  //         document.querySelectorAll('#shopify-section-template--14947733504065__hero-slideshow .my-slider-progress-bar').forEach((e) => { e.style.width = '0px'; });
  //       }, 300);
  //     });
  
  //     document.querySelectorAll('#shopify-section-template--14947733504065__hero-slideshow .slideshow-controls').forEach((e) => {
  //       e.addEventListener('click', function (ev) {
  //         var Autoplay = mainSplide.Components.Autoplay;
  
  //         if (Autoplay.isPaused()) {
  //           Autoplay.play();
  //         } else {
  //           Autoplay.pause();
  //         }
  
  //         document.querySelectorAll('#shopify-section-template--14947733504065__hero-slideshow .slideshow-controls button').forEach((e) => {
  //           e.classList.toggle('active');
  //         });
  //       });
  //     });