import { useRef } from 'react'
import { Close } from './icons/Close'
import { Plus } from './icons/Plus'
import { Column } from '../interfaces/column'
import { ColumnForm } from './ColumnForm'

interface Props {
  column?: Column
  dialogRefColum: React.RefObject<HTMLDialogElement>
}

export const ColumnDialog = ({ column, dialogRefColum }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const openDialog = () => dialogRefColum.current?.showModal()
  const closeDialog = () => dialogRefColum.current?.close()
  return (
    <>
      {!column && (
        <button
          onClick={() => {
            openDialog()
            inputRef.current?.focus()
          }}
          className='p-4 bg-slate-200 dark:bg-gray-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg w-36 sm:w-40 md:w-48 lg:w-56'
          aria-label='Abrir diálogo de creación'
        >
          <Plus />
        </button>
      )}
      <dialog
        ref={dialogRefColum}
        className='rounded-lg p-8 relative min-w-72 dark:bg-gray-800 shadow-2xl'
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
