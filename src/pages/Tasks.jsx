import { useState } from 'react'
import './Tasks.css'

export default function Tasks({ tasks, dispatch }) {
  const [form, setForm] = useState({ title: '', category: 'Work', priority: 'Medium' })
  const [errors, setErrors] = useState({})
  const [filter, setFilter] = useState('All')

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleAdd = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Task title is required'
    setErrors(errs)
    if (!errs.title) {
      dispatch({
        type: 'ADD_TASK',
        payload: { title: form.title, category: form.category, priority: form.priority },
      })
      setForm({ title: '', category: 'Work', priority: 'Medium' })
      setErrors({})
    }
  }

  const counts = {
    All: tasks.length,
    Pending: tasks.filter((t) => !t.completed).length,
    Completed: tasks.filter((t) => t.completed).length,
  }

  const filtered = tasks.filter((t) => {
    if (filter === 'Pending') return !t.completed
    if (filter === 'Completed') return t.completed
    return true
  })

  return (
    <div className="page">
      <div className="page-label">Task Manager</div>
      <div className="page-title" style={{ marginBottom: '1.5rem' }}>My Tasks</div>

      <div className="add-task-card">
        <div className="add-task-title">Add New Task</div>
        <div className="field-label">Task Title</div>
        <input
          className={`field-input ${errors.title ? 'error' : ''}`}
          name="title"
          placeholder="What needs to be done?"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && <div className="error-msg">⚠ {errors.title}</div>}

        <div className="form-row">
          <div>
            <div className="field-label">Category</div>
            <select
              className="select-input"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {['Work', 'Study', 'Personal', 'Health'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="field-label">Priority</div>
            <div className="priority-group">
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  key={p}
                  className={`priority-btn ${form.priority === p ? `active-${p.toLowerCase()}` : ''}`}
                  onClick={() => setForm({ ...form, priority: p })}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button className="btn-add" onClick={handleAdd}>+ Add Task</button>
      </div>

      <div className="filter-row">
        {['All', 'Pending', 'Completed'].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">No tasks in this category.</div>
      )}

      {filtered.map((t) => (
        <div className="task-item" key={t.id}>
          <div
            className={`task-check ${t.completed ? 'checked' : ''}`}
            onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: t.id })}
          >
            {t.completed && <span className="check-icon">✓</span>}
          </div>
          <div className="task-info">
            <div className={`task-title-text ${t.completed ? 'done' : ''}`}>{t.title}</div>
            <div className="task-badges">
              <span className={`badge badge-${t.category.toLowerCase()}`}>{t.category}</span>
              <span className={`badge badge-${t.priority.toLowerCase()}`}>{t.priority}</span>
            </div>
          </div>
          <div className="task-actions">
            {t.completed ? (
              <button
                className="btn-action undo"
                onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: t.id })}
              >
                Undo
              </button>
            ) : (
              <button
                className="btn-action done"
                onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: t.id })}
              >
                Done
              </button>
            )}
            <button
              className="btn-action del"
              onClick={() => dispatch({ type: 'DELETE_TASK', payload: t.id })}
            >
              Del
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
