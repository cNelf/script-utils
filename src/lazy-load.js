function lazyLoad() {
  document.addEventListener('DOMContentLoaded', function () {
    let images = [].slice.call(document.querySelectorAll('img'));

    if ('loading' in HTMLImageElement.prototype) {
      images.forEach((image) => {
        const { src, srcset } = image.dataset;
        src && (image.src = src);
        srcset && (image.srcset = image.dataset.srcset);
      });
    } else if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            const { src, srcset } = lazyImage.dataset;
            src && (lazyImage.src = src);
            srcset && (lazyImage.srcset = lazyImage.dataset.srcset);
            imageObserver.unobserve(lazyImage);
          }
        });
      });

      images.forEach(function (image) {
        imageObserver.observe(image);
      });
    } else {
      let active = false;
      const loadImage = function () {
        if (!active) {
          active = true;
          setTimeout(function () {
            images.forEach(function (lazyImage) {
              if (
                lazyImage.getBoundingClientRect().top < window.innerHeight &&
                lazyImage.getBoundingClientRect().bottom >= 0 &&
                getComputedStyle(lazyImage).display !== 'none'
              ) {
                const { src, srcset } = lazyImage.dataset;
                src && (lazyImage.src = src);
                srcset && (lazyImage.srcset = lazyImage.dataset.srcset);
                images = images.filter(function (image) {
                  return image !== lazyImage;
                });
                if (images.length === 0) {
                  document.removeEventListener('scroll', loadImage);
                  window.removeEventListener('resize', loadImage);
                  window.removeEventListener('orientationchange', loadImage);
                }
              }
            });
            active = false;
          }, 200);
        }
      };

      loadImage();
      document.addEventListener('scroll', loadImage);
      window.addEventListener('resize', loadImage);
      window.addEventListener('orientationchange', loadImage);
    }
  });
}

lazyLoad();
