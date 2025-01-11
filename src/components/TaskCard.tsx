import { Task } from '../interfaces/task'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  task: Task
}
export const TaskCard = ({ task }: Props) => {
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
      {...attributes}
      {...listeners}
      className={`text-sm sm:text-base bg-slate-100 mt-4 p-3 rounded-lg list-none dark:bg-gray-800 dark:text-white ${
        isDragging
          ? 'opacity-50 border-2 border-black dark:border-slate-100'
          : ''
      }`}
    >
      <h3 className='font-bold text-left'>{task.title}</h3>
      <div className='flex justify-between'>
        <p>{task.date}</p>
        <p>{task.status}</p>
      </div>
    </li>
  )
}
