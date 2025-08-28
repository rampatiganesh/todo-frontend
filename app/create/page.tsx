"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateTask() {
  const [title, setTitle] = useState("")
  const [color, setColor] = useState("blue")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    await fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, color }),
    })

    router.push("/") // go back to home after creating
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Enter task title"
        />
        <select
          value={color}
          onChange={e => setColor(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Save Task
        </button>
      </form>
    </div>
  )
}
