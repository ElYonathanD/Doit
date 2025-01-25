import { Task } from '../interfaces/task'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useRef } from 'react'
import { TaskDialog } from './TaskDialog'
import { TaskActions } from './TaskActions'
import { PriorityIndicator } from './PriorityIndicator '

interface Props {
  task: Task
}
export const TaskCard = ({ task }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

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
      <TaskActions taskId={task.id} dialogRef={dialogRef} />
      <div
        className='h-full flex flex-col flex-1 justify-between'
        {...attributes}
        {...listeners}
      >
        <h3 className='font-bold text-left line-clamp-2 w-11/12'>
          {task.title}
        </h3>
        <p>{task.endDate}</p>
        {task.priority && <PriorityIndicator />}
      </div>
      <TaskDialog columnName={task.status} task={task} dialogRef={dialogRef} />
    </li>
  )
}
