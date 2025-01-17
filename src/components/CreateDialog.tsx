import { useState } from 'react'
import { Plus } from './icons/Plus'
import { Dialog } from './Dialog'

interface Props {
  children: React.ReactNode
}
export const CreateDialog = ({ children }: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const openDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)

  return (
    <>
      <button
        onClick={openDialog}
        className='p-4 bg-slate-500 rounded-lg dark:bg-slate-800 '
        aria-label='Abrir diálogo de creación'
      >
        <Plus />
      </button>
      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        {children}
      </Dialog>
    </>
  )
}
