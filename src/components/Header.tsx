import { ButtonTheme } from './ButtonTheme'

export const Header = () => {
  return (
    <header className='bg-slate-200 dark:bg-gray-800 w-full flex items-center justify-between px-8 py-2 h-16 shadow-sm'>
      <h1 className='dark:text-white text-3xl font-bold'>
        DO<span className='text-2xl font-semibold'>it</span>
      </h1>
      <ButtonTheme />
    </header>
  )
}
