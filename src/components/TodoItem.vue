<script setup lang="ts">
import { Todo } from '@/types/todo'
import { PropType, ref, watch } from 'vue'
import ActionIcon from './icons/ActionIcon.vue'
import BaseCheckbox from './BaseCheckbox.vue'

const show = ref(false)
const emit = defineEmits(['onChangeTodoStatus', 'onDelete', 'onMoveToBacklog'])

const props = defineProps({
  todo: {
    type: Object as PropType<Todo>,
    requird: true,
    default: null,
  },
  hasTodoAction: {
    type: Boolean,
    default: false,
  },
  hasBacklogAction: {
    type: Boolean,
    default: false,
  },
})

const checked = ref(props.todo ? props.todo.done : false)

watch(
  props.todo,
  (todoItem) => {
    if (todoItem && todoItem.done) {
      checked.value = true
    }
  },
  {
    immediate: true,
  }
)

function getChange(value: boolean) {
  emit('onChangeTodoStatus', value)
}

function onClickDelete() {
  emit('onDelete')
  show.value = false
}

function onMoveToBacklog() {
  emit('onMoveToBacklog')
  show.value = false
}

function onHide() {
  show.value = false
}
const vClickOutside = {
  mounted: function (el: any, binding: any, vnode: any) {
    el.clickOutsideEvent = function (event: any) {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value(event, el)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: function (el: any) {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
</script>

<template>
  <div class="flex justify-between items-center">
    <BaseCheckbox
      @update:modelValue="getChange"
      :todo="todo"
      :disabled="hasBacklogAction"
    />

    <!-- Action popup for todo list -->
    <div class="relative" v-click-outside="onHide" v-if="hasTodoAction">
      <div
        :class="show ? 'bg-light-gray-2' : ''"
        @click="show = !show"
        class="w-10 h-10 cursor-pointer text-dark-gray transition-all group hover:bg-light-gray-2 flex items-center justify-center rounded-full"
      >
        <ActionIcon
          class="w-7 h-7 group-hover:text-black"
          :class="show ? 'text-black' : ''"
        />
      </div>
      <div
        class="absolute bg-white w-40 mr-2 top-0 rounded shadow border border-light-gray transition-all duration-150"
        :class="show ? 'scale-100 right-full' : 'scale-0 right-0'"
      >
        <ul>
          <li
            class="p-2 text-blue hover:bg-light-gray transition-all duration-300 ease-out cursor-pointer"
          >
            <a href="#" class="block" @click="onClickDelete">Delete</a>
          </li>
          <li
            class="p-2 text-blue hover:bg-light-gray transition-all duration-300 ease-out border-t border-light-gray cursor-pointer"
          >
            <a href="#" class="block" @click="onMoveToBacklog">
              Move to Backlog
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Action button for backlog list -->
    <div class="relative" v-if="hasBacklogAction">
      <button
        class="border border-light-gray w-28 ml-1 text-blue rounded px-3 py-2 text-[13px] leading-[15px]"
        @click="$emit('onMoveToList')"
      >
        Move to List
      </button>
    </div>
  </div>
</template>
