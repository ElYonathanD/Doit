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
    initialDate: '2021-10-10',
    endDate: '2021-10-11',
    status: 'coming',
    priority: false
  },
  {
    id: 'hacer2',
    title: 'hacer 2',
    desc: 'hacer algo 2',
    initialDate: '2021-10-10',
    endDate: '2021-10-11',
    status: 'coming',
    priority: false
  },
  {
    id: 'fix3',
    title: 'fix 3',
    desc: 'revisar 33',
    initialDate: '2021-10-10',
    endDate: '2021-10-11',
    status: 'done',
    priority: false
  },
  {
    id: 'hacer4',
    title: 'hacer 4',
    desc: 'revisar 33 2',
    initialDate: '2021-10-10 2',
    endDate: '2021-10-11',
    status: 'done',
    priority: false
  },
  {
    id: 'fix5',
    title: 'fix 5',
    desc: 'revisar 33',
    initialDate: '2021-10-10',
    endDate: '2021-10-11',
    status: 'archive',
    priority: true
  },
  {
    id: 'hacer6',
    title: 'hacer 6',
    desc: 'revisar 33 2',
    initialDate: '2021-10-10',
    endDate: '2021-10-11',
    status: 'done',
    priority: true
  }
]
interface State {
  columns: Column[]
  tasks: Task[]
  moveColumns: (activeColumnId: string, overColumnId: string) => void
  moveTask: (active: Active, overId: Over) => void
  activeColumn: Column | null
  activeTask: Task | null
  updateActive: (current: CurrentItem | null) => void
  createColumn: (columnName: string) => void
  deleteColumn: (columnId: string) => void
  createTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  editTask: (task: Task) => void
  editColumn: (column: Column) => void
}
export const useTaskStore = create<State>()(
  persist(
    (set, get) => {
      return {
        columns: INITIAL_COLUMNS,
        tasks: INITIAL_TASKS,
        activeColumn: null,
        activeTask: null,
        moveColumns: (activeColumnId, overColumnId) => {
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
        moveTask: (active, over) => {
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
          set({
            activeColumn: current?.type === 'Column' ? current.column : null,
            activeTask: current?.type === 'Task' ? current.task : null
          })
        },
        createColumn: (columnName: string) => {
          if (!columnName) return
          const { columns } = get()
          const newColumns = [...columns, { name: columnName, id: columnName }]
          set({ columns: newColumns })
        },
        deleteColumn: (columnId) => {
          if (!columnId) return
          const { columns, tasks } = get()
          const newColumns = columns.filter((column) => column.id !== columnId)
          const newTask = tasks.filter((task) => task.status !== columnId)
          set({ columns: newColumns })
          set({ tasks: newTask })
        },
        createTask: (task: Task) => {
          const { tasks } = get()
          if (tasks.some((t) => t.id.toLowerCase() === task.id.toLowerCase()))
            return
          if (!task) return
          const newTask = [...tasks, task]
          set({ tasks: newTask })
        },
        deleteTask: (taskId) => {
          if (!taskId) return
          const { tasks } = get()
          const newTask = tasks.filter((task) => task.id !== taskId)
          set({ tasks: newTask })
        },
        editTask: (task) => {
          const { tasks } = get()
          const taskIndex = tasks.findIndex((t) => t.id === task.id)
          if (taskIndex === -1) return
          const updatedTasks = [...tasks]
          updatedTasks[taskIndex] = task
          set({ tasks: updatedTasks })
        },
        editColumn: (column) => {
          const { columns } = get()
          const columnIndex = columns.findIndex((c) => c.id === column.id)
          if (columnIndex === -1) return
          const updatedColumns = [...columns]
          updatedColumns[columnIndex] = column
          set({ columns: updatedColumns })
        }
      }
    },
    {
      name: 'task-storage'
    }
  )
)
