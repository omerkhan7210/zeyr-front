// HomePage.js
import React, { useEffect } from "react";
import "./product-slider.js";
import { Link } from "react-router-dom";
import { ProductCard } from "../ProductSlider/ProductCard.jsx";
import { Slider } from "../ProductSlider/Slider.jsx";

const HomePage = () => {
  useEffect(() => {
    const initializeSplide = () => {
      let heroHeight = "768px";
      const announcementBar = document.querySelector(".announcement-bar");
  
      if (announcementBar) {
        heroHeight = "768px - 40px";
      }
  
      const mainSplideElement = document.querySelector("#shopify-section-template--14940997648449__hero-slideshow .splide");
      const contentSplideElement = document.querySelector("#content-slider");
  
      if (!mainSplideElement || !contentSplideElement) {
        // Return or handle the case where the elements are not found
        return;
      }
  
      const mainSplide = new Splide(mainSplideElement, {
        pagination: false,
        arrows: false,
        autoplay: true,
        interval: 5000,
        keyboard: true,
        focus: "center",
        pauseOnHover: false,
        pauseOnFocus: false,
        type: "loop",
      }).mount();
  
      const contentSplide = new Splide(contentSplideElement, {
        type: "fade",
        rewind: true,
        pagination: false,
        arrows: true,
        autoplay: true,
        interval: 5000,
      }).mount();
  
      mainSplide.sync(contentSplide);
  
      mainSplide.on("autoplay:playing", function (rate) {
        document
          .querySelectorAll("#shopify-section-template--14940997648449__hero-slideshow .my-slider-progress-bar")
          .forEach((e) => {
            e.style.width = `${rate * 100}%`;
          });
      });
  
      mainSplide.on("moved", function (rate) {
        setTimeout(function () {
          document
            .querySelectorAll("#shopify-section-template--14940997648449__hero-slideshow .my-slider-progress-bar")
            .forEach((e) => {
              e.style.width = "0px";
            });
        }, 300);
      });
  
      document
        .querySelectorAll("#shopify-section-template--14940997648449__hero-slideshow .slideshow-controls")
        .forEach((e) => {
          e.addEventListener("click", function (ev) {
            var Autoplay = mainSplide.Components.Autoplay;
  
            if (Autoplay.isPaused()) {
              Autoplay.play();
            } else {
              Autoplay.pause();
            }
  
            document
              .querySelectorAll("#shopify-section-template--14940997648449__hero-slideshow .slideshow-controls button")
              .forEach((e) => {
                e.classList.toggle("active");
              });
          });
        });
    };
  
    window.onload = initializeSplide;
  
    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      window.onload = null;
    };
  }, []);
  
  return (
    <main
      id="MainContent"
      className="content-for-layout"
      role="main"
      tabIndex="-1"
    >
      {/* HOME VIDEO MAIN SLIDER */}
      <section
        id="shopify-section-template--14940997648449__hero-slideshow"
        className="shopify-section section section-slider has-image section-hero-slider"
      >
        <link
          href="/cdn/shop/t/300/assets/slideshow.css"
          rel="stylesheet"
          type="text/css"
          media="all"
        />
        <style data-shopify="">
          {`
      #content-slider {
      position: absolute;
      width: auto;
      display: flex;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
      max-width: 22rem;
      align-items: center;
      justify-content: center;
      }
      #content-slider .splide__slide {
      opacity: 0;
      transition: opacity 0.5s ease;
      }
      #content-slider .splide__slide.is-active {
      opacity: 1;
      }
      #content-slider .content--wrapper {
      margin: 0;
      padding: 0;
      }
      .section-hero-slider {
      display: block;
      position: relative;
      }
      .section-hero-slider .splide__arrows {
      height: 100%;
      display: flex;
      align-items: center;
      bottom: 0;
      z-index: unset;
      }
      .section-hero-slider .splide__arrow {
      z-index: 2;
      }
      #content-slider-track {
      background: #fff;
      }
      #content-slider .my-slider-progress-bar {
      bottom: 0;
      }
      #content-slider .splide__list {
      width: 22rem;
      }
      @media screen and (max-width: 1024px) {
      #main-slider .image-height {
      min-height: unset;
      object-fit: cover;
      }
      #main-slider .media--cover {
      height: 100%;
      }
      #content-slider {
      padding-bottom: 0;
      max-width: 100%;
      width: 100%;
      }
      #content-slider .splide__list,
      #content-slider .splide__track {
      width: 100%;
      }
      }
      @media screen and (max-width: 768px) {
      #shopify-section-template--14940997648449__hero-slideshow {
      padding-bottom: 67px;
      }
      .section-slider .my-slider-progress {
      display: flex;
      }
      .section-slider .splide__arrows {
      max-width: calc(100% - 90px);
      }
      }
      `}
        </style>
        <div
          className="splide splide__pagination--alt splide__pagination--counter splide--auto-rotate splide--loop splide--ltr splide--draggable is-active is-overflow is-initialized is-focus-in"
          id="main-slider"
          role="region"
          aria-roledescription="carousel"
        >
          <div
            className="splide__track splide__track--loop splide__track--ltr splide__track--draggable"
            id="main-slider-track"
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
            aria-live="off"
            aria-atomic="true"
            aria-busy="false"
          >
            <div
              className="splide__arrows splide__arrows--ltr"
              style={{ display: "none" }}
            >
              <button className="splide__arrow splide__arrow--prev">
                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 0.625002L1.625 7.5L8.5 14.375"
                    stroke="black"
                  ></path>
                </svg>
              </button>
              <button className="splide__arrow splide__arrow--next">
                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.5 14.375L7.375 7.5L0.5 0.625"
                    stroke="black"
                  ></path>
                </svg>
              </button>
            </div>
            <ul
              className="splide__list list-unstyled"
              id="main-slider-list"
              role="presentation"
              style={{ transform: "translateX(-5396px)" }}
            >
              <li
                className="slide-2ce1e6d0-a8fd-4845-8d22-cc9dfdab6a8f splide__slide container flex image-height is-counter-pagination aie jcc splide__slide--clone"
                style={{ height: "768px", width: "calc(100%)" }}
                id="main-slider-clone01"
                role="group"
                aria-roledescription="slide"
                aria-label="2 of 3"
                aria-hidden="true"
              >
                <Link
                  to="/men"
                  className="media--cover banner-overlay"
                  tabIndex="-1"
                >
                  <picture>
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1024 1024w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1280 1280w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1280 1440w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1600 1600w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1980 1980w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=2160 2160w
                        "
                      sizes="100vw"
                      media="(min-width: 1025px)"
                    />

                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=750 750w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=992 992w
                        "
                      sizes="100vw"
                      media="(min-width: 767px) and (max-width: 1024px)"
                    />
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=160 160w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=320 320w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=375 375w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=550 550w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=750 750w
                        "
                      sizes="100vw"
                    />
                    <img
                      loading="lazy"
                      src="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=1440"
                      data-splide-lazy="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=1440"
                      alt="AUTUMN-WINTER 2023 ICON: BLACK STAR"
                      width="3000"
                      height="1688.0"
                    />
                  </picture>
                </Link>
              </li>
              <li
                className="slide-1663013886963a0789-1 splide__slide container flex image-height is-counter-pagination aie jcc splide__slide--clone is-active"
                style={{ height: "768px", width: "calc(100%)" }}
                id="main-slider-clone02"
                role="group"
                aria-roledescription="slide"
                aria-label="3 of 3"
                aria-hidden="true"
              >
                <Link
                  to="/women"
                  className="media--cover banner-overlay"
                  tabIndex="-1"
                >
                  <picture>
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1024 1024w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1280 1280w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1280 1440w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1600 1600w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1980 1980w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=2160 2160w
                        "
                      sizes="100vw"
                      media="(min-width: 1025px)"
                    />

                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=750 750w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=992 992w
                        "
                      sizes="100vw"
                      media="(min-width: 767px) and (max-width: 1024px)"
                    />
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=160 160w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=320 320w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=375 375w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=550 550w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=750 750w
                        "
                      sizes="100vw"
                    />
                    <img
                      loading="lazy"
                      src="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=1440"
                      data-splide-lazy="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=1440"
                      alt="AUTUMN-WINTER 2023 WOMEN'S COLLECTION"
                      width="3000"
                      height="1688.0"
                    />
                  </picture>
                </Link>
              </li>
              <li
                className="slide-2ce1e6d0-a8fd-4845-8d22-cc9dfdab6a8f splide__slide container flex image-height is-counter-pagination aie jcc splide__slide--clone"
                style={{ height: "768px", width: "calc(100%)" }}
                id="main-slider-clone01"
                role="group"
                aria-roledescription="slide"
                aria-label="2 of 3"
                aria-hidden="true"
              >
                <Link
                  to="/men"
                  className="media--cover banner-overlay"
                  tabIndex="-1"
                >
                  <picture>
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1024 1024w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1280 1280w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1280 1440w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1600 1600w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1980 1980w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=2160 2160w
                        "
                      sizes="100vw"
                      media="(min-width: 1025px)"
                    />

                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=750 750w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=992 992w
                        "
                      sizes="100vw"
                      media="(min-width: 767px) and (max-width: 1024px)"
                    />
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=160 160w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=320 320w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=375 375w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=550 550w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=750 750w
                        "
                      sizes="100vw"
                    />
                    <img
                      loading="lazy"
                      src="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=1440"
                      data-splide-lazy="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=1440"
                      alt="AUTUMN-WINTER 2023 MEN'S COLLECTION"
                      width="3000"
                      height="1688.0"
                    />
                  </picture>
                </Link>
              </li>
              <li
                className="slide-1663013886963a0789-1 splide__slide container flex image-height is-counter-pagination aie jcc splide__slide--clone is-prev"
                style={{ height: "768px", width: "calc(100%)" }}
                id="main-slider-clone02"
                role="group"
                aria-roledescription="slide"
                aria-label="3 of 3"
                aria-hidden="true"
              >
                <Link
                  to="/women"
                  className="media--cover banner-overlay"
                  tabIndex="-1"
                >
                  <picture>
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1024 1024w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1280 1280w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1280 1440w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1600 1600w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1980 1980w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=2160 2160w
                        "
                      sizes="100vw"
                      media="(min-width: 1025px)"
                    />

                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=750 750w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=992 992w
                        "
                      sizes="100vw"
                      media="(min-width: 767px) and (max-width: 1024px)"
                    />
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=160 160w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=320 320w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=375 375w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=550 550w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=750 750w
                        "
                      sizes="100vw"
                    />
                    <img
                      loading="lazy"
                      src="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=1440"
                      data-splide-lazy="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=1440"
                      alt="AUTUMN-WINTER 2023 ICON: BLACK STAR"
                      width="3000"
                      height="1688.0"
                    />
                  </picture>
                </Link>
              </li>
              <li
                className="slide-1663013886963a0789-0 splide__slide container flex image-height is-counter-pagination aie jcc is-active is-visible"
                style={{ height: "768px", width: "calc(100%)" }}
                id="main-slider-slide01"
                role="group"
                aria-roledescription="slide"
                aria-label="1 of 3"
              >
                <Link to="/men" className="media--cover banner-overlay">
                  <picture>
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1024 1024w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1280 1280w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1280 1440w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1600 1600w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1980 1980w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=2160 2160w
                        "
                      sizes="100vw"
                      media="(min-width: 1025px)"
                    />

                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=750 750w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=992 992w
                        "
                      sizes="100vw"
                      media="(min-width: 767px) and (max-width: 1024px)"
                    />
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=160 160w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=320 320w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=375 375w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=550 550w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=750 750w
                        "
                      sizes="100vw"
                    />
                    <img
                      loading="lazy"
                      src="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=1440"
                      data-splide-lazy="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=1440"
                      alt="AUTUMN-WINTER 2023 WOMEN'S COLLECTION"
                      width="3000"
                      height="1688.0"
                    />
                  </picture>
                </Link>
              </li>
              <li
                className="slide-2ce1e6d0-a8fd-4845-8d22-cc9dfdab6a8f splide__slide container flex image-height is-counter-pagination aie jcc is-next"
                style={{ height: "768px", width: "calc(100%)" }}
                id="main-slider-slide02"
                role="group"
                aria-roledescription="slide"
                aria-label="2 of 3"
                aria-hidden="true"
              >
                <Link
                  to="/women"
                  className="media--cover banner-overlay"
                  tabIndex="-1"
                >
                  <picture>
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1024 1024w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1280 1280w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1280 1440w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1600 1600w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1980 1980w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=2160 2160w
                        "
                      sizes="100vw"
                      media="(min-width: 1025px)"
                    />

                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=750 750w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=992 992w
                        "
                      sizes="100vw"
                      media="(min-width: 767px) and (max-width: 1024px)"
                    />
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=160 160w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=320 320w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=375 375w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=550 550w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=750 750w
                        "
                      sizes="100vw"
                    />
                    <img
                      loading="lazy"
                      src="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=1440"
                      data-splide-lazy="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=1440"
                      alt="AUTUMN-WINTER 2023 MEN'S COLLECTION"
                      width="3000"
                      height="1688.0"
                    />
                  </picture>
                </Link>
              </li>
              <li
                className="slide-1663013886963a0789-1 splide__slide container flex image-height is-counter-pagination aie jcc"
                style={{ height: "768px", width: "calc(100%)" }}
                id="main-slider-slide03"
                role="group"
                aria-roledescription="slide"
                aria-label="3 of 3"
                aria-hidden="true"
              >
                <Link
                  to="/women"
                  className="media--cover banner-overlay"
                  tabIndex="-1"
                >
                  <picture>
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1024 1024w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1280 1280w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1280 1440w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1600 1600w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1980 1980w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=2160 2160w
                        "
                      sizes="100vw"
                      media="(min-width: 1025px)"
                    />

                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=750 750w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=992 992w
                        "
                      sizes="100vw"
                      media="(min-width: 767px) and (max-width: 1024px)"
                    />
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=160 160w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=320 320w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=375 375w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=550 550w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=750 750w
                        "
                      sizes="100vw"
                    />
                    <img
                      loading="lazy"
                      src="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=1440"
                      data-splide-lazy="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=1440"
                      alt="AUTUMN-WINTER 2023 ICON: BLACK STAR"
                      width="3000"
                      height="1688.0"
                    />
                  </picture>
                </Link>
              </li>
              <li
                className="slide-1663013886963a0789-0 splide__slide container flex image-height is-counter-pagination aie jcc splide__slide--clone is-next"
                style={{ height: "768px", width: "calc(100%)" }}
                id="main-slider-clone03"
                role="group"
                aria-roledescription="slide"
                aria-label="1 of 3"
                aria-hidden="true"
              >
                <Link
                  to="/men"
                  className="media--cover banner-overlay"
                  tabIndex="-1"
                >
                  <picture>
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1024 1024w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1280 1280w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1280 1440w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1600 1600w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=1980 1980w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=2160 2160w
                        "
                      sizes="100vw"
                      media="(min-width: 1025px)"
                    />

                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=750 750w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-1.jpg?v=1692126124&amp;width=992 992w
                        "
                      sizes="100vw"
                      media="(min-width: 767px) and (max-width: 1024px)"
                    />
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=160 160w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=320 320w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=375 375w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=550 550w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=750 750w
                        "
                      sizes="100vw"
                    />
                    <img
                      loading="lazy"
                      src="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=1440"
                      data-splide-lazy="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Mens-1_1.jpg?v=1692126141&amp;width=1440"
                      alt="AUTUMN-WINTER 2023 MEN'S COLLECTION"
                      width="3000"
                      height="1688.0"
                    />
                  </picture>
                </Link>
              </li>
              <li
                className="slide-2ce1e6d0-a8fd-4845-8d22-cc9dfdab6a8f splide__slide container flex image-height is-counter-pagination aie jcc splide__slide--clone"
                style={{ height: "768px", width: "calc(100%)" }}
                id="main-slider-clone04"
                role="group"
                aria-roledescription="slide"
                aria-label="2 of 3"
                aria-hidden="true"
              >
                <Link
                  to="/men"
                  className="media--cover banner-overlay"
                  tabIndex="-1"
                >
                  <picture>
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1024 1024w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1280 1280w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1280 1440w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1600 1600w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=1980 1980w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=2160 2160w
                        "
                      sizes="100vw"
                      media="(min-width: 1025px)"
                    />

                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=750 750w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-2.jpg?v=1692126282&amp;width=992 992w
                        "
                      sizes="100vw"
                      media="(min-width: 767px) and (max-width: 1024px)"
                    />
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=160 160w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=320 320w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=375 375w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=550 550w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=750 750w
                        "
                      sizes="100vw"
                    />
                    <img
                      loading="lazy"
                      src="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=1440"
                      data-splide-lazy="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-PREEMO-1.jpg?v=1692126294&amp;width=1440"
                      alt="AUTUMN-WINTER 2023 WOMEN'S COLLECTION"
                      width="3000"
                      height="1688.0"
                    />
                  </picture>
                </Link>
              </li>
              <li
                className="slide-1663013886963a0789-0 splide__slide container flex image-height is-counter-pagination aie jcc splide__slide--clone is-active"
                style={{ height: "768px", width: "calc(100%)" }}
                id="main-slider-clone03"
                role="group"
                aria-roledescription="slide"
                aria-label="1 of 3"
                aria-hidden="true"
              >
                <a
                  href="/men"
                  className="media--cover banner-overlay"
                  tabIndex="-1"
                >
                  <picture>
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1024 1024w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1280 1280w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1280 1440w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1600 1600w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=1980 1980w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=2160 2160w
                        "
                      sizes="100vw"
                      media="(min-width: 1025px)"
                    />

                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=750 750w,
                        /cdn/shop/files/Slideshow-Banner_Desktop_AW23-Icon-Black-Star-1.jpg?v=1692126179&amp;width=992 992w
                        "
                      sizes="100vw"
                      media="(min-width: 767px) and (max-width: 1024px)"
                    />
                    <source
                      srcSet="
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=160 160w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=320 320w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=375 375w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=550 550w,
                        /cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=750 750w
                        "
                      sizes="100vw"
                    />
                    <img
                      loading="lazy"
                      src="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=1440"
                      data-splide-lazy="/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=1440"
                      alt="AUTUMN-WINTER 2023 ICON: BLACK STAR"
                      width="3000"
                      height="1688.0"
                    />
                  </picture>
                </a>
              </li>
              <li
                className="slide-2ce1e6d0-a8fd-4845-8d22-cc9dfdab6a8f splide__slide container flex image-height is-counter-pagination aie jcc splide__slide--clone"
                style={{ height: "768px", width: "calc(100%)" }}
                id="main-slider-clone04"
                role="group"
                aria-roledescription="slide"
                aria-label="2 of 3"
                aria-hidden="true"
              >
                <Link
                  to="/women"
                  className="media--cover banner-overlay"
                  tabIndex="-1"
                >
                  <img
                    loading="lazy"
                    src='/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=1440"'
                    data-splide-lazy='/cdn/shop/files/Slideshow-Banner_Mobile_AW23-Icon-Black-Star-1_2.jpg?v=1692126202&amp;width=1440"'
                    alt="AUTUMN-WINTER 2023 ICON: BLACK STAR"
                    width="3000"
                    height="1688.0"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          id="content-slider"
          className="splide splide--fade splide--ltr splide--draggable is-active is-overflow is-initialized"
          role="region"
          aria-roledescription="carousel"
        >
          <div
            className="splide__track splide__track--fade splide__track--ltr splide__track--draggable"
            id="content-slider-track"
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
            aria-live="off"
            aria-atomic="true"
            aria-busy="false"
          >
            <div className="splide__arrows splide__arrows--ltr">
              <button
                className="splide__arrow splide__arrow--prev"
                aria-label="Go to last slide"
                aria-controls="content-slider-track"
              >
                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 0.625002L1.625 7.5L8.5 14.375"
                    stroke="black"
                  ></path>
                </svg>
              </button>
              <button
                className="splide__arrow splide__arrow--next"
                aria-label="Next slide"
                aria-controls="content-slider-track"
              >
                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.5 14.375L7.375 7.5L0.5 0.625"
                    stroke="black"
                  ></path>
                </svg>
              </button>
            </div>
            <ul
              className="splide__list"
              id="content-slider-list"
              role="presentation"
            >
              <li
                className="slide-1663013886963a0789-0 splide__slide is-active is-visible"
                id="content-slider-slide01"
                role="group"
                aria-roledescription="slide"
                aria-label="1 of 3"
                style={{
                  width: "calc(100%)",
                  transform: "translateX(0%)",
                  transition: "opacity 400ms cubic-bezier(0.25, 1, 0.5, 1) 0s",
                }}
              >
                <div
                  className="content--wrapper content--full-width text-center text-box"
                  
                >
                  <div className="content">
                    <div className="slideshow-controls">
                      <button
                        className="slideshow-control__pause active btn btn--unstyled"
                        aria-label="Pause slideshow"
                      >
                        <svg
                          className="icon icon--pause-2"
                          width="9"
                          height="9"
                          viewBox="0 0 9 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="Pause slideshow"
                        >
                          <g clipPath="url(#clip0_1137_1321)">
                            <rect
                              x="2"
                              width="1.5"
                              height="9"
                              fill="black"
                            ></rect>
                            <rect
                              x="5.5"
                              width="1.5"
                              height="9"
                              fill="black"
                            ></rect>
                          </g>
                          <defs>
                            <clipPath id="clip0_1137_1321">
                              <rect width="9" height="9" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                      <button
                        className="slideshow-control__play btn btn--unstyled"
                        aria-label="Unpause slideshow"
                      >
                        <svg
                          width="12"
                          height="13"
                          viewBox="0 0 12 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="Play slideshow"
                        >
                          <path
                            d="M0.299805 0.689941V12.3899L11.9998 6.54014L0.299805 0.689941Z"
                            fill="black"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="slideshow-two__pages">
                      <span className="slideshow-two__current-page">1 </span>/
                      <span className="slideshow-two__all-pages">3</span>
                    </div>
                    <div className="subheading">
                      AUTUMN-WINTER 2023 MEN'S COLLECTION
                    </div>
                    <div className="cta-container">
                      <Link
                        to="/men"
                        className="btn btn--link link-styled--reverse font-heading"
                      >
                        DISCOVER{" "}
                      </Link>
                      <Link
                        to="/men"
                        className="btn btn--link link-styled--reverse font-heading"
                      ></Link>
                    </div>
                    <div className="my-slider-progress flex">
                      <div className="my-slider-progress-bar-outer">
                        <div
                          className="my-slider-progress-bar"
                          style={{ width: "73.88%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li
                className="slide-2ce1e6d0-a8fd-4845-8d22-cc9dfdab6a8f splide__slide is-next"
                id="content-slider-slide02"
                role="group"
                aria-roledescription="slide"
                aria-label="2 of 3"
                style={{
                  width: "calc(100%)",
                  transform: "translateX(-100%)",
                  transition: "opacity 400ms cubic-bezier(0.25, 1, 0.5, 1) 0s",
                }}
                aria-hidden="true"
              >
                <div
                  className="content--wrapper content--full-width text-center text-box"
              
                >
                  <div className="content">
                    <div className="slideshow-controls">
                      <button
                        className="slideshow-control__pause active btn btn--unstyled"
                        aria-label="Pause slideshow"
                        tabIndex="-1"
                      >
                        <svg
                          className="icon icon--pause-2"
                          width="9"
                          height="9"
                          viewBox="0 0 9 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="Pause slideshow"
                        >
                          <g clipPath="url(#clip0_1137_1321)">
                            <rect
                              x="2"
                              width="1.5"
                              height="9"
                              fill="black"
                            ></rect>
                            <rect
                              x="5.5"
                              width="1.5"
                              height="9"
                              fill="black"
                            ></rect>
                          </g>
                          <defs>
                            <clipPath id="clip0_1137_1321">
                              <rect width="9" height="9" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                      <button
                        className="slideshow-control__play btn btn--unstyled"
                        aria-label="Unpause slideshow"
                        tabIndex="-1"
                      >
                        <svg
                          width="12"
                          height="13"
                          viewBox="0 0 12 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="Play slideshow"
                        >
                          <path
                            d="M0.299805 0.689941V12.3899L11.9998 6.54014L0.299805 0.689941Z"
                            fill="black"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="slideshow-two__pages">
                      <span className="slideshow-two__current-page">2 </span>/
                      <span className="slideshow-two__all-pages">3</span>
                    </div>
                    <div className="subheading">
                      AUTUMN-WINTER 2023 ICON: BLACK STAR
                    </div>
                    <div className="cta-container">
                      <Link
                        to="/men"
                        className="btn btn--link link-styled font-heading"
                        tabIndex="-1"
                      >
                        DISCOVER
                      </Link>
                    </div>
                    <div className="my-slider-progress flex">
                      <div className="my-slider-progress-bar-outer">
                        <div
                          className="my-slider-progress-bar"
                          style={{ width: "73.88%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li
                className="slide-1663013886963a0789-1 splide__slide"
                id="content-slider-slide03"
                role="group"
                aria-roledescription="slide"
                aria-label="3 of 3"
                style={{
                  width: "calc(100%)",
                  transform: "translateX(-200%)",
                  transition: "opacity 400ms cubic-bezier(0.25, 1, 0.5, 1) 0s",
                }}
                aria-hidden="true"
              >
                <div
                  className="content--wrapper  content--full-width text-center text-box"
                  
                >
                  <div className="content">
                    <div className="slideshow-controls">
                      <button
                        className="slideshow-control__pause active btn btn--unstyled"
                        aria-label="Pause slideshow"
                        tabIndex="-1"
                      >
                        <svg
                          className="icon icon--pause-2"
                          width="9"
                          height="9"
                          viewBox="0 0 9 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="Pause slideshow"
                        >
                          <g clipPath="url(#clip0_1137_1321)">
                            <rect
                              x="2"
                              width="1.5"
                              height="9"
                              fill="black"
                            ></rect>
                            <rect
                              x="5.5"
                              width="1.5"
                              height="9"
                              fill="black"
                            ></rect>
                          </g>
                          <defs>
                            <clipPath id="clip0_1137_1321">
                              <rect width="9" height="9" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                      <button
                        className="slideshow-control__play btn btn--unstyled"
                        aria-label="Unpause slideshow"
                        tabIndex="-1"
                      >
                        <svg
                          width="12"
                          height="13"
                          viewBox="0 0 12 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="Play slideshow"
                        >
                          <path
                            d="M0.299805 0.689941V12.3899L11.9998 6.54014L0.299805 0.689941Z"
                            fill="black"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="slideshow-two__pages">
                      <span className="slideshow-two__current-page">3 </span>/
                      <span className="slideshow-two__all-pages">3</span>
                    </div>
                    <div className="subheading">
                      AUTUMN-WINTER 2023 WOMEN'S COLLECTION
                    </div>
                    <div className="cta-container">
                      <Link
                        to="/women"
                        className="btn btn--link link-styled--reverse font-heading"
                        tabIndex="-1"
                      ></Link>
                      <Link
                        to="/women"
                        className="btn btn--link link-styled--reverse font-heading"
                        tabIndex="-1"
                      >
                        DISCOVER
                      </Link>
                    </div>
                    <div className="my-slider-progress flex">
                      <div className="my-slider-progress-bar-outer">
                        <div
                          className="my-slider-progress-bar"
                          style={{ width: "73.88%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <style data-shopify="">
          {`
      #shopify-section-template--14940997648449__hero-slideshow
      .slide-1663013886963a0789-0
      .content
      .heading {
      font-size: 20px;
      }
      #shopify-section-template--14940997648449__hero-slideshow
      .slide-1663013886963a0789-0
      .content
      .subheading {
      font-size: 10px;
      letter-spacing: 0.04em;
      }
      #shopify-section-template--14940997648449__hero-slideshow
      .slide-2ce1e6d0-a8fd-4845-8d22-cc9dfdab6a8f
      .content
      .heading {
      font-size: 20px;
      }
      #shopify-section-template--14940997648449__hero-slideshow
      .slide-2ce1e6d0-a8fd-4845-8d22-cc9dfdab6a8f
      .content
      .subheading {
      font-size: 10px;
      letter-spacing: 0.04em;
      }
      #shopify-section-template--14940997648449__hero-slideshow
      .slide-1663013886963a0789-1
      .content
      .heading {
      font-size: 10px;
      }
      #shopify-section-template--14940997648449__hero-slideshow
      .slide-1663013886963a0789-1
      .content
      .subheading {
      font-size: 10px;
      letter-spacing: 0.04em;
      }
      `}
        </style>
      </section>

      {/* <!-- HOME MEN AND WOMEN SECTION --> */}
      <div
        id="shopify-section-template--14940997648449__b8493b29-2a29-4e4a-8384-5e9b86c8505a"
        className="shopify-section section section-banners"
      >
        <link
          href="/cdn/shop/t/300/assets/banners.css"
          rel="stylesheet"
          type="text/css"
          media="all"
        />

        <div className="section-banners-container flex flex--no-wrap page-width one-column-mobile two-column">
          <Link
            to="/men"
            className="section-banners__banner block-template--14862236713025__b8493b29-2a29-4e4a-8384-5e9b86c8505a-16733119975d60bd78-0"
          >
            <div className="section-banners__banner-image">
              <img
                loading="lazy"
                src="/cdn/shop/files/Bucket_AW23-Knitwear-1_1.jpg?v=1692126417&amp;width=1440"
                alt=""
                width="1280"
                height="1551.0000000000002"
              />
            </div>

            <div className="section-banners__banner-title font-heading text-center link-styled--reverse">
              MEN'S WEAR
            </div>
          </Link>

          <Link
            to="/women"
            className="section-banners__banner block-template--14862236713025__b8493b29-2a29-4e4a-8384-5e9b86c8505a-16733119975d60bd78-1"
          >
            <div className="section-banners__banner-image">
              <img
                loading="lazy"
                src="/cdn/shop/files/Bucket_AW23-Outerwear-1_1.jpg?v=1692126478&amp;width=1440"
                alt=""
                width="1280"
                height="1551.0000000000002"
              />
            </div>

            <div className="section-banners__banner-title font-heading text-center link-styled--reverse">
              WOMEN'S WEAR
            </div>
          </Link>
        </div>

        <style data-shopify="">
          {`
            #shopify-section-template--14940997648449__b8493b29-2a29-4e4a-8384-5e9b86c8505a .section-banners-container {
                padding-top: 60px;
                padding-bottom: 30px;
            }
    
            @media (max-width: 768px) {
                #shopify-section-template--14940997648449__b8493b29-2a29-4e4a-8384-5e9b86c8505a .section-banners-container {
                    padding-top: 24px;
                    padding-bottom: 24px;
                }
            }
            `}
        </style>
      </div>

      {/* <!--HOME ACCESSORIES SECTION--> */}
      <div
        id="shopify-section-template--14940997648449__be00809f-f542-4620-b77c-44d60b47c88f"
        className="shopify-section section section-banners"
      >
        <link
          href="/cdn/shop/t/300/assets/banners.css"
          rel="stylesheet"
          type="text/css"
          media="all"
        />

        <div className="section-banners-container flex flex--no-wrap page-width one-column-mobile three-column">
          <Link
            style={{ width: "100%", flex: "100%" }}
            to="/accessories"
            className="section-banners__banner block-template--14889059778625__be00809f-f542-4620-b77c-44d60b47c88f-167726370832e9fa78-0"
          >
            <div className="section-banners__banner-image">
              <img
                loading="lazy"
                src="/cdn/shop/collections/PF23_Nav_Banner_Accessories-1.jpg?v=1692297074"
                alt=""
                style={{ objectFit: "cover", width: "100%", height: "300px" }}
              />
            </div>

            <div className="section-banners__banner-title font-heading text-center link-styled--reverse">
              ACCESSORIES
            </div>
          </Link>
        </div>

        <style data-shopify="">
          {`
            #shopify-section-template--14940997648449__be00809f-f542-4620-b77c-44d60b47c88f .section-banners-container {
                padding-top: 30px;
                padding-bottom: 60px;
            }
    
            @media (max-width: 768px) {
                #shopify-section-template--14940997648449__be00809f-f542-4620-b77c-44d60b47c88f .section-banners-container {
                    padding-top: 24px;
                    padding-bottom: 24px;
                }
            }
            `}
        </style>
      </div>

      {/* <!--HOME VIDEO--> */}
      <section
        id="shopify-section-template--14940997648449__47678112-e1bf-47d6-921f-00786203e0e3"
        className="shopify-section section section-video-two"
      >
        <link
          href="/cdn/shop/t/300/assets/video-two.css?v=58203298881343808591689270881"
          rel="stylesheet"
          type="text/css"
          media="all"
        />

        <div className="video-two-container flex flex--mobile aie jcc">
          <Link to="/men" aria-label="Video /cdn/shop/videos/home-video.mp4">
            <video
              className="video-two__video"
              data-mobile-src="/cdn/shop/videos/home-video.mp4"
              src="/cdn/shop/videos/home-video.mp4"
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </Link>
          <div className="video-control-icons playing">
            <span className="play">
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Play slideshow"
              >
                <path
                  d="M0.299805 0.689941V12.3899L11.9998 6.54014L0.299805 0.689941Z"
                  fill="black"
                ></path>
              </svg>
            </span>
            <span className="pause">
              <svg
                className="icon icon--pause-2"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Pause slideshow"
              >
                <g clipPath="url(#clip0_1137_1321)">
                  <rect x="2" width="1.5" height="9" fill="black"></rect>
                  <rect x="5.5" width="1.5" height="9" fill="black"></rect>
                </g>
                <defs>
                  <clipPath id="clip0_1137_1321">
                    <rect width="9" height="9" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
        </div>

        <script>
          {`
            document.addEventListener("DOMContentLoaded", function () {
                if (window.innerWidth < 769) {
                    if (
                        document
                            .querySelector(
                                "#shopify-section-template--14940997648449__47678112-e1bf-47d6-921f-00786203e0e3 .video-control-icons"
                            )
                            .classList.contains("playing")
                    ) {
                        document
                            .querySelector(
                                "#shopify-section-template--14940997648449__47678112-e1bf-47d6-921f-00786203e0e3 .video-control-icons"
                            )
                            .classList.toggle("hidden");
                    }

                    const video = document.querySelector(".video-two__video");

                    if (video.dataset.mobileSrc) {
                        video.src = video.dataset.mobileSrc;
                    }
                }

                document
                    .querySelector(
                        "#shopify-section-template--14940997648449__47678112-e1bf-47d6-921f-00786203e0e3 .video-two__video"
                    )
                    .addEventListener("click", function (ev) {
                        this.closest(".video-two-container")
                            .querySelector(".video-control-icons")
                            .classList.toggle("playing");

                        if (window.innerWidth < 769) {
                            this.closest(".video-two-container")
                                .querySelector(".video-control-icons")
                                .classList.toggle("hidden");
                        }
                    });

                document
                    .querySelector(
                        "#shopify-section-template--14940997648449__47678112-e1bf-47d6-921f-00786203e0e3 .video-control-icons"
                    )
                    .addEventListener("click", function (ev) {
                        this.classList.toggle("playing");

                        var video = this.closest(".video-two-container").querySelector(
                            "video"
                        );

                        if (video.paused) {
                            video.play();
                        } else {
                            video.pause();
                        }

                        if (window.innerWidth < 769) {
                            if (
                                document
                                    .querySelector(
                                        "#shopify-section-template--14940997648449__47678112-e1bf-47d6-921f-00786203e0e3 .video-control-icons"
                                    )
                                    .classList.contains("playing")
                            ) {
                                document
                                    .querySelector(
                                        "#shopify-section-template--14940997648449__47678112-e1bf-47d6-921f-00786203e0e3 .video-control-icons"
                                    )
                                    .classList.toggle("hidden");
                            }
                        }
                    });
            });
            `}
        </script>

        <style data-shopify="">
          {`
            #shopify-section-template--14940997648449__47678112-e1bf-47d6-921f-00786203e0e3 .video-two-container {
                padding-top: 60px;
                padding-bottom: 30px;
            }
    
            @media (max-width: 768px) {
                #shopify-section-template--14940997648449__47678112-e1bf-47d6-921f-00786203e0e3 .video-two-container {
                    padding-top: 0px;
                    padding-bottom: 24px;
                }
            }
    
            #shopify-section-template--14940997648449__47678112-e1bf-47d6-921f-00786203e0e3 .video-two-container .video-control-icons {
                display: none !important;
            }
            `}
        </style>
      </section>

      {/* <!--HOME VIDEO UNDER SECTION--> */}
      <section
        id="shopify-section-template--14940997648449__35d2db41-d5f0-4ff7-b80e-5628c1e715f7"
        className="shopify-section section section--richtext"
      >
        <style data-shopify="">
          {`
            .section--richtext .page-width {
                padding: 0 30px;
            }
    
            .section--richtext h2 {
                margin-bottom: 30px;
            }
    
            #shopify-section-template--14940997648449__35d2db41-d5f0-4ff7-b80e-5628c1e715f7 .section-padding {
                padding-top: 15px;
                padding-bottom: 15px;
            }
    
            @media screen and (min-width: 769px) {
                #shopify-section-template--14940997648449__35d2db41-d5f0-4ff7-b80e-5628c1e715f7 .section-padding {
                    padding-top: 30px;
                    padding-bottom: 30px;
                }
            }
            `}
        </style>
        <div className="section-padding color-schema-1 text-center">
          <div className="page-width content">
            <div className="rte text--large">
              <p>
                <strong>AUTUMN-WINTER 2023</strong>
              </p>
              <p>
                A SPIRIT OF MUSICAL INNOVATION INSPIRES THE ZEYR FINERI
                AUTUMN-WINTER 2023 COLLECTION, ECHOING THIS SEASON'S NARRATIVE
                AND SCENOGRAPHY – MODELS WALKED THE GROOVES OF A VINYL RECORD
                RUNWAY, SOUNDTRACKED BY AN ORIGINAL SOUNDTRACK PERFORMED LIVE BY
                EMINENT PRODUCER DJ PREMIER &amp; THE BADDER BAND.
              </p>
              <p></p>
              <p></p>
            </div>
            <div className="cta-container">
              <Link to="/men" className="btn btn--secondary">
                DISCOVER
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Slider />
      <div className="cta-container flex jcc " style={{ marginTop: "1rem" }}>
        <a href="/all-collections" className="btn btn--tertiary">
          <span className="cta--desktop">Discover</span>
        </a>
      </div>
    </main>
  );
};

export default HomePage;
