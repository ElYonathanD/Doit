import { useEffect, useRef } from 'react'
import { Close } from './icons/Close'

interface Props {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Dialog = ({ isOpen, onClose, children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (dialog) {
      if (isOpen) {
        dialog.showModal()
      } else {
        dialog.close()
      }
    }
  }, [isOpen])
  return (
    <dialog
      ref={dialogRef}
      className='rounded-lg p-8 relative min-w-72 dark:bg-slate-700'
      aria-labelledby='dialog-title'
    >
      <button
        className='absolute right-2 top-2'
        onClick={onClose}
        aria-label='Cerrar diálogo'
      >
        <Close />
      </button>
      {children}
    </dialog>
  )
}
