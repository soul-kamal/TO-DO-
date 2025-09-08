import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all')

  // Load default todos
  useEffect(() => {
    const savedTodos = [
      { id: 1, text: 'Design the perfect homepage', completed: false, priority: 'high' },
      { id: 2, text: 'Complete React tutorial series', completed: false, priority: 'medium' },
      { id: 3, text: 'Plan weekend getaway', completed: false, priority: 'low' }
    ]
    setTodos(savedTodos)
  }, [])

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        priority: 'medium'
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  const getPriorityColor = (priority, completed) => {
    if (completed) return 'bg-emerald-100 border-emerald-200'
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200'
      case 'medium': return 'bg-amber-50 border-amber-200'
      case 'low': return 'bg-blue-50 border-blue-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getPriorityDot = (priority, completed) => {
    if (completed) return 'bg-emerald-500'
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-amber-500'
      case 'low': return 'bg-blue-500'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto card">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-2">
              My Tasks
            </h1>
            <p className="text-gray-200 text-lg">Stay organized and get things done ✨</p>
          </div>

          {/* Add Todo Form */}
          <div className="p-6 border-b border-gray-100/30">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  placeholder="What needs to be done?"
                  className="w-full px-6 py-4 bg-white/40 border border-white/30 rounded-2xl 
                             focus:outline-none focus:ring-2 focus:ring-purple-500 
                             focus:bg-white/60 transition-all text-gray-900 placeholder-gray-500"
                />
              </div>
              <button onClick={addTodo}>
                Add Task
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-6 py-4 border-b border-gray-100/30 flex space-x-2 justify-center">
            {[
              { key: 'all', label: 'All Tasks', icon: '📋' },
              { key: 'active', label: 'Active', icon: '⚡' },
              { key: 'completed', label: 'Completed', icon: '✅' }
            ].map((filterType) => (
              <button
                key={filterType.key}
                onClick={() => setFilter(filterType.key)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-all ${
                  filter === filterType.key
                    ? 'bg-purple-200 text-purple-900 shadow-sm'
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{filterType.icon}</span>
                <span>{filterType.label}</span>
              </button>
            ))}
          </div>

          {/* Todo List */}
          <div className="max-h-96 overflow-y-auto p-6">
            {filteredTodos.length === 0 ? (
              <div className="text-center text-gray-300">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">
                  {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
                </h3>
                <p>{filter === 'all' ? 'Add your first task above to get started!' : 'All caught up! 🎉'}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTodos.map((todo) => (
                  <div 
                    key={todo.id} 
                    className={`group relative p-5 rounded-2xl border-2 transition-all hover:shadow-md ${getPriorityColor(todo.priority, todo.completed)}`}
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-6 h-6"
                      />
                      <div className={`w-2 h-2 rounded-full ${getPriorityDot(todo.priority, todo.completed)}`}></div>
                      <span className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        {todo.text}
                      </span>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete task"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Stats */}
          {todos.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100/30 flex items-center justify-between text-sm text-gray-200">
              <span>{activeCount} active • {completedCount} completed</span>
              {completedCount > 0 && (
                <button onClick={clearCompleted} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white">
                  Clear completed
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
