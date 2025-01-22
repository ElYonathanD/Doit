import { Task } from '../interfaces/task'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Delete } from './icons/Delete'
import { useTaskStore } from '../store/tasks'
import { useRef } from 'react'
import { FormTask } from './FormTask'
import { Pen } from './icons/Pen'
import { Flag } from './icons/Flag'

interface Props {
  task: Task
}
export const TaskCard = ({ task }: Props) => {
  const { deleteTask } = useTaskStore((state) => state)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id, data: { type: 'Task', task } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`text-left text-sm sm:text-base bg-slate-100 mt-4 p-3 rounded-lg list-none h-28 min-h-24 w-full relative dark:bg-gray-800 dark:text-white
      shadow-slate-500 shadow-sm dark:shadow-none ${
        isDragging
          ? 'opacity-50 border-2 border-black dark:border-slate-100'
          : ''
      }`}
    >
      <div className='absolute right-1 bottom-3 flex gap-2 items-center'>
        <button
          onClick={() => deleteTask(task.id)}
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
      <div
        className='h-full flex flex-col flex-1 justify-between'
        {...attributes}
        {...listeners}
      >
        <h3 className='font-bold text-left line-clamp-2'>{task.title}</h3>
        <p>{task.endDate}</p>
        {task.priority && (
          <div className='absolute right-1 top-3'>
            <Flag />
          </div>
        )}
      </div>
      <FormTask
        columnName={task.status}
        task={task}
        dialogRef={dialogRef}
        openDialog={openDialog}
        closeDialog={closeDialog}
      />
    </li>
  )
}
