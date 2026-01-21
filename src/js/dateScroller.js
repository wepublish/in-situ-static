import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'
gsap.registerPlugin(ScrollTrigger)

export default class DateScroller {
  constructor () {
    this.filters = document.querySelector('.filter-fixed-wrapper')
    this.scrollZone = document.querySelector('.scroll-zone')

    if (!this.filters || !this.scrollZone) {
      return
    }

    this.eventsElements = document.querySelectorAll('.eventslist-month-container')
    this.dateContainer = document.querySelector('.filter-sticky-dates-container')
    // this.yearContainer = document.getElementById('event-year')
    this.monthContainer = document.getElementById('event-month')
    this.init()
  }

  init () {
    this.eventsElements.forEach((el, index) => {
      this.scroller = ScrollTrigger.create({
        trigger: el,
        start: '-=100px',
        end: 'bottom-=100',
        markers: false,
        onToggle: () => this.changeMonth(el),
        onLeaveBack: () => this.removeMonth()
      })
    })

    /*
    document.addEventListener('scroll', (e) => {
      window.requestAnimationFrame(() => {
        this.scrollDetect()
      })
    }) */

    this.scrollRefresh()
  }

  /*
  scrollDetect () {
    const tigger = this.scrollZone.offsetTop
    if (window.scrollY >= tigger) {
      this.filters.classList.add('sticky')
    } else {
      this.filters.classList.remove('sticky')
    }
  } */

  scrollRefresh () {
    // console.log('this scroller : ' + this.scroller)
    this.scroller.refresh()
  }

  changeMonth (zone) {
    const month = zone.dataset.month
    // const year = zone.dataset.year
    this.monthContainer.innerHTML = month
    // this.yearContainer.innerHTML = year

    // gsap.to(this.dateContainer, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    this.filters.classList.add('show')
    document.body.classList.add('filters-displayed')
  }

  removeMonth () {
    // this.monthContainer.innerHTML = ''
    // this.yearContainer.innerHTML = ''
    // gsap.to(this.dateContainer, { opacity: 0, duration: 0.25, ease: 'power2.out' })
    this.filters.classList.remove('show')
    document.body.classList.remove('filters-displayed')
  }
}
/*
document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelector('.filter-sticky-wrapper')
  const scrollZone = document.querySelector('.scroll-zone')
  const events = document.querySelectorAll('.eventslist-month-container')

  const yearContainer = document.getElementById('event-year')
  const monthContainer = document.getElementById('event-month')
  const dateContainer = document.querySelector('.filter-sticky-dates-container')

  function scrollDetect () {
    const tigger = scrollZone.offsetTop
    if (window.pageYOffset >= tigger) {
      filters.classList.add('sticky')
    } else {
      filters.classList.remove('sticky')
    }
  }

  function changeMonth (zone) {
    const month = zone.dataset.month
    const year = zone.dataset.year
    monthContainer.innerHTML = month
    yearContainer.innerHTML = year

    gsap.to(dateContainer, { opacity: 1, duration: 0.25, ease: 'power2.out' })
  }

  function removeMonth () {
    monthContainer.innerHTML = ''
    yearContainer.innerHTML = ''
    gsap.to(dateContainer, { opacity: 0, duration: 0.25, ease: 'power2.out' })
  }

  if (filters && scrollZone) {
    window.onscroll = function () { scrollDetect() }
  }
  if (events) {
    events.forEach((el, index) => {
      ScrollTrigger.create({
        trigger: el,
        start: '-=100px',
        end: 'bottom-=100',
        markers: false,
        onToggle: () => changeMonth(el),
        onLeaveBack: () => removeMonth()
      })
    })
  }
})
*/
/*
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'
gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelector('.filter-sticky-wrapper')
  const scrollZone = document.querySelector('.scroll-zone')
  const events = document.querySelectorAll('.eventslist-month-container')

  const yearContainer = document.getElementById('event-year')
  const monthContainer = document.getElementById('event-month')
  const dateContainer = document.querySelector('.filter-sticky-dates-container')

  function scrollDetect () {
    const tigger = scrollZone.offsetTop
    if (window.pageYOffset >= tigger) {
      filters.classList.add('sticky')
    } else {
      filters.classList.remove('sticky')
    }
  }

  function changeMonth (zone) {
    const month = zone.dataset.month
    const year = zone.dataset.year
    monthContainer.innerHTML = month
    yearContainer.innerHTML = year

    gsap.to(dateContainer, { opacity: 1, duration: 0.25, ease: 'power2.out' })
  }

  function removeMonth () {
    monthContainer.innerHTML = ''
    yearContainer.innerHTML = ''
    gsap.to(dateContainer, { opacity: 0, duration: 0.25, ease: 'power2.out' })
  }

  if (filters && scrollZone) {
    window.onscroll = function () { scrollDetect() }
  }
  if (events) {
    events.forEach((el, index) => {
      ScrollTrigger.create({
        trigger: el,
        start: '-=100px',
        end: 'bottom-=100',
        markers: false,
        onToggle: () => changeMonth(el),
        onLeaveBack: () => removeMonth()
      })
    })
  }
})

 */
