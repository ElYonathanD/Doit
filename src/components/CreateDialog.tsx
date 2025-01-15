import { useRef, FormEvent } from 'react'
import { useTaskStore } from '../store/tasks'
import { Close } from './icons/Close'
import { Plus } from './icons/Plus'

export const CreateDialog = () => {
  const { createColumn } = useTaskStore((state) => state)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openDialog = () => {
    dialogRef.current?.showModal()
  }

  const closeDialog = () => {
    dialogRef.current?.close()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current?.value) {
      const columnName = inputRef.current.value.trim()
      if (columnName) {
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
        className='p-4 bg-slate-500 rounded-lg dark:bg-slate-800'
        aria-label='Abrir diálogo de creación'
      >
        <Plus />
      </button>
      <dialog
        ref={dialogRef}
        className='rounded-lg p-4 relative min-w-72'
        aria-labelledby='dialog-title'
      >
        <button
          className='absolute right-2 top-2'
          onClick={closeDialog}
          aria-label='Cerrar diálogo'
        >
          <Close />
        </button>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 pt-4'>
          <p className='font-semibold'>Crear Columna</p>
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
            className='p-2 bg-slate-500 rounded-lg text-white'
          >
            Crear
          </button>
        </form>
      </dialog>
    </>
  )
}
