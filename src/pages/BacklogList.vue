<template>
  <div class="mt-5">
    <div class="py-2 px-4 md:px-0" v-if="!haveNoItem">
      <Filters />
      <TodoItem
        v-if="!isSearching"
        v-for="(backlog, i) in backlogList"
        :key="`${i}-item`"
        :todo="backlog"
        has-backlog-action
        @on-move-to-list="() => backlogStore.moveToTodo(backlog)"
      />
      <TodoItem
        v-else
        v-for="(backlog, i) in searchBacklogList"
        :key="`${i}-search`"
        :todo="backlog"
        has-backlog-action
        @on-move-to-list="() => backlogStore.moveToTodo(backlog)"
      />
    </div>
    <div
      v-else
      class="text-center font-medium text-base md:text-lg text-black mt-10"
    >
      Empty Backlog
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, Ref, reactive } from 'vue'
import { useBacklogStore } from '@/store/backlog'
import { useTodoStore } from '@/store/todo'
import { Todo } from '@/types/todo'
import Filters from '@/components/Filters.vue'
import TodoItem from '@/components/TodoItem.vue'
import { Backlog } from '@/types/backlog'

const backlogStore = useBacklogStore()
const todoStore = useTodoStore()

const backlogList = computed<Backlog[]>(() => backlogStore.getAllbacklog)
const searchBacklogList = computed<Backlog[]>(
  () => backlogStore.getSearchBacklogList
)
const haveNoItem = computed<boolean>(
  () => backlogStore.getAllbacklog.length === 0
)
const isSearching = computed<boolean>(() => backlogStore.getIsSearching)

//  or can use this like this.
const computedRefs = reactive({
  backlogList,
  haveNoItem,
  searchBacklogList,
  isSearching,
})

backlogStore.fetchBacklog()

// function moveToTodo(status: boolean, backlog: Backlog){
//   if(status){
//     backlogStore.moveToTodo({...backlog, done: true })
//   }
// }
</script>
