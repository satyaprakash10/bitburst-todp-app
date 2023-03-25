<template>
  <div class="mt-3">
    <!-- completed todo items -->
    <div class="border-b border-light-gray-2 pb-3 px-4 md:px-0">
      <Collapsible>
        <template v-slot:header>
          <div>{{ getDoneList.length }} Done</div>
        </template>
        <div>
          <TodoItem
            v-for="(done, i) in getDoneList"
            :key="done.id"
            :todo="done"
            @on-change-todo-status="
              (status) => todoStore.changeTodoDoneStatus(status, done)
            "
          />
        </div>
        <div
          v-if="getDoneList.length <= 0"
          class="text-center font-medium text-base md:text-lg text-black"
        >
          No completed task found yet!
        </div>
      </Collapsible>
    </div>
    <!-- uncompleted todo items -->
    <div class="py-2 px-4 md:px-0">
      <TodoItem
        v-for="(notDone, i) in notDoneList"
        :key="notDone.id"
        :todo="notDone"
        has-todo-action
        @on-delete="onClickDelete(notDone)"
        @on-move-to-backlog="() => todoStore.moveToBacklog(notDone)"
        @on-change-todo-status="
          (status) => todoStore.changeTodoDoneStatus(status, notDone)
        "
      />
    </div>
    <div
      v-if="notDoneList.length <= 0"
      class="text-center font-medium text-base md:text-lg text-black mt-10"
    >
      You're all set to go! 🚀
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, Ref, reactive } from 'vue'
import { useTodoStore } from '@/store/todo'
import { Todo } from '@/types/todo'
import Collapsible from '@/components/Collapsible.vue'
import TodoItem from '@/components/TodoItem.vue'

const todoStore = useTodoStore()

const checked = ref(false)

const notDoneList = computed<Todo[]>(() => todoStore.getNotDoneList)
const getDoneList = computed<Todo[]>(() => todoStore.getDoneList)
const haveNoItem = computed<boolean>(() => todoStore.getAllList.length === 0)

//  or can use this like this.
const computedRefs = reactive({ notDoneList, haveNoItem, getDoneList })

todoStore.fetchTodo()

async function onClickDelete(todo: Todo) {
  const confirmed = await confirm('Do you want to delete this todo? 🧐')

  if (confirmed) {
    await todoStore.removeTodo(todo)
  }
}
</script>

<style scoped lang="scss"></style>
