import { DragOverlay } from '@dnd-kit/core'
import { TaskCard } from './TaskCard'
import { useTaskStore } from '../store/tasks'
import { createPortal } from 'react-dom'
import { TasksList } from './TasksList'
import { useColumnStore } from '../store/columns'

export const OverlayPortal = () => {
  const { tasks, activeTask } = useTaskStore((state) => state)
  const { activeColumn } = useColumnStore((state) => state)
  return (
    <>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <TasksList
              column={activeColumn}
              tasks={tasks.filter((task) => task.status === activeColumn.name)}
            />
          )}
          {activeTask && <TaskCard task={activeTask} />}
        </DragOverlay>,
        document.body
      )}
    </>
  )
}
