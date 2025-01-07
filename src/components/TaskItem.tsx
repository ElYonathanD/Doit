import { Task } from '../interfaces/task'

interface Props {
  task: Task
}
const TaskItem = ({ task }: Props) => {
  return (
    <li className='text-sm sm:text-base bg-slate-100 mt-4 p-3 dark:bg-gray-800 rounded-lg'>
      <h3 className='font-bold text-left'>{task.title}</h3>
      <div className='flex justify-between'>
        <p>{task.date}</p>
        <p>{task.status}</p>
      </div>
    </li>
  )
}

export default TaskItem
