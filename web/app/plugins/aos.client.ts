import 'aos/dist/aos.css'
import AOS from 'aos';

export default defineNuxtPlugin(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    delay: 50,
  })
})
