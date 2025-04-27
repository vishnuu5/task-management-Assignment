
import { useState } from "react"

const TaskForm = ({ onSubmit, initialData = null, buttonText = "Add Task", onCancel = null }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        priority: initialData?.priority || "medium",
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            })
        }
    }

    const validate = () => {
        const newErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = "Title is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            onSubmit(formData)

            // Only reset form if it's a new task (not editing)
            if (!initialData) {
                setFormData({
                    title: "",
                    description: "",
                    priority: "medium",
                })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.title ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Enter task title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter task description"
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="priority" className="block text-gray-700 font-medium mb-2">
                    Priority
                </label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="flex justify-end space-x-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                    {buttonText}
                </button>
            </div>
        </form>
    )
}

export default TaskForm
