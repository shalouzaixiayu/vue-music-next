import {
  computed,
  ref,
} from 'vue'

export default function useRightSearch(singerList, group) {

  const LI_LEN = 15
  const currentObj = {}
  const ScrollRef = ref(null)
  const lastIndex = ref(0)

  // 右侧搜索列表
  const searchList = computed(() => {
    return singerList.map(item => {
      return item.title
    })
  })


  // 函数逻辑
  function touchStartFun(e) {
    // 先完成点击跳转效果
    lastIndex.value = parseInt(e.target.dataset.index)

    currentObj.startY = e.touches[0].pageY

    scrollTo(lastIndex.value)

   

  }

  function touchMoveFun(e) {
    currentObj.endY = e.touches[0].pageY
    const distance = Math.ceil((currentObj.endY - currentObj.startY) / LI_LEN)
    //  40 - 20  20 / 15  -> 2 

    lastIndex.value = parseInt(e.target.dataset.index) + distance
    scrollTo(lastIndex.value)
  }

  function scrollTo(index) {
    if(isNaN(index)){
      return
    }

    if (index >= 0 && index <= group.value.children.length - 1) {
      const a = Math.min(Math.max(0, index), group.value.children.length -1 )
      const lastEl = group.value.children[a]
      ScrollRef.value.scroll.scrollToElement(lastEl, 0)
    } else {
      return
    }
  }

  return {
    ScrollRef,
    searchList,
    touchStartFun,
    touchMoveFun,
    lastIndex
  }
}