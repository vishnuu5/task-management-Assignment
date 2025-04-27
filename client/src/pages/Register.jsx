
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [formErrors, setFormErrors] = useState({})
    const { register, loading, error } = useAuth()
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

        if (!formData.name.trim()) {
            errors.name = "Name is required"
        }

        if (!formData.email) {
            errors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid"
        }

        if (!formData.password) {
            errors.password = "Password is required"
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters"
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validate()) {
            const { confirmPassword, ...userData } = formData
            const success = await register(userData)
            if (success) {
                navigate("/dashboard")
            }
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter your name"
                        />
                        {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                    </div>

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

                    <div className="mb-4">
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

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Confirm your password"
                        />
                        {formErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
