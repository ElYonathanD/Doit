import { Column } from '../interfaces/column'
import { Task } from '../interfaces/task'
import { TaskCard } from './TaskCard'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { useMemo, useRef } from 'react'
import { Delete } from './icons/Delete'
import { useTaskStore } from '../store/tasks'
import { FormTask } from './FormTask'
import { Pen } from './icons/Pen'
import { FormColumn } from './FormColumn'
interface Props {
  tasks: Task[]
  column: Column
}

export const TasksList = ({ column, tasks }: Props) => {
  const { deleteColumn } = useTaskStore((state) => state)
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
      className={`flex-shrink-0 p-4 min-h-full  bg-slate-200 dark:bg-gray-700 dark:text-white rounded-lg w-36 sm:w-40 md:w-48 lg:w-56 ${
        isDragging
          ? 'opacity-50 border-2 border-black dark:border-slate-200'
          : ''
      }`}
    >
      <div className='relative p-4 border-2 border-slate-950 dark:border-slate-100 rounded-lg'>
        <div className='absolute right-1 top-1 z-10 flex gap-2 items-center'>
          <button onClick={() => deleteColumn(column)}>
            <Delete />
          </button>
          <button onClick={() => openDialogColumn()}>
            <Pen />
          </button>
        </div>
        <FormColumn
          dialogRefColum={dialogRefColumn}
          openDialog={openDialogColumn}
          column={column}
          closeDialog={closeDialogColumn}
        />
        <h2
          {...attributes}
          {...listeners}
          className='text-center font-bold overflow-auto sm:text-lg'
        >
          {column.name}
        </h2>
      </div>
      <ul className='flex flex-col items-center'>
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
  )
}
