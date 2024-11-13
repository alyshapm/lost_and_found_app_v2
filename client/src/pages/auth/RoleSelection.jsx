

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRole } from '../../features/auth/authSlice'
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const dispatch = useDispatch()
  const { user, isLoading, isError, message } = useSelector((state) => state.auth)
  const [selectedRoleId, setSelectedRoleId] = useState(null)

  const [roleNames] = useState({
    3: 'Admin',
    4: 'Staff',
    5: 'User',
  })
  const navigate = useNavigate()
  useEffect(() => {
    if (user && !user.roleSelectionRequired) {
      if (user.selectedRole === 3 || user.selectedRole === 4) {
        navigate("/admin");
      } else if (user.selectedRole === 5) {
        navigate("/dashboard");
      }
    }
  }, [user.selectedRole, user.roleSelectionRequired, navigate]);
  
  
  const handleRoleChange = (e) => {
    setSelectedRoleId(parseInt(e.target.value))
  }

  const handleSubmit = () => {
    if (selectedRoleId && user) {
      console.log('Submitting role:', selectedRoleId)
      dispatch(selectRole({ userId: user.id, selectedRole: selectedRoleId }))
  }

  if (!user) {
    console.log('No user data available')
    return <div className="text-red-500 text-center mt-4">Loading user data...</div>
  }



  console.log('Rendering role selection component')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-2">
          {user.message || "Please select your role"}
        </h2>
        <p className="text-blue-600 text-center mb-6">Choose your role to continue</p>
        <div className="space-y-6">
          <div className="relative">
            <select
              onChange={handleRoleChange}
              className="block appearance-none w-full bg-white border border-blue-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            >
              <option value="">Select a role</option>
              {user?.role?.map((roleId) => (
                <option key={roleId} value={roleId}>
                  {roleNames[roleId] || `Role ${roleId}`}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!selectedRoleId || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </button>
        </div>
        {isError && <p className="text-red-500 text-center mt-4">{message}</p>}
      </div>
    </div>
  )
}