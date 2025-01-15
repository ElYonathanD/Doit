import { Column } from '../interfaces/column'
import { Task } from '../interfaces/task'
import { TaskCard } from './TaskCard'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { useMemo } from 'react'
import { Delete } from './icons/Delete'
import { useTaskStore } from '../store/tasks'
interface Props {
  tasks: Task[]
  column: Column
}

export const TasksList = ({ column, tasks }: Props) => {
  const { deleteColumn } = useTaskStore((state) => state)
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
      className={`flex-shrink-0 p-4 min-h-full  bg-slate-200 dark:bg-gray-700 dark:text-white rounded-lg w-36 sm:w-40 md:w-48 lg:w-56 ${
        isDragging
          ? 'opacity-50 border-2 border-black dark:border-slate-200'
          : ''
      }`}
    >
      <div className='relative p-4 border-2 border-slate-950 dark:border-slate-100 rounded-lg'>
        <button
          onClick={() => deleteColumn(column.id)}
          className='absolute right-1 top-1'
        >
          <Delete />
        </button>
        <h2
          {...attributes}
          {...listeners}
          className='text-center font-bold overflow-auto sm:text-lg'
        >
          {column.name}
        </h2>
      </div>
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
