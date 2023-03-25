<template>
  <div class="flex px-4">
    <input 
      type="text" 
      :disabled="disabled"
      class="border border-light-gray text-black text-sm rounded-md focus:ring-blue focus:border-blue block w-full p-2.5 " 
      placeholder="Add todo item" 
      required
      v-model="text"
    >
    <button 
      class="shadow text-white  hover:bg-opacity-70 ml-4 w-28 rounded px-3 py-2 text-[13px] leading-[15px]" 
      @click="onClickSave"
      :class="disabled ? 'pointer-events-none bg-light-gray' : 'bg-blue'"
      :disabled="disabled"
    >
      Add Item
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useTodoStore } from '@/store/todo'
import { useRoute } from 'vue-router'

const router = useRoute()
const todoStore = useTodoStore()

const text = ref<string>('')
let disabled = ref<boolean>(false)


watch(router, path => {
  disabled.value = router.path.includes('backlog')
}, {
  immediate: true
})

function onClickSave () {

  if (text.value.length === 0) {
    alert('Please enter something 🥲')
    return
  }

  todoStore.addTodo({ text: text.value })
  text.value = ''
}
</script>
