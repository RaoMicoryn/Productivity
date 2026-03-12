export const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), ...action.payload, completed: false }]
    case 'DELETE_TASK':
      return state.filter((t) => t.id !== action.payload)
    case 'TOGGLE_TASK':
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      )
    default:
      return state
  }
}

export const initialTasks = [
  { id: 1, title: 'Study React hooks', category: 'Study', priority: 'High', completed: true },
  { id: 2, title: 'Build midterm project', category: 'Study', priority: 'High', completed: false },
  { id: 3, title: 'Review useReducer docs', category: 'Work', priority: 'Medium', completed: false },
]
