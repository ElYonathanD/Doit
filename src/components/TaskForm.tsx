import React from 'react'
import { useFormTask } from '../hooks/useFormTask'
import { Task } from '../interfaces/task'

interface Props {
  columnName: string
  closeDialog: () => void
  inputTitleRef: React.RefObject<HTMLInputElement>
  task?: Task
}
export const TaskForm = ({
  columnName,
  task,
  closeDialog,
  inputTitleRef
}: Props) => {
  const { formTask, handleChange, handleSubmit } = useFormTask(
    columnName,
    closeDialog,
    task
  )
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 rounded-lg bg-white dark:bg-gray-800 dark:text-white'
    >
      <p className='font-semibold text-xl text-center text-gray-800 dark:text-white'>
        {task ? 'Editar' : 'Crear'} Tarea
      </p>

      <div>
        <label
          htmlFor='title'
          className='block text-left font-medium text-gray-700 dark:text-gray-300'
        >
          Título
        </label>
        <input
          type='text'
          id='title'
          name='title'
          ref={inputTitleRef}
          value={formTask.title}
          onChange={handleChange}
          className='mt-1 p-2 w-full rounded-lg bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600'
          placeholder='Revisar documentos'
          required
        />
      </div>

      <div>
        <label
          htmlFor='desc'
          className='block text-left font-medium text-gray-700 dark:text-gray-300'
        >
          Descripción
        </label>
        <textarea
          id='desc'
          name='desc'
          value={formTask.desc}
          onChange={handleChange}
          className='mt-1 p-2 w-full rounded-lg bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 focus:outline-none min-h-28 max-h-80 resize-y'
          placeholder='Los documentos de...'
          rows={3}
          required
        ></textarea>
      </div>

      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <label
            htmlFor='initialDate'
            className='block text-left font-medium text-gray-700 dark:text-gray-300'
          >
            Fecha de Inicio
          </label>
          <input
            type='date'
            id='initialDate'
            name='initialDate'
            value={formTask.initialDate}
            onChange={handleChange}
            className='mt-1 p-2 w-full rounded-lg bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600'
            required
          />
        </div>

        <div className='flex-1'>
          <label
            htmlFor='endDate'
            className='block text-left font-medium text-gray-700 dark:text-gray-300'
          >
            Fecha de Fin
          </label>
          <input
            type='date'
            id='endDate'
            name='endDate'
            value={formTask.endDate}
            onChange={handleChange}
            className='mt-1 p-2 w-full rounded-lg bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600'
            required
          />
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          id='priority'
          name='priority'
          checked={formTask.priority}
          onChange={handleChange}
          className='w-5 h-5 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
        />
        <label
          htmlFor='priority'
          className='text-left font-medium text-gray-700 dark:text-gray-300'
        >
          Prioridad
        </label>
      </div>

      <button
        type='submit'
        className='p-3 w-full bg-slate-600 text-white font-semibold rounded-lg border-2 border-white border-opacity-30 hover:bg-slate-500 dark:bg-slate-900 dark:hover:bg-gray-600'
      >
        {task ? 'Editar' : 'Crear'}
      </button>
    </form>
  )
}
