import { TasksList } from './TasksList'

export const TaskDashboard = () => {
  const all = [
    {
      name: 'comming',
      task: [
        {
          title: 'hacer',
          desc: 'hacer algo',
          date: '2021-10-10',
          status: 'pendiente'
        },
        {
          title: 'hacer 2',
          desc: 'hacer algo 2',
          date: '2021-10-10 2',
          status: 'pendiente 2'
        }
      ]
    },
    {
      name: 'done',
      task: [
        {
          title: 'fix',
          desc: 'revisar 33',
          date: '2021-10-10',
          status: 'done'
        },
        {
          title: 'hacer 2',
          desc: 'revisar 33 2',
          date: '2021-10-10 2',
          status: 'done 2'
        }
      ]
    },
    {
      name: 'done 2',
      task: [
        {
          title: 'fix',
          desc: 'revisar 33',
          date: '2021-10-10',
          status: 'done'
        },
        {
          title: 'hacer 2',
          desc: 'revisar 33 2',
          date: '2021-10-10 2',
          status: 'done 2'
        }
      ]
    }
  ]
  return (
    <main className='w-full bg-slate-300 dark:bg-gray-600'>
      <div className='flex gap-4 p-6 h-screen overflow-auto'>
        {all.map((list) => (
          <TasksList list={list} key={list.name} />
        ))}
      </div>
    </main>
  )
}
