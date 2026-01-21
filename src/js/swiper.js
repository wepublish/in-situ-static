// core version + navigation, pagination modules:
import Swiper, { Navigation, EffectFade } from 'swiper'

document.addEventListener('DOMContentLoaded', function () {
  // eslint-disable-next-line
  new Swiper('.events-reader-gallery-swiper', {
    modules: [Navigation, EffectFade],
    autoHeight: false,
    loop: true,
    speed: 500,
    spaceBetween: 0,
    effect: 'fade',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }/*,
    breakpoints: {
      992: {
        autoHeight: false,
        speed: 2000
      }
    } */
  })
})
