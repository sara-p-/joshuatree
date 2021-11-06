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
  const modal = document.querySelector('#modal-1')
  const imageLinks = document.querySelectorAll('section button.image__link')
  const modalClose = document.querySelector('button.modal__close')
  const lightboxItems = document.querySelector('.lightbox__items')
  const prev = document.querySelector('.lightbox__button--prev')
  const next = document.querySelector('.lightbox__button--next')
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
  new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
  }).mount()

  // ******************* Open the Modal ******************* //
  imageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      // Open the modal
      MicroModal.show('modal-1')
    })
  })
  // ******************* Close the Modal ******************* //
  modalClose.addEventListener('click', (e) => {
    MicroModal.close('modal-1')
  })
}
