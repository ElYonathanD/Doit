import { DragOverlay } from '@dnd-kit/core'
import { TaskCard } from './TaskCard'
import { useTaskStore } from '../store/tasks'
import { createPortal } from 'react-dom'
import { TasksList } from './TasksList'

export const OverlayPortal = () => {
  const { tasks, activeColumn, activeTask } = useTaskStore((state) => state)
  return (
    <>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <TasksList
              column={activeColumn}
              tasks={tasks.filter((task) => task.status === activeColumn.id)}
            />
          )}
          {activeTask && <TaskCard task={activeTask} />}
        </DragOverlay>,
        document.body
      )}
    </>
  )
}
