import { TaskList } from '../interfaces/taskList'
import TaskItem from './TaskItem'

interface Props {
  list: TaskList
}

export const TasksList = ({ list }: Props) => {
  return (
    <section className='flex-shrink-0 p-4 w-36 sm:w-40 md:w-48 lg:w-56 bg-slate-200 dark:bg-gray-700 dark:text-white rounded-lg'>
      <h2 className='font-bold overflow-auto sm:text-lg'>{list.name}</h2>
      <ul>
        {list.task.map((task) => (
          <TaskItem key={task.title} task={task} />
        ))}
      </ul>
    </section>
  )
}
