import { nanoid } from "nanoid"
import { defineStore } from "pinia"
import { fetchData, saveData } from '@/utils/api'
import { Todo } from '@/types/todo'
import { useBacklogStore } from '@/store/backlog'

interface State {
  todoList: Todo[] | any,
}

export const useTodoStore = defineStore('todo', {
  state: (): State => ({
		todoList: [],
  }),
  actions: {
		async addTodo (params: Todo) {
			const id = nanoid()
			const createdAt = new Date()
			let done = false
			if (params.done) {
				done = true
			}
			const todo: Todo = { ...params, id, createdAt, done }

			this.todoList.push(todo)
			saveData(this.todoList, 'todo')
		},
		async removeTodo (todo: Todo) {
			const index = this.todoList.findIndex(x => x.id === todo.id)

			if (index < 0) {
				alert(`Can't find todo item [${todo.id}]`)
			}

			this.todoList.splice(index, 1)
			saveData(this.todoList, 'todo')
		},
		async fetchTodo () {
			this.todoList = fetchData('todo')
		},
		async changeTodoDoneStatus(status: boolean, todo: Todo) {
			this.todoList = this.todoList.map(_v => {
				if (_v.id == todo.id) {
					_v.done = status
				}
				return _v
			});
			saveData(this.todoList, 'todo')
		},
		 moveToBacklog(todo: Todo) {
			const backlogStore = useBacklogStore();

			backlogStore.addBacklog(todo);

			this.removeTodo(todo)
		}
  },
  getters: {
		getDoneList: (state): Todo[] => state.todoList.filter(x => x.done),
		getNotDoneList: (state): Todo[] => state.todoList.filter(x => !x.done),
		getAllList: (state): Todo[] => [...state.todoList.filter(x => !x.done), ...state.todoList.filter(x => x.done)]
  }
})