import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Column } from '../interfaces/column'
import { Task } from '../interfaces/task'
import { arrayMove } from '@dnd-kit/sortable'
import { Active, Over } from '@dnd-kit/core'
import { CurrentItem } from '../interfaces/currentItem'
import { v4 as uuidv4 } from 'uuid'

const INITIAL_COLUMNS: Column[] = []
const INITIAL_TASKS: Task[] = []
interface State {
  columns: Column[]
  tasks: Task[]
  moveColumns: (activeColumnId: string, overColumnId: string) => void
  moveTask: (active: Active, overId: Over) => void
  activeColumn: Column | null
  activeTask: Task | null
  updateActive: (current: CurrentItem | null) => void
  createColumn: (columnName: string) => void
  deleteColumn: (column: Column) => void
  createTask: (task: Omit<Task, 'id'>) => void
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
        moveColumns: (activeColumnId: string, overColumnId: string) => {
          const { columns } = get()
          const activeColumnIndex = columns.findIndex(
            (column) => column.name === activeColumnId
          )
          const overColumnIndex = columns.findIndex(
            (column) => column.name === overColumnId
          )
          const newOrderColumns = arrayMove(
            columns,
            activeColumnIndex,
            overColumnIndex
          )
          set({ columns: newOrderColumns })
        },
        moveTask: (active: Active, over: Over) => {
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
        updateActive: (current: CurrentItem | null) => {
          set({
            activeColumn: current?.type === 'Column' ? current.column : null,
            activeTask: current?.type === 'Task' ? current.task : null
          })
        },
        createColumn: (columnName: string) => {
          if (!columnName) return
          const { columns } = get()
          const newColumns = [...columns, { name: columnName, id: uuidv4() }]
          set({ columns: newColumns })
        },
        deleteColumn: (column: Column) => {
          if (!column) return
          const { columns, tasks } = get()
          const newColumns = columns.filter((c) => c.id !== column.id)
          const newTask = tasks.filter((task) => task.status !== column.name)
          set({ columns: newColumns, tasks: newTask })
        },
        createTask: (task: Omit<Task, 'id'>) => {
          const { tasks } = get()
          const newTask = {
            ...task,
            id: uuidv4()
          }
          set({ tasks: [...tasks, newTask] })
        },
        deleteTask: (taskId: string) => {
          if (!taskId) return
          const { tasks } = get()
          const newTask = tasks.filter((task) => task.id !== taskId)
          set({ tasks: newTask })
        },
        editTask: (task: Task) => {
          const { tasks } = get()
          const taskIndex = tasks.findIndex((t) => t.id === task.id)
          if (taskIndex === -1) return
          const updatedTasks = [...tasks]
          updatedTasks[taskIndex] = task
          set({ tasks: updatedTasks })
        },
        editColumn: (column: Column) => {
          const { columns, tasks } = get()
          const columnIndex = columns.findIndex((c) => c.id === column.id)
          if (columnIndex === -1) return

          const updatedColumns = [...columns]
          const updatedTasks = tasks.map((task) => {
            if (task.status === columns[columnIndex].name) {
              return { ...task, status: column.name }
            }
            return task
          })

          updatedColumns[columnIndex] = column
          set({ columns: updatedColumns, tasks: updatedTasks })
        }
      }
    },
    {
      name: 'task-storage'
    }
  )
)
