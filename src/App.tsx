import './App.css'
import { Header } from './components/Header'
import { TaskDashboard } from './components/TaskDashboard'

function App() {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <TaskDashboard />
    </div>
  )
}

export default App
