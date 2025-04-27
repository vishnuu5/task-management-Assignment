
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [formErrors, setFormErrors] = useState({})
    const { login, loading, error } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        // Clear error when field is edited
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: null,
            })
        }
    }

    const validate = () => {
        const errors = {}

        if (!formData.email) {
            errors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid"
        }

        if (!formData.password) {
            errors.password = "Password is required"
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validate()) {
            const success = await login(formData)
            if (success) {
                navigate("/dashboard")
            }
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter your email"
                        />
                        {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.password ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter your password"
                        />
                        {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
