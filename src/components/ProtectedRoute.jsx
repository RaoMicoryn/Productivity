import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { state } = useAuth()
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}
