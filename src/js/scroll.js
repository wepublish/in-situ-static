
let lastKnownScrollPosition = 0
let ticking = false

function doSomething (scrollPos) {
  if (scrollPos > 5) {
    document.body.classList.add('scrolled')
  } else {
    document.body.classList.remove('scrolled')
  }
}

document.addEventListener('scroll', (event) => {
  lastKnownScrollPosition = window.scrollY

  if (!ticking) {
    window.requestAnimationFrame(() => {
      doSomething(lastKnownScrollPosition)
      ticking = false
    })

    ticking = true
  }
})
