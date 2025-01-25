import { FormEvent } from 'react'
import { Column } from '../interfaces/column'
import { useColumnStore } from '../store/columns'
import { useTaskStore } from '../store/tasks'

interface Props {
  inputRef: React.RefObject<HTMLInputElement>
  column?: Column
  closeDialog: () => void
}
export const ColumnForm = ({ inputRef, column, closeDialog }: Props) => {
  const { columns, createColumn, editColumn } = useColumnStore((state) => state)
  const { editTaskByColumn } = useTaskStore((state) => state)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const columnName = inputRef.current?.value.trim()
    if (columnName) {
      if (
        columns.some((c) => c.name.toLowerCase() === columnName.toLowerCase())
      )
        return
      if (!column) {
        createColumn(columnName)
        if (inputRef.current) inputRef.current.value = ''
      } else {
        const columnIndex = columns.findIndex((c) => c.id === column.id)
        editColumn({ name: columnName, id: column.id })
        editTaskByColumn(columnName, columns[columnIndex].name)
      }
      closeDialog()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 rounded-lg bg-white dark:bg-gray-800 dark:text-white'
    >
      <p className='font-semibold text-lg dark:text-white'>
        {column ? 'Editar' : 'Crear'} Columna
      </p>
      <input
        type='text'
        id='name'
        ref={inputRef}
        defaultValue={column?.name}
        className='mt-1 p-2 w-full rounded-lg bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600'
        placeholder='Ingrese nombre de columna'
        required
      />
      <button
        type='submit'
        className='p-3 w-full bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-900'
      >
        {column ? 'Editar' : 'Crear'}
      </button>
    </form>
  )
}
