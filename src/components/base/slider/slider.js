import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import {
  onMounted,
  onUnmounted,
  ref
} from "vue"

BScroll.use(Slide)

export default function useSlider(wrapper) {
  const slider = ref(null)
  const currentPage = ref(0)

  onMounted(() => {
    slider.value = new BScroll(wrapper.value, {
      click:true,
      scrollX: true,
      scrollY: false,
      slide: {
        threshold: 100
      },
      momentum: false,
      bounce: false,
      stopPropagation: true,
      probeType: 2
    })

    slider.value.on('slideWillChange', (page) => {
      currentPage.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value.destroy()
  })

  return {
    slider, currentPage
  }
}