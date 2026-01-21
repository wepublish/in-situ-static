import { Tooltip } from 'bootstrap'
const offcanvasMobile = document.querySelector('.offcanvas-mobile')

document.addEventListener(
  'DOMContentLoaded', () => {
    if (offcanvasMobile !== null) {
      offcanvasMobile.addEventListener('show.bs.offcanvas', function () {
        document.body.classList.add('nav-opening')
      })

      offcanvasMobile.addEventListener('shown.bs.offcanvas', function () {
        document.body.classList.add('has-nav-open')
      })

      offcanvasMobile.addEventListener('hide.bs.offcanvas', function () {
        document.body.classList.remove('has-nav-open')
      })

      offcanvasMobile.addEventListener('hidden.bs.offcanvas', function () {
        document.body.classList.remove('nav-opening')
      })
    }

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // eslint-disable-next-line
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl)
    })
  })
