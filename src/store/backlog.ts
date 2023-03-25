import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { fetchData, saveData } from '@/utils/api'
import { Backlog } from '@/types/backlog'
import { useTodoStore } from '@/store/todo'
import { compare, compareDates } from '@/utils/global'

interface State {
  backlogList: Backlog[] | any
  searchBacklogList: Backlog[] | any
  isSortByName: boolean
  isSortByDate: boolean
  isSearching: boolean
}

export const useBacklogStore = defineStore('backlog', {
  state: (): State => ({
    backlogList: [],
    searchBacklogList: [],
    isSortByName: false,
    isSortByDate: false,
    isSearching: false,
  }),
  actions: {
    async addBacklog(params: Backlog) {
      const id = nanoid()
      const createdAt = new Date()
      const done = false
      const backlog: Backlog = { ...params, id, createdAt, done }

      this.backlogList.push(backlog)
      saveData(this.backlogList, 'backlog')
    },
    removeBacklog(backlog: Backlog) {
      const index = this.backlogList.findIndex((x) => x.id === backlog.id)

      if (index < 0) {
        alert(`Can't find backlog item [${backlog.id}]`)
      }

      this.backlogList.splice(index, 1)
      saveData(this.backlogList, 'backlog')
    },
    async fetchBacklog() {
      this.backlogList = fetchData('backlog')
    },
    moveToTodo(backlog: Backlog) {
      const todoStore = useTodoStore()

      todoStore.addTodo(backlog)

      this.removeBacklog(backlog)
    },
    sortByName() {
      this.backlogList = this.backlogList.sort((a: any, b: any) =>
        compare(a, b, this.isSortByName)
      )
      this.isSortByName = !this.isSortByName
      saveData(this.backlogList, 'backlog')
    },
    sortByDate() {
      this.backlogList = this.backlogList.sort((a: any, b: any) =>
        compareDates(a, b, this.isSortByDate)
      )
      this.isSortByDate = !this.isSortByDate
      saveData(this.backlogList, 'backlog')
    },
    searchBacklog(search: string) {
      if (search == '') {
        this.searchBacklogList = []
        this.isSearching = false
      } else {
        this.isSearching = true
        this.searchBacklogList = this.backlogList.filter((_v) =>
          _v.text.toLowerCase().includes(search.toLowerCase())
        )
      }
    },
  },
  getters: {
    getAllbacklog: (state): Backlog[] => state.backlogList,
    getSearchBacklogList: (state): Backlog[] => state.searchBacklogList,
    getIsSearching: (state): boolean => state.isSearching,
  },
})
