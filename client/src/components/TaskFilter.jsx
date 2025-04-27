

const TaskFilter = ({ filter, setFilter, counts }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-6">
            <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
            >
                All {counts.all > 0 && `(${counts.all})`}
            </button>
            <button
                onClick={() => setFilter("active")}
                className={`px-4 py-2 rounded-md ${filter === "active" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
            >
                Active {counts.active > 0 && `(${counts.active})`}
            </button>
            <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-2 rounded-md ${filter === "completed" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
            >
                Completed {counts.completed > 0 && `(${counts.completed})`}
            </button>
        </div>
    )
}

export default TaskFilter
