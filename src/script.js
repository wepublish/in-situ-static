// eslint-disable-next-line
import * as React from 'react'
import ReactDOM from 'react-dom/client'

import './js/bootstrap'
import './js/scroll'
import './js/swiper'
import './js/choices'
import './js/masonry'
import './js/switchEventMultiDays'
// import './js/sidenav'
import './js/mapResults'
import './js/modalResize'
import './js/inputToClipboard'
import LayoutSelector from './js/layoutSelector'

import SideMenu from './js/sideMenu'
// eslint-disable-next-line no-unused-vars
import DatePickerFilter from './js/DatePickerFilter'
import Intro from './js/intro'

// Init React DatePickerApp
// Si besoin déplacer
const renderDatePickerApp = (el) => {
  const root = ReactDOM.createRoot(el)
  root.render(
    <DatePickerFilter />
  )
}

(() => {
  const el = document.getElementById('datepicker-filter')
  if (el !== null) renderDatePickerApp(el)
})()

// eslint-disable-next-line
new SideMenu({
  domElement: document.getElementById('offcanvasPanel')
})

// eslint-disable-next-line
new LayoutSelector({
  domElement: document.getElementById('layoutSelector')
})

// eslint-disable-next-line
/*
new DragBlock({
  domElement: document.querySelector('.block-draggable-container')
})*/

// eslint-disable-next-line
new Intro({
  domElement: document.getElementById('introContainer')
  // dom: document.getElementById('container')
})

// eslint-disable-next-line
/*
new Intro({
  dom: document.getElementById('container')
})*/

// eslint-disable-next-line
// new DateScroller()
