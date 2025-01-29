import { useRef } from 'react'
import { Close } from './icons/Close'
import { Plus } from './icons/Plus'
import { Column } from '../interfaces/column'
import { ColumnForm } from './ColumnForm'
import { useDialog } from '../hooks/useDialog'

interface Props {
  column?: Column
  dialogRefColum: React.RefObject<HTMLDialogElement>
}

export const ColumnDialog = ({ column, dialogRefColum }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { openDialog, closeDialog } = useDialog(dialogRefColum)
  return (
    <>
      {!column && (
        <button
          onClick={() => {
            openDialog()
            inputRef.current?.focus()
          }}
          className='p-4 bg-slate-200 rounded-lg w-36 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-slate-900 sm:w-40 md:w-48 lg:w-56'
          aria-label='Abrir diálogo de creación'
        >
          <Plus />
        </button>
      )}
      <dialog
        ref={dialogRefColum}
        className='rounded-lg p-8 relative min-w-72 border-2 border-white border-opacity-20 dark:bg-gray-800 shadow-2xl'
        aria-labelledby='dialog-title'
      >
        <button
          className='absolute right-2 top-2'
          onClick={closeDialog}
          aria-label='Cerrar diálogo'
        >
          <Close />
        </button>
        <ColumnForm
          closeDialog={closeDialog}
          column={column}
          inputRef={inputRef}
        />
      </dialog>
    </>
  )
}
