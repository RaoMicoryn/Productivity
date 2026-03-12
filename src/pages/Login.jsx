import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export default function Login() {
  const { dispatch } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email is required'
    if (!form.password.trim()) errs.password = 'Password is required'
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      dispatch({
        type: 'LOGIN',
        payload: { email: form.email, name: form.email.split('@')[0] },
      })
      navigate('/dashboard')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-title">
          Welcome <span>back.</span>
        </div>
        <div className="login-sub">Sign in to your workspace</div>

        <div className="field-group">
          <div className="field-label">Email</div>
          <input
            className={`field-input ${errors.email ? 'error' : ''}`}
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-msg">⚠ {errors.email}</div>}
        </div>

        <div className="field-group">
          <div className="field-label">Password</div>
          <input
            className={`field-input ${errors.password ? 'error' : ''}`}
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error-msg">⚠ {errors.password}</div>}
        </div>

        <button className="btn-primary" onClick={handleSubmit}>
          Sign In →
        </button>
        <div className="login-hint">Use any email + password to continue | Support mobile / tablet :B </div>
      </div>
    </div>
  )
}
