document.addEventListener("DOMContentLoaded", () => {
  // accordion (accordion.js) ----
  const accordion = new Accordion('.accordion-container');

  // hero Swiper (swiper.js) ----
  const swiper = new Swiper('.js-hero-swiper', {
    allowTouchMove: false,
    loop: true,
    effect: 'fade',
    speed: 10000,
    autoplay: {
      delay: 10000
    }
  });


  // gallery Swiper ----
  let gallerySlider = new Swiper(".gallery__swiper-group", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 50,
    pagination: {
      el: ".gallery .gallery__swiper-pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".gallery__swiper-btn-next",
      prevEl: ".gallery__swiper-btn-prev"
    },

    breakpoints: {
      676: {
        slidesPerView: 2,
        spaceBetween: 34
      },

      1025: {
        slidesPerView: 2,
        spaceBetween: 70
      },

      1366: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }

  });

  // event Swiper ----
  let eventSlider = new Swiper(".event__slider", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 50,
    navigation: {
      nextEl: ".event__slider-btn-next",
      prevEl: ".event__slider-btn-prev"
    },

    pagination: {
      el: '.event__swiper-pagination',
    },
    breakpoints: {
      676: {
        slidesPerView: 2,
        spaceBetween: 34
      },

      800: {
        slidesPerView: 3,
        spaceBetween: 27
      },

      1025: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо


  });

  // projects Swiper ----
  const projectsSwiper = new Swiper('.projects__partners', {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 50,
    tabIndex: "-1",
    navigation: {
      nextEl: ".projects__btn-next",
      prevEl: ".projects__btn-prev"
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
        spaceBetween: 28
      },

      800: {
        slidesPerView: 2,
        spaceBetween: 50
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

  })

  // y-map
  ymaps.ready(init);
  function init() {
    const mapElem = document.querySelector('.contacts__map');
    const myMap = new ymaps.Map(
      "map",
      {
        center: [55.75846806898367, 37.60108849999989],
        zoom: 14,
        controls: ['geolocationControl', 'zoomControl']
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "200px", right: "20px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "120px", right: "20px" }
      }
    );

    myMap.behaviors.disable('scrollZoom');

    const myPlacemark = new ymaps.Placemark(
      [55.75846806898367, 37.60108849999989],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "img/map_placemark.svg",
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40],
      }
    );

    myMap.geoObjects.add(myPlacemark);
    myMap.container.fitToViewport();
  }

  // custom select (choices.js) ----
  const element = document.querySelector("#select");
  const choices = new Choices(element, {
    searchEnabled: false,
    scroll: false,
    itemSelectText: "",
    shouldSort: false,
  });

  // Tabs script ----
  document.querySelectorAll('.tabs-nav__btn').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (e) {
      const path = e.currentTarget.dataset.path;

      document.querySelectorAll('.tabs-nav__btn').forEach(function (btn) {
        btn.classList.remove('tabs-nav__btn--active')
      });
      e.currentTarget.classList.add('tabs-nav__btn--active');
      document.querySelectorAll('.tabs-item').forEach(function (tabsBtn) {
        tabsBtn.classList.remove('tabs-item--active')
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('tabs-item--active');
    });
  });

  //tooltip (tippy.js) ----
  tippy('.projects__tooltip', {
    theme: 'purple',
    maxWidth: 265,
    touch: true,
  });

  // form validate (justvalidate.js) ----
  const validation = new JustValidate(
    '.contacts__form',
    {
      errorLabelCssClass: 'is-label-invalid',
      errorLabelStyle: {
        color: '#D11616',
      },
    });

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Как вас зовут?',

      },
    ])
    .addField('#tel', [
      {
        rule: 'required',
        errorMessage: 'Укажите ваш телефон',
      },
      {
        rule: 'number',
        errorMessage: 'Недопустимый формат',
      },
    ]
    );

  // dropdown ----
  const params = {
    btnClassName: "js-header-dropdown-btn",
    dropClassName: "js-header-drop",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`);

      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }

  setMenuListener();

  //---- Burger ----
  const burgerBtn = document.querySelector("#burger");
  const burgerMenu = document.querySelector("#burger-menu");
  const burgerCloseBtn = document.querySelector("#burger-close");
  const burgerItem = document.querySelectorAll(".burger__item")

  burgerBtn.addEventListener("click", function () {
    burgerMenu.classList.toggle("burger_active");
    document.body.classList.toggle("hidden-overflow");
  });
  burgerCloseBtn.addEventListener("click", function () {
    burgerMenu.classList.toggle("burger_active");
    document.body.classList.toggle("hidden-overflow");
  });
  // при нажатии на элементы списка бургера - разблокируется скролл на сайте
  // и закрывается меню бургера
  burgerItem.forEach(function (el) {
    el.addEventListener('click', function () {
      document.body.classList.remove("hidden-overflow");
      burgerMenu.classList.remove("burger_active");
    })
  })

  //---- smooth anchors ----
  // все элементы с атрибутом href="#..."
  const anchors = document.querySelectorAll('a[href*="#"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // при клике ничего не происходит 
      // записывыем ЗНАЧЕНИЕ АТРИБУТА href как строка
      const blockID = anchor.getAttribute('href');

      if (pageWidth > 580) {
        if (blockID != '#unknown' && blockID != '#domenico' && blockID != '#') {
          // ниже функционал плавного скрола
          document.querySelector('' + blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else if (pageWidth < 581 && blockID != '#') {
        document.querySelector('' + blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  };

  // search adaptive 
  const pageWidth = document.documentElement.scrollWidth;
  const logo = document.querySelector(".header__logo-link");

  const searchOpenBtn = document.querySelectorAll(".search-open");
  const searchCloseBtn = document.querySelectorAll(".search-close");
  const searchItemsWrap = document.querySelector("#inputANDclose-wrap");


  if (pageWidth <= 1024) {
    searchOpenBtn.forEach(function (el) {
      el.addEventListener('click', function () {
        searchItemsWrap.classList.toggle("wrap-opened");
        searchOpenBtn.forEach(function (el) {
          el.classList.toggle("btn-opened");
        })
      })
    })

    searchCloseBtn.forEach(function (el) {
      el.addEventListener('click', function () {
        searchItemsWrap.classList.toggle("wrap-opened");
        searchOpenBtn.forEach(function (el) {
          el.classList.toggle("btn-opened");
        })
      })
    })
  }

  if (pageWidth <= 800 && pageWidth > 675) {
    searchOpenBtn.forEach(function (el) {
      el.addEventListener('click', function () {
        burgerBtn.classList.toggle("hidden");
        logo.classList.toggle("hidden")
      })
    })

    searchCloseBtn.forEach(function (el) {
      el.addEventListener('click', function () {
        burgerBtn.classList.toggle("hidden");
        logo.classList.toggle("hidden")
      })
    })
  }
})