import { FormEvent, useRef } from 'react'
import { CreateDialog } from './CreateDialog'
import { useTaskStore } from '../store/tasks'

export const CreateColumn = () => {
  const { createColumn } = useTaskStore((state) => state)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current?.value) {
      const columnName = inputRef.current.value.trim()
      if (columnName) {
        createColumn(columnName)
        inputRef.current.value = ''
      }
    }
  }
  return (
    <CreateDialog>
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
          className='p-2 bg-slate-600 rounded-lg text-white'
        >
          Crear
        </button>
      </form>
    </CreateDialog>
  )
}
