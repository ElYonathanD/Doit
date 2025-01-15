import { TasksList } from './TasksList'
import { useMemo } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useTaskStore } from '../store/tasks'
import { CurrentItem } from '../interfaces/currentItem'
import { OverlayPortal } from './OverlayPortal'
import { CreateColumn } from './CreateColumn'

export const TaskDashboard = () => {
  const { columns, tasks, changeColumns, changeTasks, updateActive } =
    useTaskStore((state) => state)

  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  )

  const handleDragEnd = (event: DragEndEvent) => {
    updateActive(null)
    const { active, over } = event
    if (!over) return
    const activeColumnId = active.id as string
    const overColumnId = over.id as string

    if (activeColumnId === overColumnId) return
    const isOverColumn = active.data.current?.type === 'Column'
    if (isOverColumn) changeColumns(activeColumnId, overColumnId)
  }

  const handleStart = (event: DragStartEvent) => {
    updateActive(event.active.data.current as CurrentItem)
  }

  const handleOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return
    if (active.id === over.id) return
    changeTasks(active, over)
  }

  return (
    <main className='w-full bg-slate-300 dark:bg-gray-600'>
      <div className='flex gap-8 p-6 h-screen overflow-auto'>
        <DndContext
          onDragStart={handleStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleOver}
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
