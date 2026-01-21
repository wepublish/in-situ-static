/* eslint-disable */
import 'intersection-observer'
let modalIsOpened = false
const myModalEl = document.getElementById('mapResultsModal')

if (myModalEl !== null) {
  /*
  const closeTopWrapper = myModalEl.querySelector('.close-wrapper-top')
  const closeBottomWrapper = myModalEl.querySelector('.close-wrapper-bottom')
  const observer = new IntersectionObserver(handleIntersection)
  observer.observe(closeTopWrapper)

  function handleIntersection (entries) {
    entries.map((entry) => {
      if (modalIsOpened) {
        if (entry.isIntersecting) {
          closeBottomWrapper.classList.remove('active')
        } else {
          closeBottomWrapper.classList.add('active')
        }
      }
    })
  }*/

  myModalEl.addEventListener('show.bs.modal', event => {
    modalIsOpened = true
    document.body.classList.add('map-results-opened')
  })

  myModalEl.addEventListener('hidden.bs.modal', event => {
    modalIsOpened = false
    document.body.classList.remove('map-results-opened')
  })
}
