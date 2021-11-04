import MicroModal from 'micromodal'
import { gsap } from 'gsap'
import { imageObject, slideStatus, theCurrentSlides } from './helper-functions'
import { createLightboxItems, createLightboxNavItems } from './html-components'
import {
  slideToCenter,
  slideToLeft,
  slideToRight,
  moveTheSlidesLeft,
  moveTheSlides,
  navTimeline,
  moveLightboxNav,
} from './animations'

export default function lightbox() {
  MicroModal.init()
  // ******************* Variables ******************* //
  const modal = document.querySelector('#modal-1')
  const imageLinks = document.querySelectorAll('section button.image__link')
  const modalClose = document.querySelector('button.modal__close')
  const lightboxItems = document.querySelector('.lightbox__items')
  const prev = document.querySelector('.lightbox__button--prev')
  const next = document.querySelector('.lightbox__button--next')
  const lightboxNav = document.querySelector('.lightbox__nav')
  const lightboxGrid = document.querySelector('.lightbox__grid')
  const navButton = document.querySelector('#lightbox__nav-button')

  // ******************* On click of an image, do many things ******************* //
  imageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      // Set the clicked image as the 'current' image
      link.setAttribute('data-status', 'current')

      // Create the image object
      const allImages = imageObject(imageLinks)

      // Create the lightbox and the lightbox nav
      allImages.forEach((image) => {
        const item = createLightboxItems(image)
        lightboxItems.append(item)
        gsap.set(item, {
          x: '100%',
        })
        const navItem = createLightboxNavItems(image)
        lightboxGrid.append(navItem)
        gsap.set(lightboxNav, {
          y: '100%',
        })
      })
      // Grab all the slides, and set the various classes and data-attributes to define their location
      const allItems = document.querySelectorAll('.lightbox__item')
      const currentSlide = document.querySelector(
        '.lightbox__items .item--current'
      )
      const currentGridSlide = document.querySelector(
        '.lightbox__grid .item--current'
      )
      slideStatus(currentSlide)
      slideStatus(currentGridSlide, true)

      // Animate the slides until the selected slide is shown
      allItems.forEach((item, index) => {
        moveTheSlidesLeft(item, index, currentSlide)
      })

      // Open the modal
      MicroModal.show('modal-1')

      // ******************* On click of nav slide, change the current slide ******************* //
      const gridItems = document.querySelectorAll('.lightbox__grid .grid__item')
      console.log(gridItems)
      gridItems.forEach((item) => {
        item.addEventListener('click', (e) => {
          const currentSlide = document.querySelector(
            '.lightbox__items .item--current'
          )
          const allSlides = document.querySelectorAll(
            '.lightbox__items .lightbox__item'
          )
          const order = item.dataset.order
          const matchingSlide = document.querySelector(
            '.lightbox__items [data-order="' + order + '"]'
          )
          console.log(order)
          slideStatus(matchingSlide)
          slideStatus(item, true)

          allSlides.forEach((slide) => {
            moveTheSlides(slide, order, currentSlide)
          })
        })
      })
    })
  })
  // Close the modal and destroy all the items
  modalClose.addEventListener('click', (e) => {
    const allItems = document.querySelectorAll('.lightbox__item')
    const allGridItems = document.querySelectorAll('.lightbox__nav .grid__item')
    const imageStatusCurrent = document.querySelectorAll(
      '[data-status="current"]'
    )
    // close the modal
    MicroModal.close('modal-1')
    // remove the data-status of the original image that was clicked (to open the lightbox)
    imageStatusCurrent.forEach((status) => {
      status.setAttribute('data-status', '')
    })
    // delete all of the lightbox slides
    allItems.forEach((item) => {
      item.remove()
    })
    // delete all of the lightbox nav items
    allGridItems.forEach((item) => {
      item.remove()
    })
  })

  // ******************* On click of prev/next buttons, change the images ******************* //
  prev.addEventListener('click', (e) => {
    const slides = theCurrentSlides()
    slideToRight(slides.current)
    slideToCenter(slides.previous)

    slideStatus(slides.previous)
    slideStatus(slides.gridPrevious, true)
  })
  next.addEventListener('click', (e) => {
    const slides = theCurrentSlides()
    slideToLeft(slides.current)
    slideToCenter(slides.next)

    slideStatus(slides.next)
    slideStatus(slides.gridNext, true)
  })

  // ******************* On click of nav button, bring up the nav ******************* //
  moveLightboxNav(navButton, lightboxNav)
  navButton.addEventListener('click', (e) => {
    navTimeline.reversed(!navTimeline.reversed())
    navButton.classList.toggle('active')
  })
}
