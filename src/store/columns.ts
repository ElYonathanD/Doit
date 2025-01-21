import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Column } from '../interfaces/column'
import { arrayMove } from '@dnd-kit/sortable'
import { CurrentItem } from '../interfaces/currentItem'
import { v4 as uuidv4 } from 'uuid'

const INITIAL_COLUMNS: Column[] = []
interface State {
  columns: Column[]
  moveColumns: (activeColumnId: string, overColumnId: string) => void
  activeColumn: Column | null
  updateActiveColumn: (current: CurrentItem | null) => void
  createColumn: (columnName: string) => void
  deleteColumn: (column: Column) => void
  editColumn: (column: Column) => void
}
export const useColumnStore = create<State>()(
  persist(
    (set, get) => {
      return {
        columns: INITIAL_COLUMNS,
        activeColumn: null,
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
        updateActiveColumn: (current: CurrentItem | null) => {
          set({
            activeColumn: current?.type === 'Column' ? current.column : null
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
          const { columns } = get()
          const newColumns = columns.filter((c) => c.id !== column.id)
          set({ columns: newColumns })
        },
        editColumn: (column: Column) => {
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
      name: 'columns-storage'
    }
  )
)
