import { scrollSliderTimeline, scrollSliderItems } from './helper-functions'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function scrollSlider() {
  const sectionSlider = document.querySelectorAll('.section__slider')
  console.log(sectionSlider)

  sectionSlider.forEach((section) => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        // pinSpacing: 'margin',
        start: 'top top',
        // end: '+=100%',
        scrub: true,
      },
    })
    const slides = section.querySelectorAll('.slider__item')
    const slideArray = Array.from(slides)
    slideArray.unshift()
    slideArray.forEach((slide) => {
      const slideUp = gsap.from(slide, {
        y: '100%',
        duration: 1,
      })
      timeline.add(slideUp)
    })
  })

  // sectionSlider.forEach((slider) => {
  //   const sliderTimeline = scrollSliderTimeline(slider)
  //   const slides = slider.querySelectorAll('.slider__item')

  //   slides.forEach((slide) => {
  //     sliderTimeline.add(scrollSliderItems(slide))
  //   })
  // })
}
