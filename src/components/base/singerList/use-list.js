// 监听dom的滚动 对比列表区间的位置，  判断在哪个地方

import {
  ref, watch, computed, nextTick, onMounted
} from 'vue'

export default function useList(singerList) {

  const group = ref(null);
  // group  ul列表
  const heightList = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  // 差值
  const distance = ref(0)

  const fixedTitle = computed(() => {
    // 如果滚到最上面去了 则不更改
    if(scrollY.value < 0){
      return ""
    }
  
    const hTitle = singerList[currentIndex.value]

    return hTitle ? hTitle.title : ""
  })

  const fixStyle = computed(() => {
    const distanceVal = distance.value

    if(distanceVal > 0 && distanceVal <= 30){
      return {
        transition: 'all 0.4s',
        transform: `translate3d(0, ${distanceVal - 30}px, 0)`
      }
    }else{
      return {}
    }
  })
  // watch(()=> singerList, async() => {
  //   // 监听传入的值的变化， 每次变化， 都计算
  //   await nextTick();
  //   calculate()
  // })

  onMounted( async () => {
    await nextTick()
    calculate()
  })

  // 监听滚动的高度， 计算落在某个区间
  watch(scrollY, (newVal) => {

    for(let i = 0; i< heightList.value.length - 1; i++){
      let heightTop = heightList.value[i]
      let heightBottom = heightList.value[i+1]
      if(newVal >= heightTop && newVal <= heightBottom){
        
        currentIndex.value = i      
        distance.value = heightBottom - newVal
      }
    }
  })

  function calculate() {
    let height = 0
    heightList.value.length = 0
    heightList.value.push(0)

    for (let i = 0; i < group.value.children.length; i++) {
      height  += group.value.children[i].offsetHeight;
      heightList.value.push(height)
    }

  }

  function onScroll(y) {
    scrollY.value = y
  }




  return{
    onScroll,
    fixedTitle,
    group,
    fixStyle,
    currentIndex
  }
}