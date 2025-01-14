import { Column } from './column'
import { Task } from './task'

export interface CurrentItem {
  sortable: Sortable
  type: string
  task?: Task
  column?: Column
}

interface Sortable {
  containerId: string
  index: number
  items: string[]
}
