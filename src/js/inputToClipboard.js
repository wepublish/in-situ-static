document.addEventListener(
  'DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.copy-input-to-clipboard')
    inputs.forEach((input) => {
      const overlay = input.parentElement.querySelector('.copy-input-overlay')
      overlay.addEventListener('click', (event) => {
        const link = input.dataset.link
        navigator.clipboard.writeText(link)
          .then(() => {
            input.classList.add('fst-italic')
            setTimeout(() => {
              input.classList.remove('fst-italic')
            }, 200)
          })
      })
    })
  })
