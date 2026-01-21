import { Modal } from 'bootstrap'
import DateScroller from './dateScroller'
import { refreshAllMasonryLayouts } from './masonry'

const dateScroller = new DateScroller()

// const resultsEl = document.getElementById('exampleModal')
// const modal = Modal.getOrCreateInstance(resultsEl)

export default class LayoutSelector {
  constructor (options) {
    this.resultsEl = null
    this.results = null
    this.layoutSelector = options.domElement

    if (this.layoutSelector === null) {
      return
    }

    this.origin = this.layoutSelector.dataset.origin

    this.defaultLayout = this.origin === 'agenda' ? 'images' : 'mixed'
    this.defaultMobileLayout = this.origin === 'agenda' ? 'images' : 'list'

    this.resultsEl = document.getElementById('mapResultsModal')
    if (this.resultsEl) this.results = Modal.getOrCreateInstance(this.resultsEl)

    this.mobileStep = window.matchMedia('(max-width: 991px)')

    this.throttleTimer = false

    this.switchers = this.layoutSelector.querySelectorAll('.layout-selector-link')

    this.currentLayout = this.defaultLayout
    this.currentLink = null
    this.previousLayout = null
    this.previousLink = null

    this.eventsElements = document.querySelectorAll('.eventslist-month-container')

    this.init()
  }

  init () {
    if (this.switchers != null) {
      this.switchers.forEach(link => {
        // const targetLayout = ('layout-' + link.getAttribute('data-layout'))
        const linkLayout = link.getAttribute('data-layout')

        if (this.currentLayout === linkLayout) {
          link.classList.add('active')
          /* this.currentLink = link
          this.previousLink = link
          this.previousLayout = this.currentLayout */
        }

        link.addEventListener('click', (e) => {
          e.preventDefault()
          // this.currentLink = link
          // this.currentLayout = linkLayout
          this.switchLayout(linkLayout)
        })
      })
      // window.addEventListener('resize', this.handleMobileChange)
      // window.addEventListener('resize', this.handleMobile)
      window.addEventListener('resize', () => {
        this.throttle(this.handleMobileChange.bind(this), 250)
        // this.handleMobileChange()
      })

      if (this.origin === 'agenda') {
        if (sessionStorage.getItem('agendaLayout')) {
          this.currentLayout = sessionStorage.getItem('agendaLayout')
        }
      }

      if (this.origin === 'index') {
        if (sessionStorage.getItem('indexLayout')) {
          this.currentLayout = sessionStorage.getItem('indexLayout')
        }
      }

      this.switchLayout(this.currentLayout)
      this.handleMobileChange()
    }

    this.layoutSelector.classList.add('loaded')
  }

  switchLayout (layout) {
    this.currentLink = this.layoutSelector.querySelector('[data-layout="' + layout + '"]')
    if (!this.currentLink) return
    this.currentLayout = layout

    //
    // if (this.previousLink != null) {
    // this.previousLink.classList.remove('active')
    // }
    //* ** new *****//
    this.switchers.forEach((el) => {
      el.classList.remove('active')
    })
    //* ** new *****//

    this.currentLink.classList.add('active')

    if (this.previousLayout != null) {
      const previousLayoutClass = 'layout-' + this.previousLayout
      this.layoutSelector.classList.remove(previousLayoutClass)
      document.body.classList.remove(previousLayoutClass)
    }

    if (this.currentLayout != null) {
      const currentLayoutClass = 'layout-' + this.currentLayout
      this.layoutSelector.classList.add(currentLayoutClass)
      document.body.classList.add(currentLayoutClass)

      /*
      if (this.origin === 'agenda') {
        sessionStorage.setItem('agendaLayout', this.currentLayout)
      }

      if (this.origin === 'index') {
        sessionStorage.setItem('indexLayout', this.currentLayout)
      } */

      this.setSessionStorage(this.currentLayout)
    }
    /*
    if (this.currentLayout === 'map') {
      window.scrollTo(0, 0)
      console.log('layout map')
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    } */

    this.previousLink = this.currentLink
    this.previousLayout = this.currentLayout

    // console.log(this.currentLayout)

    if (this.currentLayout === 'list' || this.currentLayout === 'images') {
      this.results && this.results.hide()
    }

    this.refreshMasonry()

    if (this.eventsElements.length !== 0) {
      dateScroller.scrollRefresh()
    }
  }

  refreshMasonry () {
    // Use a small delay to allow CSS transitions to complete
    setTimeout(() => {
      refreshAllMasonryLayouts()
    }, 50)
  }

  setSessionStorage (layout) {
    if (this.origin === 'agenda') {
      sessionStorage.setItem('agendaLayout', layout)
    }

    if (this.origin === 'index') {
      sessionStorage.setItem('indexLayout', layout)
    }
  }

  handleMobileChange () {
    const mixedLink = this.layoutSelector.querySelector('[data-layout="mixed"]')
    if (!mixedLink) return

    if (this.origin === 'agenda') {
      const listLink = this.layoutSelector.querySelector('[data-layout="list"]')
      if (!listLink) return

      if (this.mobileStep.matches) {
        if (this.currentLayout === 'mixed') {
          this.switchLayout('list')
          this.setSessionStorage('list')
        }
        listLink.classList.remove('d-none')
        mixedLink.classList.add('d-none')
      } else {
        if (this.currentLayout === 'list') {
          this.switchLayout('mixed')
          this.setSessionStorage('mixed')
        }
        mixedLink.classList.remove('d-none')
        listLink.classList.add('d-none')
      }
      return
    }

    if (this.mobileStep.matches) {
      if (this.currentLayout === 'mixed') {
        this.switchLayout(this.defaultMobileLayout)// list

        this.setSessionStorage(this.defaultMobileLayout)
        /*
        if (this.origin === 'agenda') {
          sessionStorage.setItem('agendaLayout', this.defaultMobileLayout)
        }

        if (this.origin === 'index') {
          sessionStorage.setItem('indexLayout', this.defaultMobileLayout)
        }

        */
      }
      mixedLink.classList.add('d-none')
    } else {
      mixedLink.classList.remove('d-none')
    }
  }

  throttle (callback, time) {
    if (this.throttleTimer) return

    this.throttleTimer = true
    setTimeout(() => {
      callback()
      this.throttleTimer = false
    }, time)
  }
}
