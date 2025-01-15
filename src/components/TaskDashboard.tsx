import { TasksList } from './TasksList'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { OverlayPortal } from './OverlayPortal'
import { CreateColumn } from './CreateColumn'
import { UseDragAndDrop } from '../hooks/UseDragAndDrop'

export const TaskDashboard = () => {
  const {
    columnsIds,
    columns,
    tasks,
    handleDragEnd,
    handleDragStart,
    handleDragOver
  } = UseDragAndDrop()

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
          <CreateColumn />
          <OverlayPortal />
        </DndContext>
      </div>
    </main>
  )
}
