<template>
  <div class="flex mb-4 flex-col md:flex-row">
    <input 
      type="text" 
      class="border border-light-gray text-black text-sm rounded-md focus:ring-blue focus:border-blue block w-full p-2.5 " 
      placeholder="Search" 
      required
      v-model="search"
      @input="() => backlogStore.searchBacklog(search)"
    >
    <div class="flex flex-[0.5] flex-row w-full items-center justify-between md:justify-center md:ite mt-4 md:mt-0">
      <button 
        class="shadow text-white bg-blue text-base hover:bg-opacity-70 w-full md:ml-4 md:w-40 rounded px-3 py-3.5 text-[13px] leading-[15px]" 
        @click="backlogStore.sortByName()"
      >
        Sort by Name
      </button>
      <button 
        class="shadow text-white bg-blue text-base hover:bg-opacity-70 ml-4 w-full md:w-40 rounded px-3 py-3.5 text-[13px] leading-[15px]" 
        @click="backlogStore.sortByDate()"
      >
        Sort by Date
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useBacklogStore } from '@/store/backlog'
const search = ref<string>('')

const backlogStore = useBacklogStore()

</script>
