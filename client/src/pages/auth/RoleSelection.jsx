'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectRole } from '../../features/auth/authSlice'

export default function RoleSelection() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isError, message } = useSelector((state) => state.auth)
  const [selectedRoleId, setSelectedRoleId] = useState(null)

  const [roleNames] = useState({
    3: 'Admin',
    4: "Staff",
    5: 'User'
  })

  useEffect(() => {
    console.log("User data:", user)  // Debugging log for user data
    if (user && !user.roleSelectionRequired) {
      // Redirect to dashboard or appropriate page
      // navigate('/dashboard')
    }
  }, [user, navigate])

  const handleRoleChange = (e) => {
    setSelectedRoleId(parseInt(e.target.value))
  }

  const handleSubmit = () => {
    if (selectedRoleId && user) {
      dispatch(selectRole({ userId: user.id, selectedRole: selectedRoleId }))
      if (selectedRoleId === 3 || selectedRoleId === 4) {
        navigate("/admin")  // Redirect to admin page for roles 3 and 4
      } else if (selectedRoleId === 5) {
        navigate("/dashboard")  // Redirect to user dashboard for role 5
      }
    }
  }

  if (!user || !user.roleSelectionRequired) {
    return null
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
        <div className="text-center">
          <div className="mx-auto bg-blue-500 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14m7-7H5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-blue-800">{user.message || "Please select your role"}</h2>
          <p className="text-blue-600">Choose your role to continue</p>
        </div>
        <div className="space-y-6 mt-6">
          <div className="relative">
            <select
              onChange={handleRoleChange}
              value={selectedRoleId}
              className="w-full border-blue-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select a role</option>
              {user.role.map((roleId) => (
                <option key={roleId} value={roleId}>
                  {roleNames[roleId] || `Role ${roleId}`}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300"
            disabled={!selectedRoleId || isLoading}
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </button>
          {isError && <p className="text-red-500 text-center">{message}</p>}
        </div>
      </div>
    </div>
  )
}
