
import { useState, useMemo } from "react"
import TaskForm from "../components/TaskForm"
import TaskItem from "../components/TaskItem"
import TaskFilter from "../components/TaskFilter"
import { useTasks } from "../hooks/useTasks"

const Dashboard = () => {
    const { tasks, loading, error, filter, setFilter, addTask, updateTask, deleteTask, toggleTaskStatus, refreshTasks } =
        useTasks()

    const [showForm, setShowForm] = useState(false)

    const handleAddTask = async (taskData) => {
        try {
            await addTask(taskData)
            setShowForm(false)
        } catch (err) {
            console.error("Failed to add task:", err)
        }
    }

    const handleUpdateTask = async (id, taskData) => {
        try {
            await updateTask(id, taskData)
        } catch (err) {
            console.error("Failed to update task:", err)
        }
    }

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id)
        } catch (err) {
            console.error("Failed to delete task:", err)
        }
    }

    const handleToggleStatus = async (id, completed) => {
        try {
            await toggleTaskStatus(id, completed)
        } catch (err) {
            console.error("Failed to toggle task status:", err)
        }
    }

    // Calculate counts for filter buttons
    const counts = useMemo(() => {
        const all = tasks.length
        const completed = tasks.filter((task) => task.completed).length
        const active = all - completed

        return { all, active, completed }
    }, [tasks])

    if (loading && tasks.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Tasks</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    {showForm ? "Cancel" : "+ Add Task"}
                </button>
            </div>

            {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">{error}</div>}

            {showForm && (
                <div className="mb-6">
                    <TaskForm onSubmit={handleAddTask} />
                </div>
            )}

            <TaskFilter filter={filter} setFilter={setFilter} counts={counts} />

            {tasks.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <p className="text-gray-500">No tasks found. Add a new task to get started!</p>
                </div>
            ) : (
                <div>
                    {tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onToggleStatus={handleToggleStatus}
                            onDelete={handleDeleteTask}
                            onUpdate={handleUpdateTask}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard
