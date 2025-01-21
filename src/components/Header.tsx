import { ButtonTheme } from './ButtonTheme'

export const Header = () => {
  return (
    <header className='bg-slate-100 dark:bg-gray-800 w-full flex items-center justify-between px-8 py-2 h-16'>
      <h1 className='dark:text-white'>Task</h1>
      <ButtonTheme />
    </header>
  )
}
