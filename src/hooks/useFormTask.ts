import { FormEvent, useState } from 'react'
import { useTaskStore } from '../store/tasks'

export const useFormTask = (columnId: string) => {
  const { createTask } = useTaskStore((state) => state)
  const [formTask, setFormTask] = useState({
    title: '',
    desc: '',
    initialDate: '',
    endDate: '',
    priority: false
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target

    setFormTask((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (
      formTask.title &&
      formTask.desc &&
      formTask.initialDate &&
      formTask.endDate
    ) {
      createTask({ ...formTask, id: formTask.title, status: columnId })
      setFormTask({
        title: '',
        desc: '',
        initialDate: '',
        endDate: '',
        priority: false
      })
    }
  }
  return { formTask, handleChange, handleSubmit }
}
