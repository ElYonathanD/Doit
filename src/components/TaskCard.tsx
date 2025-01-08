import { useDraggable } from '@dnd-kit/core'
import { Task } from '../interfaces/task'

interface Props {
  task: Task
}
export const TaskCard = ({ task }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id
  })

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
      }
    : undefined
  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className='text-sm sm:text-base bg-slate-100 mt-4 p-3 dark:bg-gray-800 rounded-lg'
      style={style}
    >
      <h3 className='font-bold text-left'>{task.title}</h3>
      <div className='flex justify-between'>
        <p>{task.date}</p>
        <p>{task.status}</p>
      </div>
    </li>
  )
}
