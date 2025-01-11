import { TasksList } from './TasksList'
import { Task } from '../interfaces/task'
import { useMemo, useState } from 'react'
import { Column } from '../interfaces/column'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { TaskCard } from './TaskCard'

export const TaskDashboard = () => {
  const INITIAL_COLUMNS: Column[] = [
    {
      id: 'coming',
      name: 'coming'
    },
    { id: 'done', name: 'done' },
    { id: 'cancel', name: 'cancel' },
    { id: 'archive', name: 'archive' }
  ]
  const INITIAL_TASK: Task[] = [
    {
      id: 'hacer1',
      title: 'hacer 1',
      desc: 'hacer algo',
      date: '2021-10-10',
      status: 'coming'
    },
    {
      id: 'hacer2',
      title: 'hacer 2',
      desc: 'hacer algo 2',
      date: '2021-10-10 2',
      status: 'coming'
    },
    {
      id: 'fix3',
      title: 'fix 3',
      desc: 'revisar 33',
      date: '2021-10-10',
      status: 'done'
    },
    {
      id: 'hacer4',
      title: 'hacer 4',
      desc: 'revisar 33 2',
      date: '2021-10-10 2',
      status: 'done'
    },
    {
      id: 'fix5',
      title: 'fix 5',
      desc: 'revisar 33',
      date: '2021-10-10',
      status: 'archive'
    },
    {
      id: 'hacer6',
      title: 'hacer 6',
      desc: 'revisar 33 2',
      date: '2021-10-10 2',
      status: 'done'
    }
  ]
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASK)
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS)
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  )

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = event
    if (!over) return
    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return
    const isOverColumn = active.data.current?.type === 'Column'
    if (isOverColumn) {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
          (column) => column.id === activeColumnId
        )
        const overColumnIndex = columns.findIndex(
          (column) => column.id === overColumnId
        )
        return arrayMove(columns, activeColumnIndex, overColumnIndex)
      })
    }
  }
  const handleStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
      return
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
      return
    }
  }
  const handleOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return
    const activeId = active.id
    const overId = over.id as string

    if (activeId === overId) return
    const isActiveATask = active.data.current?.type === 'Task'
    const isOverTask = over.data.current?.type === 'Task'

    if (!isActiveATask) return
    // same column
    if (isActiveATask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId)
        const overIndex = tasks.findIndex((task) => task.id === overId)
        tasks[activeIndex].status = tasks[overIndex].status
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }
    //other column
    const isOverColumn = over.data.current?.type === 'Column'
    if (isActiveATask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId)
        tasks[activeIndex].status = overId
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
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
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <TasksList
                  column={activeColumn}
                  tasks={tasks.filter(
                    (task) => task.status === activeColumn.id
                  )}
                />
              )}
              {activeTask && <TaskCard task={activeTask} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </main>
  )
}
