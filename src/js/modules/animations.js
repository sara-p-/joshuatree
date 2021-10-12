import { getTheOffset, elementSlide } from './helper-functions'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function animations() {
  // ****************** Variables ******************** //
  // HTML
  const allSections = document.querySelectorAll('.section')
  const theSectionArray = Array.from(allSections)
  const fadeIn = document.querySelectorAll('.animate--fade-in')

  // ****************** Section 1 Animations ******************** //
  const section1 = document.querySelector('#section-1')
  const section1Content = section1.querySelectorAll('.animate--title')

  gsap.from(section1Content, {
    duration: 1,
    x: '-100%',
    delay: 0.3,
  })

  // ****************** Sliding Animations ******************** //
  theSectionArray.shift()
  theSectionArray.forEach((section) => {
    const slideFromBottom = section.querySelectorAll(
      '.animate--slide-from-bottom'
    )
    const slideFromBottomSlow = section.querySelectorAll(
      '.animate--slide-from-bottom-slow'
    )
    const slideFromLeft = section.querySelectorAll('.animate--slide-from-left')
    const slideFromRight = section.querySelectorAll(
      '.animate--slide-from-right'
    )

    // Slide from Bottom
    slideFromBottom.forEach((element) => {
      const theOffset = getTheOffset(section, element, 'bottom')
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top 120px',
            end: '+=300',
            // scrub: 1,
          },
        })
        .from(element, {
          opacity: 0,
          y: theOffset,
          duration: 1,
        })
    })

    // Slide from left
    slideFromLeft.forEach((element) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 40%',
          },
        })
        .from(element, {
          x: '-100%',
        })
    })
  })
}
