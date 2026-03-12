import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

export default function Dashboard({ tasks }) {
  const { state } = useAuth()
  const navigate = useNavigate()
  const user = state.user

  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
  const recent = [...tasks].slice(-3).reverse()

  return (
    <div className="page">
      <div className="page-label">Dashboard</div>
      <div className="page-title">
        Hey, <span className="cyan-text">{user.name}</span>
      </div>
      <div className="page-email">{user.email}</div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-num blue">{total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-num green">{completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-num red">{pending}</div>
          <div className="stat-label">Pending</div>
        </div>
      </div>

      <div className="progress-card">
        <div className="progress-header">
          <span>Completion Rate</span>
          <span className="progress-pct">{pct}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="recent-card">
        <div className="recent-header">
          <span>Recent Tasks</span>
          <button className="view-all" onClick={() => navigate('/tasks')}>
            View all →
          </button>
        </div>
        {recent.length === 0 && (
          <div className="empty-state">No tasks yet. Add some!</div>
        )}
        {recent.map((t) => (
          <div className="task-row" key={t.id}>
            <div className={`task-dot ${t.completed ? 'dot-green' : 'dot-red'}`} />
            <span className={`task-name ${t.completed ? 'done' : ''}`}>{t.title}</span>
            <span className={`badge badge-${t.priority.toLowerCase()}`}>{t.priority}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
