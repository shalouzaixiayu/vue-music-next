<template>
  <div ref="scrollRef">
    <slot></slot>
  </div>
</template>

<script setup>
import useScroll from './use-scroll.js';
import {ref, defineProps, defineEmit, useContext}  from 'vue'

const props = defineProps({
  click:Boolean,
  probeType:Number
})

const emits = defineEmit(['onScroll'])

const scrollRef = ref(null);

const {scroll} = useScroll(scrollRef, props, emits)

const {expose} = useContext()
expose({
  scroll
})

</script>
