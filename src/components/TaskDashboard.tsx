import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { TasksList } from './TasksList'
import { Task } from '../interfaces/task'
import { useState } from 'react'
import { Column } from '../interfaces/column'

export const TaskDashboard = () => {
  const columns: Column[] = [
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
      id: 'c1',
      title: 'hacer',
      desc: 'hacer algo',
      date: '2021-10-10',
      status: 'coming'
    },
    {
      id: 'c2',
      title: 'hacer 2',
      desc: 'hacer algo 2',
      date: '2021-10-10 2',
      status: 'coming'
    },
    {
      id: 'd1',
      title: 'fix',
      desc: 'revisar 33',
      date: '2021-10-10',
      status: 'done'
    },
    {
      id: 'd2',
      title: 'hacer 2',
      desc: 'revisar 33 2',
      date: '2021-10-10 2',
      status: 'done'
    },
    {
      id: 'dd1',
      title: 'fix',
      desc: 'revisar 33',
      date: '2021-10-10',
      status: 'done'
    },
    {
      id: 'dd2',
      title: 'hacer 2',
      desc: 'revisar 33 2',
      date: '2021-10-10 2',
      status: 'done'
    }
  ]
  const [tasks, setTasks] = useState(INITIAL_TASK)
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const newStatus = over.id as Task['status']
    const taskId = active.id as string
    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }
  return (
    <main className='w-full bg-slate-300 dark:bg-gray-600'>
      <div className='flex gap-4 p-6 h-screen overflow-auto'>
        <DndContext onDragEnd={handleDragEnd}>
          {columns.map((column) => (
            <TasksList
              tasks={tasks.filter((t) => t.status == column.id)}
              column={column}
              key={column.id}
            />
          ))}
        </DndContext>
      </div>
    </main>
  )
}
