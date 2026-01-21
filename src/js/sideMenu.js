import { Offcanvas } from 'bootstrap'

export default class SideMenu {
  constructor (options) {
    this.sidebar = options.domElement

    if (!this.sidebar) {
      return
    }

    this.links = []
    this.nextLinks = this.sidebar.querySelectorAll('.link-next')
    this.prevLink = this.sidebar.querySelector('.btn-prev')

    this.level1Link = this.sidebar.querySelectorAll('.link-level-1')

    this.links.push(...this.nextLinks, this.prevLink)

    this.showResults = document.getElementById('showResults')
    this.resetResults = document.getElementById('resetResults')
    this.offcanvas = Offcanvas.getOrCreateInstance(this.sidebar)

    this.mainPanel = this.sidebar.querySelector('.sidebar-panel-opened')
    this.currentPanel = this.mainPanel

    this.addListeners()
  }

  addListeners () {
    if (this.links) {
      // here
      this.links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          let next

          if (link === this.prevLink) {
            next = this.mainPanel
          } else {
            next = this.sidebar.querySelector('#' + e.currentTarget.getAttribute('data-test'))
          }

          this.slideTo(next)
        })
      })
    }

    if (this.showResults) {
      this.showResults.addEventListener('click', (e) => {
        e.preventDefault()
        this.closePanel()
      })
    }

    if (this.resetResults) {
      this.resetResults.addEventListener('click', (e) => {
        e.preventDefault()
        this.closePanel()
      })
    }

    this.level1Link.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        this.slideTo(this.mainPanel)
      })
    })
  }

  closePanel () {
    this.offcanvas.hide()

    setTimeout(() => {
      this.mainPanel.scrollTo(0, 0)

      this.slideTo(this.mainPanel)
    }, '300')
  }

  setLinkOpacity () {
    // enable or disable back link opacity
    if (this.currentPanel === this.mainPanel) {
      this.prevLink.classList.add('invisible')
    } else {
      this.prevLink.classList.remove('invisible')
    }
  }

  slideTo (panel) {
    if (panel === this.currentPanel || panel === null) return

    // setup a special transition to the left for the first level of filters

    if (this.currentPanel === this.mainPanel) {
      this.mainPanel.classList.add('sidebar-panel-parent')
    } else {
      this.mainPanel.classList.remove('sidebar-panel-parent')
    }

    this.currentPanel.classList.remove('sidebar-panel-opened')
    panel.classList.add('sidebar-panel-opened')

    this.currentPanel = panel
    this.setLinkOpacity()
  }
}
