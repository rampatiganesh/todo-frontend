"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import TaskCard from "./components/TaskCard"

type Task = {
  id: number
  title: string
  color: string
  completed: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  // fetch tasks
  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then(res => res.json())
      .then(setTasks)
  }, [])

  // toggle completed
  const toggleTask = async (id: number, completed: boolean) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    })
    const updated = await res.json()
    setTasks(tasks.map(t => (t.id === id ? updated : t)))
  }

  // delete with confirmation
  const deleteTask = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return
    await fetch(`http://localhost:4000/tasks/${id}`, { method: "DELETE" })
    setTasks(tasks.filter(t => t.id !== id))
  }

  // counts
  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <p className="mb-4 text-gray-600">
        Tasks: {total} | Completed: {completed} of {total}
      </p>

      {/* Create Task button */}
      <Link
        href="/create"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Create Task
      </Link>

      {/* Task list */}
      <ul className="space-y-2 mt-4">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  )
}
