import { Clock, CheckCircle } from 'lucide-react'

export function TaskList() {
  const tasks = [
    { id: 1, title: 'Review will draft', status: 'In Progress', dueDate: '2024-10-01' },
    { id: 2, title: 'Update beneficiary information', status: 'Completed', dueDate: '2024-09-15' },
    { id: 3, title: 'Schedule meeting with attorney', status: 'Pending', dueDate: '2024-10-10' },
    { id: 4, title: 'Gather asset documentation', status: 'In Progress', dueDate: '2024-10-05' },
  ]

  return (
    <div className="p-4 bg-white rounded-lg shadow-md sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">Existing Tasks</h2>
      <ul className="space-y-3">
        {tasks.map(task => (
          <li key={task.id} className="flex flex-col justify-between p-3 rounded sm:flex-row sm:items-center bg-gray-50">
            <div className="mb-2 sm:mb-0">
              <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>
              <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
            </div>
            <div className="flex items-center">
              {task.status === 'Completed' ? (
                <span className="flex items-center text-xs text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" /> Completed
                </span>
              ) : (
                <span className="flex items-center text-xs text-blue-600">
                  <Clock className="w-4 h-4 mr-1" /> {task.status}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}