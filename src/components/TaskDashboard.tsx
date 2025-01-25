import { TasksList } from './TasksList'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { OverlayPortal } from './OverlayPortal'
import { UseDragAndDrop } from '../hooks/UseDragAndDrop'
import { useRef } from 'react'
import { ColumnDialog } from './ColumnDialog'

export const TaskDashboard = () => {
  const {
    columnsNames,
    columns,
    tasks,
    handleDragEnd,
    handleDragStart,
    handleDragOver
  } = UseDragAndDrop()

  const dialogRefColum = useRef<HTMLDialogElement>(null)

  return (
    <main className='w-full flex-grow bg-slate-300 dark:bg-gray-600 overflow-hidden'>
      <div className='flex gap-8 p-6 overflow-auto h-full'>
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <SortableContext items={columnsNames}>
            {columns.map((column) => (
              <TasksList
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.name)}
              />
            ))}
          </SortableContext>
          <ColumnDialog dialogRefColum={dialogRefColum} />
          <OverlayPortal />
        </DndContext>
      </div>
    </main>
  )
}
