<template>
  <div>
    <div class="flex items-center cursor-pointer" @click="show = !show">
      <ArrowRightIcon
        :class="show ? 'rotate-90 ' : ''"
        class="text-light-gray h-5 w-5 transition-all"
      />
      <h3 class="text-base text-light-gray ml-2">
        <slot name="header"></slot>
      </h3>
    </div>
    <div class="overflow-hidden">
      <transition
        enter-from-class="-translate-y-full opacity-0 "
        leave-to-class="-translate-y-full opacity-0 "
        leave-from-class="-translate-y-50 opacity-0"
        enter-active-class="translate-y-50 transition opacity-100"
        leave-active-class="transition opacity-100"
      >
        <div v-show="show" ref="collapsible" class="duration-200 pt-2">
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'

const show = ref(false)

const collapsible = ref(null)

console.log(collapsible)
onMounted(() => {})
</script>
