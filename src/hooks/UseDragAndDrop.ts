import { useMemo } from 'react'
import { useTaskStore } from '../store/tasks'
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { CurrentItem } from '../interfaces/currentItem'
import { useColumnStore } from '../store/columns'

export const UseDragAndDrop = () => {
  const { tasks, moveTask, updateActiveTask } = useTaskStore((state) => state)
  const { columns, moveColumns, updateActiveColumn } = useColumnStore(
    (state) => state
  )

  const columnsNames = useMemo(
    () => columns.map((column) => column.name),
    [columns]
  )

  const handleDragEnd = (event: DragEndEvent) => {
    updateActiveTask(null)
    updateActiveColumn(null)
    const { active, over } = event
    if (!over) return
    const activeColumnId = active.id as string
    const overColumnId = over.id as string
    if (activeColumnId === overColumnId) return
    const isOverColumn = active.data.current?.type === 'Column'
    if (isOverColumn) moveColumns(activeColumnId, overColumnId)
  }

  const handleDragStart = (event: DragStartEvent) => {
    updateActiveTask(event.active.data.current as CurrentItem)
    updateActiveColumn(event.active.data.current as CurrentItem)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return
    if (active.id === over.id) return
    moveTask(active, over)
  }
  return {
    tasks,
    columns,
    columnsNames,
    handleDragEnd,
    handleDragStart,
    handleDragOver
  }
}
