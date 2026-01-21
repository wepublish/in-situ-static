import gsap from 'gsap'

gsap.config({
  nullTargetWarn: false
})

let allowAnimCLick = true

export default class intro {
  constructor (options) {
    this.introContainer = options.domElement

    if (!this.introContainer) {
      return
    }

    this.isMobile = false
    this.mobileStep = window.matchMedia('(max-width: 991px)')

    this.currentCircle = 0
    this.currentAnimStep = 1

    const offset = 30

    this.autoMode = true

    this.width = this.introContainer.offsetWidth
    this.height = this.introContainer.offsetHeight

    this.windowHalfWidth = window.innerWidth * 0.5
    this.windowHalfHeight = window.innerHeight * 0.5

    this.circlesRadius = (Math.sqrt((this.width * this.width) + (this.height * this.height))) + offset
    this.circlesRadiusPercent = (this.circlesRadius / this.width) * 100

    // this.tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5, yoyo: false, force3D: true, repeatRefresh: true, delay: 3 })

    // this.resizeTimer = null

    this.colorsList = ['#FFAAFF', '#FF4D00', '#93B37F', '#1983FF', '#FFDF00', '#75FB70', '#863D15', '#01646A']

    this.colors = this.colorsList.sort(function () {
      return Math.random() - 0.5
    })

    this.circles = new Map()

    this.circles.set(0)
    this.circles.set(1)
    this.circles.set(2)
    this.circles.set(3)
    this.circles.set(4)
    this.circles.set(5)
    this.circles.set(6)
    this.circles.set(7)

    // console.log(this.circles.size)

    this.circlesWrapper = this.introContainer.querySelector('.intro-circles-wrapper')

    // this.textWrapper = this.introContainer.querySelector('.intro-text-wrapper')
    const introSteps = this.introContainer.querySelectorAll('.intro-step')
    this.steps = []
    this.currentStep = 1

    introSteps.forEach((el) => {
      this.steps.push(el)
    })

    this.introTitle = this.introContainer.querySelector('.intro-title')
    this.titleBounding = this.introTitle.getBoundingClientRect()
    this.titleW = this.titleBounding.width
    this.titleH = this.titleBounding.height

    this.init()
  }

  init () {
    window.setInterval(function () {
      // call your function here
      allowAnimCLick = true
      // console.log(this.allowAnimCLick)
    }, 500)

    window.addEventListener('resize', () => {
      this.throttle(this.handleResize.bind(this), 250)
    })

    this.handleResize()

    /*
    window.addEventListener('resize', () => {
      // clearTimeOut() resets the setTimeOut() timer due to this the function in setTimeout() is fired after we are done resizing
      clearTimeout(this.resizeTimer)

      // setTimeout returns the numeric ID which is used by clearTimeOut to reset the timer
      this.resizeTimer = setTimeout(this.handleResize.bind(this), 500)
    }) */

    document.body.addEventListener('click', () => {
      this.handleClick()
    })

    // this.mouseMovement()
    this.createCircles()
    this.animateCircles()
  }

  createCircles () {
    for (const [key, value] of this.circles.entries()) {
      const circle = document.createElement('div')
      // const bg = value.background
      // const blur = value.blur
      circle.className = 'intro-circle'
      // circle.style.backgroundColor = bg
      // circle.style.filter = 'blur(' + blur + ')'
      this.circlesWrapper.appendChild(circle)

      const test = { ...value, element: circle }
      this.circles.set(key, test)
    }

    this.randomizeCircles()
  }

  getTitlePos () {
    this.titleBounding = this.introTitle.getBoundingClientRect()
    this.titleW = this.titleBounding.width
    this.titleH = this.titleBounding.height
    this.titleX = this.titleBounding.left + (this.titleW * 0.5)
    this.titleX = this.titleBounding.top + (this.titleH * 0.5)
  }

  randomizeCircles () {
    this.currentAnimStep = 1
    console.log('biiiiip')

    this.colors = this.colorsList.sort(function () {
      return Math.random() - 0.5
    })

    // eslint-disable-next-line
    for (const [key, value] of this.circles.entries()) {
      const el = value.element
      el.style.backgroundColor = this.colors[key]
    }
  }

  animateCircles () {
    setTimeout(() => {
      if (this.autoMode) {
        this.playNext()
      }
    }, 3000)
  }

  playNext () {
    if (allowAnimCLick === true && this.currentAnimStep <= ((this.circles.size * 2))) {
      allowAnimCLick = false
      let maxBlur
      this.isMobile ? maxBlur = 90 : maxBlur = 200

      if (this.currentAnimStep === 3 || this.currentAnimStep === 5 || this.currentAnimStep === 10 || this.currentAnimStep === 14) {
        this.isMobile ? maxBlur = 5 : maxBlur = 20
      }

      // console.log('max blur : ' + maxBlur)

      if (this.currentAnimStep <= this.circles.size) {
        const el = this.circles.get(this.currentCircle).element
        if (el !== null) {
          const d = gsap.utils.random(3, 4, 0.1)

          if (this.currentAnimStep === this.circles.size && this.autoMode) {
            gsap.fromTo(el, { width: 0, filter: 'blur(' + gsap.utils.random(2, maxBlur, 1) + 'px)' }, { width: this.circlesRadiusPercent + '%', filter: 'blur(0px)', duration: d, ease: 'power4.out', onComplete: () => this.playNext() })
            // gsap.fromTo(el, { scale: 0, filter: 'blur(' + gsap.utils.random(2, maxBlur, 1) + 'px)' }, { scale: 1, filter: 'blur(0px)', duration: d, ease: 'power4.out', onComplete: () => this.playNext() })
          } else {
            gsap.fromTo(el, { width: 0, filter: 'blur(' + gsap.utils.random(2, maxBlur, 1) + 'px)' }, { width: this.circlesRadiusPercent + '%', filter: 'blur(0px)', duration: d, ease: 'power4.out' })
            // gsap.fromTo(el, { scale: 0, filter: 'blur(' + gsap.utils.random(2, maxBlur, 1) + 'px)' }, { scale: 1, filter: 'blur(0px)', duration: d, ease: 'power4.out' })
          }

          this.currentAnimStep++
          this.currentCircle = Math.min(this.currentCircle + 1, this.circles.size)
        }
      } else {
        // console.log(this.currentCircle)
        const el = this.circles.get(this.currentCircle - 1).element
        if (el !== null) {
          // const d = Math.max(0.5, (Math.pow(this.currentCircle, 1.15)) * 0.45)
          const d = Math.max(0.5, Math.pow(this.currentCircle, 0.65))

          if (this.currentAnimStep < ((this.circles.size * 2))) {
            gsap.to(el, {
              width: '0',
              filter: 'blur(' + gsap.utils.random(2, maxBlur, 1) + 'px)',
              duration: d,
              ease: 'power4.out'
            })
            // gsap.to(el, { scale: 0, filter: 'blur(' + gsap.utils.random(2, maxBlur, 1) + 'px)', duration: d, ease: 'power4.out' })
          } else {
            gsap.to(el, {
              width: '0',
              filter: 'blur(' + gsap.utils.random(2, maxBlur, 1) + 'px)',
              duration: d,
              ease: 'power4.out',
              onComplete: () => this.randomizeCircles()
            })
          }

          this.currentAnimStep++
          this.currentCircle--

          if (this.currentAnimStep > ((this.circles.size * 2))) {
            // this.currentAnimStep = 1
            // this.randomizeCircles()
          }
        }
      }
    }

    if ((this.currentAnimStep !== this.circles.size + 1 && this.autoMode) || (!this.autoMode)) {
      let timer

      if (this.autoMode) {
        if (this.currentAnimStep <= this.circles.size) {
          timer = gsap.utils.random(0.5, 1.5, 0.1) * 1000
        } else {
          // timer = Math.max(0.5, (Math.pow(this.currentCircle, 1.15)) * 0.45)
          timer = Math.max(0.5, Math.pow(this.currentCircle, 0.65))
        }
      } else {
        timer = gsap.utils.random(2, 5, 1) * 1000
        // timer = 5000
      }

      this.timer = setTimeout(() => {
        this.playNext()
      }, timer)
    }
  }

  mouseMovement () {
    window.addEventListener('mousemove', (event) => {
      const mouseX = event.clientX
      const mouseY = event.clientY

      // const angle = Math.atan2(mouseY - this.titleY, mouseX - this.titleX)
      const radians = Math.atan2(mouseX - this.windowHalfWidth, mouseY - this.windowHalfHeight)
      const degrees = (radians * (180 / Math.PI) * -1) + 360 + '_short'

      if (!this.isMobile) {
        gsap.to(this.introTitle, {
          rotateZ: degrees,
          duration: 0.75,
          pointerEvents: 'none'// .3,
        })
      } else {
        gsap.set(this.introTitle, { rotateZ: 0 })
      }

      // console.log(degrees)
    }, false)
  }

  switchStep () {
    // this.textWrapper.innerHTML = 'Aller à l’agenda'
    const current = this.steps[this.currentStep]
    if (this.current !== null) {
      if (this.currentStep < (this.steps.length)) {
        this.steps.forEach((el) => {
          el.classList.remove('active')
        })
        current.classList.add('active')
      } else {
        // window.location.replace('index.html')
      }

      this.currentStep++
    }
  }

  handleClick () {
    this.autoMode = false

    if (!this.autoMode) {
      clearTimeout(this.timer)
    }
    this.playNext()
    this.switchStep()

    // this.tlQuick = !this.tlQuick
    // this.tlQuick ? this.tl.timeScale(1.5) : this.tl.timeScale(1)
  }

  handleResize () {
    this.width = this.introContainer.offsetWidth
    this.height = this.introContainer.offsetHeight

    this.windowHalfWidth = window.innerWidth * 0.5
    this.windowHalfHeight = window.innerHeight * 0.5

    this.circlesRadius = (Math.sqrt((this.width * this.width) + (this.height * this.height)))
    this.circlesRadiusPercent = (this.circlesRadius / this.width) * 100

    this.mobileStep.matches ? this.isMobile = true : this.isMobile = false
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
