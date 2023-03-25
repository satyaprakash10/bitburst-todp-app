<template>
  <div class="container mx-auto flex flex-col justify-between h-full py-[30px] ">
    <div class="text-sm font-medium text-center text-gray border-b border-light-gray-2">
      <ul class="flex flex-wrap -mb-px px-4">
        <li class="mr-2">
          <router-link to="/" v-slot="{ navigate, isExactActive }">
            <h1
              class=" pt-4 transition-all ease-in duration-150 flex flex-col text-[28px] font-bold leading-[33px]"
              :class="
                isExactActive
                  ? 'text-black '
                  : ' hover:text-blue '
              "
            >
              <span>To Do List</span>
              <span 
                class="border-b-4 transition-all ease-in duration-200  mt-2 w-full hover:border-gray rounded-xl"
                  :class="
                isExactActive
                  ? 'border-blue translate-x-0'
                  : 'border-transparent translate-x-full '
              "
              ></span>
            </h1>
          </router-link>
        </li>
        <li class="mr-2">
          <router-link to="/backlog" v-slot="{ navigate, isExactActive }">
            <h1
              class="flex flex-col pt-4 px-4 text-[28px] font-bold leading-[33px]"
              :class="
                isExactActive
                  ? 'text-black '
                  : ' hover:text-blue'
              "
            >
              
              <span>Backlog</span>
              <span 
                class="border-b-4 w-full transition-all ease-in duration-200 mt-2 rounded-xl hover:border-gray "
                :class="
                isExactActive
                  ? 'border-blue translate-x-0'
                  : 'border-transparent -translate-x-full '
              "
              ></span>
            </h1>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="flex-1 ">
      <router-view />
    </div>
	 
   <AddItem />
  </div>
</template>

<script lang="ts" setup>
import AddItem from '@/components/AddItem.vue'

</script>

<style scoped></style>
