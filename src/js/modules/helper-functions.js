import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Function to determine how far an element needs to be positioned in order to get it off the screen
export function getTheOffset(section, element, slideFrom = 'bottom') {
  const elementHeight = element.offsetHeight
  const sectionHeight = section.offsetHeight
  const elementWidth = element.offsetWidth
  const sectionWidth = section.offsetHeight

  if (slideFrom == 'bottom') {
    return (sectionHeight - elementHeight) / 2
  }
  if (slideFrom == 'left' || slideFrom == 'right') {
    return (sectionWidth - elementWidth) / 2
  }
}

// Function to control the sliding of elements
export function slideFromSide(
  section,
  element,
  x,
  y,
  start = 'top top',
  duration = 1
) {
  const timeline = gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: start,
      },
    })
    .from(element, {
      x: x,
      y: y,
      duration: duration,
    })
}

// Function to create the Sliding animations (not the scrolling slider though, that's below this)
export function elementSlide(
  slideFrom,
  section,
  element,
  start = 'top 40%',
  delay = 0,
  duration = 1,
  pin = false
) {
  let theOffset = getTheOffset(section, element, slideFrom)
  let yValStart = 0
  let yValEnd = 0
  let xValStart = 0
  let xValEnd = 0

  if (slideFrom == 'bottom') {
    yValStart = theOffset
    yValEnd = '-' + theOffset * 2 + 'px'
  }
  if (slideFrom == 'left') {
    xValStart = '-' + theOffset + 'px'
    xValEnd = '-' + theOffset + 'px'
  }
  // Animation Timeline
  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        pin: pin,
        start: start,
        scrub: 1,
      },
    })
    .from(element, {
      opacity: 0,
      x: xValStart,
      y: yValStart,
    })
    .to(element, {
      x: xValEnd,
      y: yValEnd,
      delay: delay,
      duration: duration,
      opacity: 0,
    })
}

// Function to create the Scrolling Slider
export function scrollSliderTimeline(section) {
  const sliderAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      // start: '',
      scrub: 1,
    },
  })

  return sliderAnimation
}

// Function to control the individual scroll slides
export function scrollSliderItems(item) {
  const itemSlide = gsap.from(item, {
    y: '100%',
    duration: 1,
  })
  return itemSlide
}
