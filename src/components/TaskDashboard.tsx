import { TasksList } from './TasksList'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { OverlayPortal } from './OverlayPortal'
import { UseDragAndDrop } from '../hooks/UseDragAndDrop'
import { useRef } from 'react'
import { FormColumn } from './FormColumn'

export const TaskDashboard = () => {
  const {
    columnsIds,
    columns,
    tasks,
    handleDragEnd,
    handleDragStart,
    handleDragOver
  } = UseDragAndDrop()

  const dialogRef = useRef<HTMLDialogElement>(null)
  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  return (
    <main className='w-full bg-slate-300 dark:bg-gray-600'>
      <div className='flex gap-8 p-6 h-screen overflow-auto'>
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <SortableContext items={columnsIds}>
            {columns.map((column) => (
              <TasksList
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            ))}
          </SortableContext>
          <FormColumn
            dialogRef={dialogRef}
            openDialog={openDialog}
            closeDialog={closeDialog}
          />
          <OverlayPortal />
        </DndContext>
      </div>
    </main>
  )
}
