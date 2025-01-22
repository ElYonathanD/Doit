import { useState } from 'react'
import { useColumnStore } from '../store/columns'
import { Options } from './icons/Options'
import { useTaskStore } from '../store/tasks'
import { Delete } from './icons/Delete'
import { Column } from '../interfaces/column'
import { Pen } from './icons/Pen'

interface Props {
  column: Column
  openDialogColumn: () => void
}
export const Menu = ({ column, openDialogColumn }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { deleteColumn } = useColumnStore((state) => state)
  const { deleteTasksByColumn } = useTaskStore((state) => state)

  return (
    <div className='absolute right-1 top-1 z-10'>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className='flex items-center justify-center p-1 rounded-full hover:bg-gray-300 bg-white dark:bg-gray-900 dark:hover:bg-gray-600'
      >
        <Options />
      </button>

      {menuOpen && (
        <div
          className='absolute w-40 bg-white z-10 rounded-md shadow-lg dark:bg-gray-800'
          onMouseLeave={() => setMenuOpen(false)}
        >
          <ul className='py-1'>
            <li>
              <button
                onClick={() => {
                  deleteColumn(column)
                  deleteTasksByColumn(column.name)
                  setMenuOpen(false)
                }}
                className='flex items-center justify-start gap-4 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
              >
                <Delete />
                Eliminar
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  openDialogColumn()
                  setMenuOpen(false)
                }}
                className='flex items-center justify-start gap-4 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
              >
                <Pen />
                Editar
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
