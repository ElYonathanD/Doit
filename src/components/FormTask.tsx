import { useFormTask } from '../hooks/useFormTask'
import { Close } from './icons/Close'
import { Plus } from './icons/Plus'
import { Task } from '../interfaces/task'

interface Props {
  columnId: string
  task?: Task
  dialogRef: React.RefObject<HTMLDialogElement>
  openDialog: () => void
  closeDialog: () => void
}
export const FormTask = ({
  columnId,
  task,
  dialogRef,
  openDialog,
  closeDialog
}: Props) => {
  const { formTask, handleChange, handleSubmit } = useFormTask(
    columnId,
    closeDialog,
    task
  )
  return (
    <>
      {!task && (
        <button
          onClick={openDialog}
          className='p-4 bg-slate-500 rounded-lg dark:bg-slate-800 '
          aria-label='Abrir diálogo de creación'
        >
          <Plus />
        </button>
      )}
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
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800'
        >
          <p className='font-semibold text-xl text-center text-gray-800 dark:text-white'>
            Crear Tarea
          </p>

          <div>
            <label
              htmlFor='title'
              className='block text-left font-medium text-gray-700 dark:text-gray-300'
            >
              Título Tarea
            </label>
            <input
              type='text'
              id='title'
              name='title'
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

          <div className='flex gap-4'>
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
            className='p-3 w-full bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-900'
          >
            {task ? 'Editar' : 'Crear'}
          </button>
        </form>
      </dialog>
    </>
  )
}