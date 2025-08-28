"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

type Task = {
  id: number
  title: string
  color: string
  completed: boolean
}

export default function EditTaskPage() {
  const { id } = useParams()
  const router = useRouter()

  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:4000/tasks/${id}`)
        if (!res.ok) throw new Error("Failed to fetch task")
        const data = await res.json()
        setTask(data)
      } catch (err) {
        console.error(err)
        setError("Could not fetch task")
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchTask()
  }, [id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!task?.title.trim()) {
      setError("Title is required")
      return
    }

    setSaving(true)
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          color: task.color,
          completed: task.completed,
        }),
      })
      router.push("/")
    } catch (err) {
      console.error(err)
      setError("Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="p-4">Loading...</p>
  if (!task) return <p className="p-4 text-red-600">Task not found</p>

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSave} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={task.title}
            onChange={e => setTask({ ...task, title: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Task title"
            autoFocus
            required
          />
        </div>

        {/* Color */}
        <div>
          <label className="block mb-1 font-medium">Color</label>
          <select
            value={task.color}
            onChange={e => setTask({ ...task, color: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
          </select>
        </div>

        {/* Completed checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={e =>
              setTask({ ...task, completed: e.target.checked })
            }
          />
          Mark as Completed
        </label>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className={`px-4 py-2 rounded text-white ${
              saving ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
