import { Task } from '../interfaces/task'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Delete } from './icons/Delete'
import { useTaskStore } from '../store/tasks'

interface Props {
  task: Task
}
export const TaskCard = ({ task }: Props) => {
  const { deleteTask } = useTaskStore((state) => state)
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
      className={`text-sm sm:text-base bg-slate-100 mt-4 p-3 rounded-lg list-none relative dark:bg-gray-800 dark:text-white ${
        isDragging
          ? 'opacity-50 border-2 border-black dark:border-slate-100'
          : ''
      }`}
    >
      <button
        onClick={() => deleteTask(task.id)}
        className='absolute right-1 top-1 z-10'
      >
        <Delete />
      </button>
      <div style={style} {...attributes} {...listeners}>
        <h3 className='font-bold text-left'>{task.title}</h3>
        <div className='flex justify-between'>
          <p>{task.endDate}</p>
          <p>{task.status}</p>
        </div>
      </div>
    </li>
  )
}
