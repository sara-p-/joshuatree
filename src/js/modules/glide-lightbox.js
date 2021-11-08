import Glide from '@glidejs/glide'
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

export default function glideLightbox() {
  MicroModal.init()
  // ******************* Variables ******************* //
  const imageLinks = document.querySelectorAll('section button.image__link')
  const modalClose = document.querySelector('button.modal__close')
  const lightboxItems = document.querySelector('.glide__slides')
  const prev = document.querySelector('.glide__button--prev')
  const next = document.querySelector('.glide__button--next')
  const lightboxNav = document.querySelector('.lightbox__nav')
  const lightboxGrid = document.querySelector('.lightbox__grid')
  const navButton = document.querySelector('#lightbox__nav-button')

  // ******************* Create the slider items ******************* //
  // Create the image object
  const allImages = imageObject(imageLinks)

  // Create the lightbox and the lightbox nav
  allImages.forEach((image) => {
    const item = createLightboxItems(image)
    lightboxItems.append(item)
    // gsap.set(item, {
    //   x: '100%',
    // })
    // const navItem = createLightboxNavItems(image)
    // lightboxGrid.append(navItem)
    // gsap.set(lightboxNav, {
    //   y: '100%',
    // })
  })

  // ******************* Init Glide.js ******************* //
  let glider = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    gap: 0,
  }).mount()

  // ******************* Open the Modal (and update Glide) ******************* //
  imageLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      // Open the modal
      MicroModal.show('modal-1')
      glider.update({ startAt: index })
    })
  })
  // ******************* Close the Modal ******************* //
  modalClose.addEventListener('click', (e) => {
    MicroModal.close('modal-1')
  })
}
