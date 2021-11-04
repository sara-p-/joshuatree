import { getTheOffset, elementSlide, slideFromSide } from './helper-functions'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function animations() {
  // ****************** Variables ******************** //
  // HTML
  const allSections = document.querySelectorAll('.section')
  const theSectionArray = Array.from(allSections)

  // ****************** Section 1 Animations ******************** //
  const section1 = document.querySelector('#section-1')
  const section1Content = section1.querySelectorAll('.animate--title')

  gsap.from(section1Content, {
    duration: 1,
    x: '-100%',
    delay: 0.3,
  })

  // ****************** General Animations ******************** //
  theSectionArray.shift()
  allSections.forEach((section) => {
    const slideFromBottom = section.querySelectorAll(
      '.animate--slide-from-bottom'
    )
    const slideFromLeft = section.querySelectorAll('.animate--slide-from-left')
    const slideFromRight = section.querySelectorAll(
      '.animate--slide-from-right'
    )
    const growFullscreen = section.querySelectorAll('.animate--grow-fullscreen')

    // Slide from Bottom
    slideFromBottom.forEach((element) => {
      const theOffset = getTheOffset(section, element, 'bottom')
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            // pin: true,
            start: 'top top',
            // end: '+=100%',
            // scrub: true,
          },
        })
        .from(element, {
          // opacity: 0,
          y: theOffset,
          duration: 1,
        })
      // .to(element, {
      //   y: '-' + theOffset,
      //   duration: 0.5,
      // })
    })

    // Slide from left
    slideFromLeft.forEach((element) => {
      slideFromSide(section, element, '-100%', 0)
    })

    // Slide from right
    slideFromRight.forEach((element) => {
      slideFromSide(section, element, '100%', 0)
    })

    // Grow to fullscreen
    growFullscreen.forEach((element) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: true,
          },
        })
        .from(element, {
          scale: 0.3,
          duration: 2,
        })
    })
  })
}

// ****************** Lightbox Animations ******************** //
export function slideToCenter(item, duration = 0.5) {
  const t1 = gsap.timeline()
  t1.to(item, {
    x: 0,
    duration: duration,
  })
  return t1
}
export function slideToLeft(item, duration = 0.5) {
  const t1 = gsap.timeline()
  t1.to(item, {
    x: '-100%',
    duration: duration,
  })
  return t1
}
export function slideToRight(item, duration = 0.5) {
  const t1 = gsap.timeline()
  t1.to(item, {
    x: '100%',
    duration: duration,
  })
  return t1
}

// Function to move all of the slides left and place the current image in the center
export function moveTheSlidesLeft(item, index, currentSlide) {
  if (index < currentSlide.dataset.order) {
    slideToCenter(item)
    slideToLeft(item)
  }
  if (index == currentSlide.dataset.order) {
    slideToCenter(item)
  }
}
// Function to move all of the slides left or right and place the current image in the center
export function moveTheSlides(slide, index, currentSlide) {
  const allSlides = document.querySelectorAll(
    '.lightbox__items .lightbox__item'
  )
  if (index < currentSlide.dataset.order) {
    slideToCenter(slide)
    slideToRight(slide)
  }
  if (index > currentSlide.dataset.order) {
    slideToCenter(slide)
    slideToLeft(slide)
  }
  if (index == slide.dataset.order) {
    slideToCenter(slide)
  }
}

// ****************** Lightbox Navigation ******************** //
export const navTimeline = gsap.timeline({ paused: true })
export function moveLightboxNav(button, nav) {
  navTimeline
    .to(nav, {
      y: 0,
      duration: 0.5,
    })
    .to(
      button,
      {
        y: 0,
        duration: 0.5,
      },
      '-=0.3'
    )
    .reverse()
}
