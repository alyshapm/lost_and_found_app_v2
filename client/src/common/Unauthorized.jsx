import React, { useState, useEffect } from 'react'
import { Shield } from 'lucide-react'
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  
  const navigateBasedOnRole = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const userRole = loggedInUser ? loggedInUser.selectedRole : null;
  
    // Navigate based on the user's role
    if (userRole === 3 || userRole === 4) {
      navigate("/admin"); // Redirect to admin page if role is 3 or 4
    } else if (userRole === 5) {
      navigate("/dashboard"); // Redirect to home page if role is 5
    } else {
      navigate("/"); // If the role doesn't match, redirect to unauthorized
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div 
        className={`bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center transform transition-all duration-700 ease-out ${
          isVisible 
            ? 'translate-y-0 opacity-100 rotate-0 scale-100' 
            : 'translate-y-full opacity-0 -rotate-12 scale-90'
        }`}
      >
        <Shield className={`w-16 h-16 text-blue-500 mx-auto mb-4 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'
        }`} />
        <h1 className={`text-2xl font-bold text-blue-600 mb-4 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Unauthorized Access
        </h1>
        <p className={`text-gray-600 mb-6 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          You don't have permission to view this page. If you believe this is an error, please contact your administrator or try logging in again.
        </p>
        <button 
          className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all duration-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          onClick={navigateBasedOnRole}
        >
          Return to Home
        </button>
      </div>
    </div>
  )
}




