import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

export default function Profile({ tasks }) {
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()
  const user = state.user

  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)

  const countByPriority = (p) => tasks.filter((t) => t.priority === p).length
  const maxCount = Math.max(1, total)

  const handleSignOut = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  return (
    <div className="page">
      <div className="page-label">Profile</div>
      <div className="page-title" style={{ marginBottom: '1.5rem' }}>Account</div>

      <div className="profile-card">
        <div className="profile-header-row">
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-email">{user.email}</div>
            <div className="online-badge">
              <div className="online-dot" />
              Logged In
            </div>
          </div>
        </div>
        <div className="profile-stats">
          <div className="pstat">
            <div className="pstat-label">Total Tasks</div>
            <div className="pstat-val blue">{total}</div>
          </div>
          <div className="pstat">
            <div className="pstat-label">Completed</div>
            <div className="pstat-val cyan">{completed}</div>
          </div>
          <div className="pstat">
            <div className="pstat-label">Pending</div>
            <div className="pstat-val red">{pending}</div>
          </div>
          <div className="pstat">
            <div className="pstat-label">Completion</div>
            <div className="pstat-val pct">{pct}%</div>
          </div>
        </div>
      </div>

      <div className="priority-chart-card">
        <div className="chart-title">Tasks by Priority</div>
        {['High', 'Medium', 'Low'].map((p) => (
          <div className="chart-row" key={p}>
            <div className={`chart-label ${p.toLowerCase()}`}>{p}</div>
            <div className="chart-bar-bg">
              <div
                className={`chart-bar-fill ${p.toLowerCase()}`}
                style={{ width: `${(countByPriority(p) / maxCount) * 100}%` }}
              />
            </div>
            <div className="chart-count">{countByPriority(p)}</div>
          </div>
        ))}
      </div>

      <button className="btn-signout" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}
