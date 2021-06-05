import {
  ref,
  onMounted,
  watch,
  nextTick
} from 'vue'

export function addScroll() {

  const ScrollRef = ref(null)

  onMounted(async () => {
    await nextTick()
    
    setTimeout(() => {
      //  console.log(ScrollRef.value.scroll)
    }, (1000));
   
  })

  return {
    ScrollRef
  }
}