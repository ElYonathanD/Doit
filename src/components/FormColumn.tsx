import { FormEvent, useRef } from 'react'
import { useTaskStore } from '../store/tasks'
import { Close } from './icons/Close'
import { Plus } from './icons/Plus'

interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>
  openDialog: () => void
  closeDialog: () => void
}

export const FormColumn = ({ dialogRef, openDialog, closeDialog }: Props) => {
  const { columns, createColumn } = useTaskStore((state) => state)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current?.value) {
      const columnName = inputRef.current.value.trim()
      if (columnName) {
        if (
          columns.find(
            (column) =>
              column.id.toLocaleLowerCase() === columnName.toLocaleLowerCase()
          )
        )
          return
        createColumn(columnName)
        inputRef.current.value = ''
        closeDialog()
      }
    }
  }
  return (
    <>
      <button
        onClick={openDialog}
        className='p-4 bg-slate-500 rounded-lg dark:bg-slate-800 '
        aria-label='Abrir diálogo de creación'
      >
        <Plus />
      </button>
      <dialog
        ref={dialogRef}
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
          <p className='font-semibold text-lg dark:text-white'>Crear Columna</p>
          <input
            type='text'
            id='name'
            ref={inputRef}
            className='p-2 rounded-lg bg-slate-200 border-2 border-slate-600'
            placeholder='Ingrese nombre de columna'
            required
          />
          <button
            type='submit'
            className='p-2 bg-slate-600 rounded-lg text-white dark:bg-slate-800'
          >
            Crear
          </button>
        </form>
      </dialog>
    </>
  )
}
