import { useMemo } from 'react'
import { useTaskStore } from '../store/tasks'
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { CurrentItem } from '../interfaces/currentItem'

export const UseDragAndDrop = () => {
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

  const handleDragStart = (event: DragStartEvent) => {
    updateActive(event.active.data.current as CurrentItem)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return
    if (active.id === over.id) return
    changeTasks(active, over)
  }
  return {
    tasks,
    columns,
    columnsIds,
    handleDragEnd,
    handleDragStart,
    handleDragOver
  }
}
