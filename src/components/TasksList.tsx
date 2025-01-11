import { Column } from '../interfaces/column'
import { Task } from '../interfaces/task'
import { TaskCard } from './TaskCard'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { useMemo } from 'react'
interface Props {
  tasks: Task[]
  column: Column
}

export const TasksList = ({ column, tasks }: Props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column.id, data: { type: 'Column', column } })

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks])
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex-shrink-0 p-4 min-h-full bg-slate-200 dark:bg-gray-700 dark:text-white rounded-lg w-36 sm:w-40 md:w-48 lg:w-56 ${
        isDragging
          ? 'opacity-50 border-2 border-black dark:border-slate-200'
          : ''
      }`}
    >
      <h2
        {...attributes}
        {...listeners}
        className='text-center font-bold overflow-auto sm:text-lg'
      >
        {column.name}
      </h2>
      <ul>
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </ul>
    </div>
  )
}
