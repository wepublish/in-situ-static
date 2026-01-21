function truncateInputText (input) {
  const maxWidth = input.clientWidth - 70 // Adjust for padding
  const ctx = document.createElement('canvas').getContext('2d')
  ctx.font = getComputedStyle(input).font // Get input font style

  const originalValue = input.dataset.link
  let text = originalValue
  while (ctx.measureText(text).width > maxWidth) {
    text = text.slice(0, -1) // Remove last character
  }

  if (text.length < originalValue.length) {
    input.value = text + '...' // Append ellipsis
  }
}

document.addEventListener(
  'DOMContentLoaded', () => {
    // inputs in modal to resize
    const ellipsisInputs = document.querySelectorAll('.ellipsis-input')
    ellipsisInputs.forEach((ellipsisInput) => {
      const relatedModal = ellipsisInput.closest('.modal')
      if (relatedModal) {
        // Define a named function for resize handling
        function handleResize () {
          truncateInputText(ellipsisInput)
        }

        relatedModal.addEventListener('shown.bs.modal', () => {
          truncateInputText(ellipsisInput) // Apply truncation on modal open
          window.addEventListener('resize', handleResize) // Handle resize
          ellipsisInput.handleResize = handleResize // Store function reference
        })
        relatedModal.addEventListener('hidden.bs.modal', () => {
          if (ellipsisInput.handleResize) {
            window.removeEventListener('resize', ellipsisInput.handleResize) // remove listener
          }
        })
      }
    })
  })
