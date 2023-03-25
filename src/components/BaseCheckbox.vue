<template>
  <div>
    <div class="inline-flex items-center">
      <label
        class="flex items-center py-3 rounded-full cursor-pointer"
        :for="todo.id"
      >
        <div class="relative flex items-center justify-center">
          <input
            type="checkbox"
            @change="updateValue"
            v-model="checked"
            :disabled="disabled"
            class="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-light-gray transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-500 before:opacity-0 before:transition-opacity checked:border-blue checked:bg-blue hover:before:opacity-10"
            :id="todo.id"
            :checked="todo.done"
          />
          <div
            class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div class="ml-3">
          <h2
            class="text-base"
            :class="todo.done ? 'line-through text-dark-gray' : 'text-black'"
          >
            {{ todo.text }}
          </h2>
          <p class="text-xs text-dark-gray mt-1">
            {{ moment(todo.createdAt).format('DD/MM/YYYY hh:mm:ss a') }}
          </p>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Todo } from '@/types/todo'
import { PropType, ref, watch } from 'vue'
import moment from 'moment'
import ActionIcon from './icons/ActionIcon.vue'

const show = ref(false)
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  todo: {
    type: Object as PropType<Todo>,
    requird: true,
    default: null,
  },
  disabled: {
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
function updateValue() {
  emit('update:modelValue', checked.value)
}
</script>
