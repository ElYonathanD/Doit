import { FormEvent, useState } from 'react'
import { useTaskStore } from '../store/tasks'
import { Task } from '../interfaces/task'

export const useFormTask = (
  columnName: string,
  closeDialog: () => void,
  task?: Task
) => {
  const { createTask, editTask } = useTaskStore((state) => state)
  const [formTask, setFormTask] = useState(
    task || {
      id: '',
      title: '',
      desc: '',
      initialDate: '',
      endDate: '',
      status: '',
      priority: false
    }
  )
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
      if (!task) {
        createTask({ ...formTask, status: columnName })
        setFormTask({
          id: '',
          title: '',
          desc: '',
          initialDate: '',
          endDate: '',
          status: '',
          priority: false
        })
      } else {
        editTask(formTask)
      }

      closeDialog()
    }
  }
  return { formTask, handleChange, handleSubmit }
}
