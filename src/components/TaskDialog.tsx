import { Close } from './icons/Close'
import { Plus } from './icons/Plus'
import { Task } from '../interfaces/task'
import { useRef } from 'react'
import { TaskForm } from './TaskForm'
import { useDialog } from '../hooks/useDialog'

interface Props {
  columnName: string
  task?: Task
  dialogRef: React.RefObject<HTMLDialogElement>
}
export const TaskDialog = ({ columnName, task, dialogRef }: Props) => {
  const inputTitleRef = useRef<HTMLInputElement>(null)

  const { openDialog, closeDialog } = useDialog(dialogRef)

  return (
    <>
      {!task && (
        <button
          onClick={() => {
            openDialog()
            inputTitleRef.current?.focus()
          }}
          className='p-3 bg-slate-400 rounded-lg w-[191px] hover:bg-slate-500 dark:bg-slate-900 dark:hover:bg-gray-600 absolute bottom-3'
          aria-label='Abrir diálogo de creación'
        >
          <Plus />
        </button>
      )}
      <dialog
        ref={dialogRef}
        className='rounded-lg p-8 relative min-w-72 shadow-2xl border-2 border-white border-opacity-20 dark:bg-gray-800'
        aria-labelledby='dialog-title'
      >
        <button
          className='absolute right-2 top-2'
          onClick={closeDialog}
          aria-label='Cerrar diálogo'
        >
          <Close />
        </button>
        <TaskForm
          columnName={columnName}
          task={task}
          inputTitleRef={inputTitleRef}
          closeDialog={closeDialog}
        />
      </dialog>
    </>
  )
}
