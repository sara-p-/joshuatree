import MicroModal from 'micromodal'
import { gsap } from 'gsap'
import { imageObject, slideStatus } from './helper-functions'
import { createLightboxItems } from './html-components'
import { slideToCenter, slideToLeft, slideToRight } from './animations'

export default function lightbox() {
  MicroModal.init()
  // ******************* Variables ******************* //
  const modal = document.querySelector('#modal-1')
  const imageLinks = document.querySelectorAll('button.image__link')
  const modalClose = document.querySelector('button.modal__close')
  const lightboxItems = document.querySelector('.lightbox__items')
  const prev = document.querySelector('.lightbox__button--prev')
  const next = document.querySelector('.lightbox__button--next')

  // Click on image
  // Assign active to that image - data attribute
  // Create array and lightbox
  // animate lightbox to get to the correct image
  // On close remove array

  // ******************* On click of an image, do many things ******************* //
  imageLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      // Set the clicked image as the 'current' image
      link.setAttribute('data-status', 'current')
      // Create the image array
      const allImages = imageObject(imageLinks)
      // Create the lightbox
      allImages.forEach((image, theIndex) => {
        const item = createLightboxItems(image)
        lightboxItems.append(item)
      })
      // Grab all the slides, and set the various classes and data-attributes to define their location
      const currentSlide = document.querySelector('.item__current')
      const allItems = document.querySelectorAll('.lightbox__item')
      slideStatus(allItems, currentSlide)

      // Animate the slides until the selected slide is shown

      allItems.forEach((item, index) => {
        if (index <= currentSlide.dataset.order) {
          slideToCenter(item)
          slideToLeft(item)
        }
      })

      // Open the modal
      MicroModal.show('modal-1')
    })
  })
  modalClose.addEventListener('click', (e) => {
    MicroModal.close('modal-1')
  })

  // ******************* On click of navigation, change the images ******************* //
  prev.addEventListener('click', (e) => {
    const allSlides = document.querySelectorAll('.lightbox__item')
    const currentSlide = document.querySelector('.item__current')
    const previousSlide = document.querySelector('.item__previous')
    slideStatus(allSlides, previousSlide)
  })
}
