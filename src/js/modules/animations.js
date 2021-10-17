import { getTheOffset, elementSlide, slideFromSide } from './helper-functions'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function animations() {
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

  // ****************** Animations ******************** //
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
