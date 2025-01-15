import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Column } from '../interfaces/column'
import { Task } from '../interfaces/task'
import { arrayMove } from '@dnd-kit/sortable'
import { Active, Over } from '@dnd-kit/core'
import { CurrentItem } from '../interfaces/currentItem'

const INITIAL_COLUMNS: Column[] = [
  {
    id: 'coming',
    name: 'coming'
  },
  { id: 'done', name: 'done' },
  { id: 'archive', name: 'archive' }
]
const INITIAL_TASKS: Task[] = [
  {
    id: 'hacer1',
    title: 'hacer 1',
    desc: 'hacer algo',
    date: '2021-10-10',
    status: 'coming'
  },
  {
    id: 'hacer2',
    title: 'hacer 2',
    desc: 'hacer algo 2',
    date: '2021-10-10 2',
    status: 'coming'
  },
  {
    id: 'fix3',
    title: 'fix 3',
    desc: 'revisar 33',
    date: '2021-10-10',
    status: 'done'
  },
  {
    id: 'hacer4',
    title: 'hacer 4',
    desc: 'revisar 33 2',
    date: '2021-10-10 2',
    status: 'done'
  },
  {
    id: 'fix5',
    title: 'fix 5',
    desc: 'revisar 33',
    date: '2021-10-10',
    status: 'archive'
  },
  {
    id: 'hacer6',
    title: 'hacer 6',
    desc: 'revisar 33 2',
    date: '2021-10-10 2',
    status: 'done'
  }
]
interface State {
  columns: Column[]
  tasks: Task[]
  changeColumns: (activeColumnId: string, overColumnId: string) => void
  changeTasks: (active: Active, overId: Over) => void
  activeColumn: Column | null
  activeTask: Task | null
  updateActive: (current: CurrentItem | null) => void
  createColumn: (columnName: string) => void
}
export const useTaskStore = create<State>()(
  persist(
    (set, get) => {
      return {
        columns: INITIAL_COLUMNS,
        tasks: INITIAL_TASKS,
        activeColumn: null,
        activeTask: null,
        changeColumns: (activeColumnId, overColumnId) => {
          const { columns } = get()
          const activeColumnIndex = columns.findIndex(
            (column) => column.id === activeColumnId
          )
          const overColumnIndex = columns.findIndex(
            (column) => column.id === overColumnId
          )
          const newOrderColumns = arrayMove(
            columns,
            activeColumnIndex,
            overColumnIndex
          )
          set({ columns: newOrderColumns })
        },
        changeTasks: (active, over) => {
          const { tasks } = get()

          const isActiveTask = active.data.current?.type === 'Task'
          const isOverTask = over.data.current?.type === 'Task'
          const isOverColumn = over.data.current?.type === 'Column'

          if (!isActiveTask) return

          //same column
          const activeIndex = tasks.findIndex((task) => task.id === active.id)

          if (isActiveTask && isOverTask) {
            const overIndex = tasks.findIndex((task) => task.id === over.id)
            tasks[activeIndex].status = tasks[overIndex].status
            const newOrderTask = arrayMove(tasks, activeIndex, overIndex)
            set({ tasks: newOrderTask })
          }

          //other column
          if (isActiveTask && isOverColumn) {
            tasks[activeIndex].status = over.id as string
            const newOrderTask = arrayMove(tasks, activeIndex, activeIndex)
            set({ tasks: newOrderTask })
          }
        },
        updateActive: (current) => {
          if (!current) {
            set({ activeColumn: null })
            set({ activeTask: null })
            return
          }
          if (current?.type === 'Column') {
            set({ activeColumn: current.column })
            return
          }
          if (current?.type === 'Task') {
            set({ activeTask: current.task })
            return
          }
        },
        createColumn: (columnName: string) => {
          const { columns } = get()
          if (columns.find((column) => column.id === columnName)) return
          const newColumns = [...columns, { name: columnName, id: columnName }]
          set({ columns: newColumns })
        }
      }
    },
    {
      name: 'task-storage'
    }
  )
)
