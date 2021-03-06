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

// Function to measure the natural with and height of the image and return whether it's portrait or landscape
export function imageOrientation(image) {
  const height = image.naturalHeight
  const width = image.naturalWidth
  let orientation = 'landscape'
  if (height > width) {
    orientation = 'portrait'
  }
  return orientation
}

// Function to create the object that holds all of the images and their captions
export function imageObject(imageButtons) {
  let theImages = []
  imageButtons.forEach((button, index) => {
    const img = button.querySelector('img')
    const caption = button.querySelector('figcaption')
    const theAlt = img.alt
    const theStatus = button.dataset.status
    let captionText = ''
    let theOrientation = imageOrientation(img)

    if (typeof caption != 'undefined' && caption != null) {
      captionText = caption.innerText
    }
    theImages.push({
      image: img.src,
      status: theStatus,
      order: index,
      caption: captionText,
      alt: theAlt,
      orientation: theOrientation,
    })
  })
  return theImages
}

// Function to assign all of the various data-attributes and classes to the previous/current/next slides
export function slideStatus(currentSlide, grid = false) {
  // Variables
  let slideList = document.querySelector('.lightbox__items')
  let allSlides = document.querySelectorAll('.lightbox__item')
  if (grid) {
    slideList = document.querySelector('.lightbox__grid')
    allSlides = document.querySelectorAll('.grid__item')
  }
  // Remove the status classes from everything
  allSlides.forEach((item) => {
    item.classList.remove('item--current', 'item--previous', 'item--next')
  })

  // Add the status classes back
  const currentIndex = currentSlide.dataset.order
  currentSlide.classList.add('item--current')
  const number = parseInt(currentIndex)
  let previousIndex = number - 1
  let nextIndex = number + 1

  if (previousIndex < 0) {
    previousIndex = allSlides.length - 1
  }
  if (nextIndex > allSlides.length - 1) {
    nextIndex = 0
  }

  const previousSlide = slideList.querySelector(
    '[data-order="' + previousIndex + '"'
  )
  previousSlide.classList.add('item--previous')

  const nextSlide = slideList.querySelector('[data-order="' + nextIndex + '"')
  nextSlide.classList.add('item--next')
}

// Function to grab the relevent slides at specific times
export function theCurrentSlides() {
  const previousSlide = document.querySelector(
    '.lightbox__items .item--previous'
  )
  const currentSlide = document.querySelector('.lightbox__items .item--current')
  const nextSlide = document.querySelector('.lightbox__items .item--next')
  const previousGridItem = document.querySelector(
    '.lightbox__grid .item--previous'
  )
  const currentGridItem = document.querySelector(
    '.lightbox__grid .item--current'
  )
  const nextGridItem = document.querySelector('.lightbox__grid .item--next')
  const object = {
    previous: previousSlide,
    current: currentSlide,
    next: nextSlide,
    gridPrevious: previousGridItem,
    gridCurrent: currentGridItem,
    gridNext: nextGridItem,
  }

  return object
}
