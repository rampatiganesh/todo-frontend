"use client"
import { useRouter } from "next/navigation"

type Task = {
  id: number
  title: string
  color: string
  completed: boolean
}

type Props = {
  task: Task
  onToggle: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
}

export default function TaskCard({ task, onToggle, onDelete }: Props) {
  const router = useRouter()

  return (
    <li className="flex items-center justify-between border p-2 rounded">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id, task.completed)}
      />

      {/* Title */}
      <span
        className={`flex-1 ml-2 ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
        style={{ color: task.color }}
      >
        {task.title}
      </span>

      {/* Edit button */}
      <button
        onClick={() => router.push(`/edit/${task.id}`)}
        className="text-blue-600 ml-2"
        title="Edit Task"
      >
        Edit
      </button>

      {/* Delete button */}
      <button
        onClick={() => {
          if (confirm("Are you sure you want to delete this task?")) {
            onDelete(task.id)
          }
        }}
        className="text-red-600 ml-2"
        title="Delete Task"
      >
        Delete
      </button>
    </li>
  )
}
