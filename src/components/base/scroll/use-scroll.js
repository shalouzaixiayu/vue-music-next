import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from '@better-scroll/observe-image'

BScroll.use(ObserveDOM)
BScroll.use(ObserveImage)

import {
  onMounted,
  onUnmounted,
  ref
} from 'vue'

export default function useScroll(wrapper, options, emit) {
  const scroll = ref(null)

  onMounted(async() => {
    const s = scroll.value = new BScroll(wrapper.value, {
      observeDOM: true,
      observeImage: true, // 开启 observe-image 插件
      click:true,
      ...options
    })

    if (options.probeType > 0) {
      s.on('scroll', (position) => {
        // 发射出 onScroll 事件 暴露出监听的y值
        emit('onScroll', -position.y)
      })
    }
  })



  onUnmounted(() => {
    scroll.value.destroy()
  })

  return {
    scroll
  }
}