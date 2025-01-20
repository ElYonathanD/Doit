import { FormEvent, useRef } from 'react'
import { useTaskStore } from '../store/tasks'
import { Close } from './icons/Close'
import { Plus } from './icons/Plus'
import { Column } from '../interfaces/column'

interface Props {
  column?: Column
  dialogRefColum: React.RefObject<HTMLDialogElement>
  openDialog: () => void
  closeDialog: () => void
}

export const FormColumn = ({
  column,
  dialogRefColum,
  openDialog,
  closeDialog
}: Props) => {
  const { columns, createColumn, editColumn } = useTaskStore((state) => state)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const columnName = inputRef.current?.value.trim()
    if (columnName) {
      if (!column) {
        if (
          columns.some((c) => c.id.toLowerCase() === columnName.toLowerCase())
        )
          return
        createColumn(columnName)
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      } else {
        editColumn({ name: columnName, id: column.id })
      }
      closeDialog()
    }
  }

  return (
    <>
      {!column && (
        <button
          onClick={openDialog}
          className='p-4 bg-slate-500 rounded-lg dark:bg-slate-800'
          aria-label='Abrir diálogo de creación'
        >
          <Plus />
        </button>
      )}
      <dialog
        ref={dialogRefColum}
        className='rounded-lg p-8 relative min-w-72 dark:bg-slate-700'
        aria-labelledby='dialog-title'
      >
        <button
          className='absolute right-2 top-2'
          onClick={closeDialog}
          aria-label='Cerrar diálogo'
        >
          <Close />
        </button>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 pt-4 pb-4'>
          <p className='font-semibold text-lg dark:text-white'>
            {column ? 'Editar' : 'Crear'} Columna
          </p>
          <input
            type='text'
            id='name'
            ref={inputRef}
            defaultValue={column?.name}
            className='p-2 rounded-lg bg-slate-200 border-2 border-slate-600'
            placeholder='Ingrese nombre de columna'
            required
          />
          <button
            type='submit'
            className='p-2 bg-slate-600 rounded-lg text-white dark:bg-slate-800'
          >
            {column ? 'Editar' : 'Crear'}
          </button>
        </form>
      </dialog>
    </>
  )
}
