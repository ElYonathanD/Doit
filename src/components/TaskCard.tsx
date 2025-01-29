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
  const today = new Date()
  const taskDate = new Date(task.endDate)

  const isPastOrToday = taskDate <= today
  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`text-left text-sm sm:text-base bg-white dark:bg-gray-700 p-4 rounded-lg list-none h-32 min-h-28 w-full relative shadow-md hover:shadow-lg transition-shadow duration-200 ${
        isDragging
          ? 'opacity-50 border-2 border-dashed border-slate-500 dark:border-slate-400'
          : ''
      }`}
    >
      <TaskActions taskId={task.id} dialogRef={dialogRef} />
      <div
        className='h-full flex flex-col flex-1 justify-between'
        {...attributes}
        {...listeners}
      >
        <h3 className='font-bold text-left line-clamp-2 w-11/12 text-slate-800 dark:text-slate-200'>
          {task.title}
        </h3>
        <p
          style={{
            background: isPastOrToday ? '#ef4444' : '#10b981',
            borderColor: isPastOrToday ? '#fca5a5' : '#34d399'
          }}
          className='w-fit rounded-full px-3 py-1 text-white text-xs font-medium'
        >
          {task.endDate}
        </p>
        {task.priority && <PriorityIndicator />}
      </div>
      <TaskDialog columnName={task.status} task={task} dialogRef={dialogRef} />
    </li>
  )
}
