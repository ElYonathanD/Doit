import { useCallback } from 'react'

export const useDialog = (dialogRef: React.RefObject<HTMLDialogElement>) => {
  const openDialog = useCallback(() => {
    dialogRef.current?.showModal()
  }, [dialogRef])

  const closeDialog = useCallback(() => {
    dialogRef.current?.close()
  }, [dialogRef])

  return { openDialog, closeDialog }
}
