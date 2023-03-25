import { Todo } from '@/types/todo'
import { Backlog } from '@/types/backlog'

const ls = localStorage

export function fetchData(type: string) {
	let arr = [];

	const items = ls.getItem(type);
	if (items) {
		arr = JSON.parse(items);
	}
	return arr;
}

async function saveTodoDataOnLocalStorage (todoList: Todo[]) {
  localStorage.setItem('todo', JSON.stringify(todoList))
}

async function saveBacklogDataOnLocalStorage (backlogList: Backlog[]) {
  localStorage.setItem('backlog', JSON.stringify(backlogList))
}

export function saveData (list: Todo[] | Backlog[] , type?: string): Promise<void> {
  let saveFunction: Promise<void>

    if (type == 'todo') {
        saveFunction = saveTodoDataOnLocalStorage(list)
    } else {
        saveFunction = saveBacklogDataOnLocalStorage(list)
    }

  return saveFunction
}