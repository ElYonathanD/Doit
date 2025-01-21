import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task } from '../interfaces/task'
import { arrayMove } from '@dnd-kit/sortable'
import { Active, Over } from '@dnd-kit/core'
import { CurrentItem } from '../interfaces/currentItem'
import { v4 as uuidv4 } from 'uuid'

const INITIAL_TASKS: Task[] = []
interface State {
  tasks: Task[]
  moveTask: (active: Active, overId: Over) => void
  activeTask: Task | null
  updateActiveTask: (current: CurrentItem | null) => void
  deleteTasksByColumn: (columnName: string) => void
  createTask: (task: Omit<Task, 'id'>) => void
  deleteTask: (taskId: string) => void
  editTask: (task: Task) => void
  editTaskByColumn: (columnName: string, oldName: string) => void
}
export const useTaskStore = create<State>()(
  persist(
    (set, get) => {
      return {
        tasks: INITIAL_TASKS,
        activeTask: null,
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
        updateActiveTask: (current: CurrentItem | null) => {
          set({
            activeTask: current?.type === 'Task' ? current.task : null
          })
        },
        deleteTasksByColumn: (columnName: string) => {
          if (!columnName) return
          const { tasks } = get()
          const newTask = tasks.filter((task) => task.status !== columnName)
          set({ tasks: newTask })
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
        editTaskByColumn: (columnName: string, oldName: string) => {
          const { tasks } = get()
          const updatedTasks = tasks.map((task) => {
            if (task.status === oldName) {
              return { ...task, status: columnName }
            }
            return task
          })
          set({ tasks: updatedTasks })
        }
      }
    },
    {
      name: 'tasks-storage'
    }
  )
)
