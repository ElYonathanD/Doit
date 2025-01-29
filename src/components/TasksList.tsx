import { Column } from '../interfaces/column'
import { Task } from '../interfaces/task'
import { TaskCard } from './TaskCard'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { useMemo, useRef } from 'react'
import { TaskDialog } from './TaskDialog'
import { ColumnDialog } from './ColumnDialog'
import { Menu } from './Menu'
interface Props {
  tasks: Task[]
  column: Column
}

export const TasksList = ({ column, tasks }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const dialogRefColumn = useRef<HTMLDialogElement>(null)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column.name, data: { type: 'Column', column } })

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks])
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col flex-shrink-0 p-4 pr-0 min-h-full relative bg-slate-200 dark:bg-gray-800 rounded-lg w-64 shadow-lg ${
        isDragging
          ? 'opacity-50 border-2 border-dashed border-slate-500 dark:border-slate-400'
          : ''
      }`}
    >
      <div className='pr-4'>
        <div className='relative p-4 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-gray-900 shadow-sm'>
          <Menu column={column} dialogRefColumn={dialogRefColumn} />
          <ColumnDialog dialogRefColum={dialogRefColumn} column={column} />
          <h2
            {...attributes}
            {...listeners}
            className='text-center font-bold text-lg text-slate-800 dark:text-slate-200 line-clamp-1'
          >
            {column.name}
          </h2>
        </div>
      </div>
      <div className='h-full overflow-y-auto custom-scroll mt-4'>
        <ul className='flex flex-col items-center pr-[13px] pb-16 gap-3'>
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
          <TaskDialog columnName={column.name} dialogRef={dialogRef} />
        </ul>
      </div>
    </div>
  )
}
