import { useTaskStore } from '../store/tasks'
import { Delete } from './icons/Delete'
import { Pen } from './icons/Pen'

interface Props {
  taskId: string
  dialogRef: React.RefObject<HTMLDialogElement>
}
export const TaskActions = ({ taskId, dialogRef }: Props) => {
  const { deleteTask } = useTaskStore((state) => state)
  const openDialog = () => dialogRef.current?.showModal()

  return (
    <div className='absolute right-1 bottom-3 flex gap-2 items-center'>
      <button
        onClick={() => deleteTask(taskId)}
        className='hover:bg-gray-200 rounded-md dark:hover:bg-gray-600'
      >
        <Delete />
      </button>
      <button
        onClick={() => openDialog()}
        className='hover:bg-gray-200 rounded-md dark:hover:bg-gray-600'
      >
        <Pen />
      </button>
    </div>
  )
}
