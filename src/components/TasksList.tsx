import { Column } from '../interfaces/column'
import { Task } from '../interfaces/task'
import { TaskCard } from './TaskCard'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { useMemo, useRef } from 'react'
import { FormTask } from './FormTask'
import { FormColumn } from './FormColumn'
import { Menu } from './Menu'
interface Props {
  tasks: Task[]
  column: Column
}

export const TasksList = ({ column, tasks }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  const dialogRefColumn = useRef<HTMLDialogElement>(null)
  const openDialogColumn = () => dialogRefColumn.current?.showModal()
  const closeDialogColumn = () => dialogRefColumn.current?.close()

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
      className={`flex flex-col flex-shrink-0 p-4 pr-0 min-h-full relative bg-slate-200 dark:bg-gray-700 dark:text-white rounded-lg w-56 ${
        isDragging
          ? 'opacity-50 border-2 border-black dark:border-slate-200'
          : ''
      }`}
    >
      <div className='pr-4'>
        <div className='relative p-4 border-2 border-slate-950 dark:border-slate-400 rounded-lg bg-white dark:bg-gray-900 shadow-slate-500'>
          <Menu column={column} openDialogColumn={openDialogColumn} />
          <FormColumn
            dialogRefColum={dialogRefColumn}
            openDialog={openDialogColumn}
            column={column}
            closeDialog={closeDialogColumn}
          />
          <h2
            {...attributes}
            {...listeners}
            className='text-center font-bold sm:text-lg line-clamp-1'
          >
            {column.name}
          </h2>
        </div>
      </div>
      <div className='h-full overflow-y-auto custom-scroll'>
        <ul className='flex flex-col items-center pr-[13px] pb-14'>
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
          <FormTask
            columnName={column.name}
            dialogRef={dialogRef}
            openDialog={openDialog}
            closeDialog={closeDialog}
          />
        </ul>
      </div>
    </div>
  )
}
