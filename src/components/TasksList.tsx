import { useDroppable } from '@dnd-kit/core'
import { Column } from '../interfaces/column'
import { Task } from '../interfaces/task'
import { TaskCard } from './TaskCard'

interface Props {
  tasks: Task[]
  column: Column
}

export const TasksList = ({ column, tasks }: Props) => {
  const { setNodeRef } = useDroppable({ id: column.id })
  return (
    <section
      ref={setNodeRef}
      className='flex-shrink-0 p-4 w-36 sm:w-40 md:w-48 lg:w-56 bg-slate-200 dark:bg-gray-700 dark:text-white rounded-lg'
    >
      <h2 className='font-bold overflow-auto sm:text-lg'>{column.name}</h2>
      <ul>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
    </section>
  )
}
