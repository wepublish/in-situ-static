import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'

const masonryInstances = []

window.addEventListener('DOMContentLoaded', (event) => {
  const grids = document.querySelectorAll('.masonry-grid')
  grids.forEach((grid) => {
    const msnry = new Masonry(grid, {
      itemSelector: '.masonry-item',
      percentPosition: true,
      columnWidth: '.masonry-sizer'
    })

    // Store the Masonry instance
    masonryInstances.push(msnry)

    // layout Masonry after each image loads
    const imgLoad = imagesLoaded(grid)
    imgLoad.on('progress', function () {
      msnry.layout()
    })
  })
})

// Export function to refresh all Masonry layouts
export function refreshAllMasonryLayouts () {
  masonryInstances.forEach(msnry => {
    msnry.layout()
  })
}

// Export function to get all instances
export function getMasonryInstances () {
  return masonryInstances
}
