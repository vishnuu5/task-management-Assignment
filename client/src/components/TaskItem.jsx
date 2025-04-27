

import { useState } from "react"
import { format } from "date-fns"
import TaskForm from "./TaskForm"

const TaskItem = ({ task, onToggleStatus, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false)

    const priorityColors = {
        low: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        high: "bg-red-100 text-red-800",
    }

    const handleUpdate = (formData) => {
        onUpdate(task._id, formData)
        setIsEditing(false)
    }

    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), "MMM d, yyyy")
        } catch (error) {
            return "Invalid date"
        }
    }

    if (isEditing) {
        return (
            <div className="mb-4">
                <TaskForm
                    initialData={task}
                    onSubmit={handleUpdate}
                    buttonText="Update Task"
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        )
    }

    return (
        <div
            className={`bg-white p-4 rounded-lg shadow-md mb-4 border-l-4 ${task.completed ? "border-green-500" : "border-indigo-500"
                }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleStatus(task._id, !task.completed)}
                        className="mt-1 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <div className={task.completed ? "line-through text-gray-500" : ""}>
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                            <span className="mr-3">Created: {formatDate(task.createdAt)}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-gray-500 hover:text-indigo-600"
                        disabled={task.completed}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button onClick={() => onDelete(task._id)} className="text-gray-500 hover:text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskItem
