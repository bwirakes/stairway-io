import { Check } from 'lucide-react'

export function ProfileSetup() {
  const tasks = [
    { id: 1, title: 'Provide personal information', completed: true },
    { id: 2, title: 'List assets and liabilities', completed: true },
    { id: 3, title: 'Designate beneficiaries', completed: false },
    { id: 4, title: 'Upload important documents', completed: false },
  ]

  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const completionPercentage = (completedTasks / totalTasks) * 100

  return (
    <div className="p-4 bg-white rounded-lg shadow-md sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">Profile setup</h2>
      <div className="mb-4">
        <div className="flex justify-between mb-1 text-xs text-gray-600 sm:text-sm">
          <span>{completedTasks} of {totalTasks} completed</span>
          <span>{completionPercentage.toFixed(0)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${completionPercentage}%;` }}
          ></div>
        </div>
      </div>
      <p className="mb-4 text-xs text-gray-600 sm:text-sm">
        Complete your profile to proceed with the estate closing process.
      </p>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between p-2 rounded bg-gray-50">
            <div className="flex items-center">
              {task.completed ? (
                <Check className="w-4 h-4 mr-2 text-green-500 sm:w-5 sm:h-5" />
              ) : (
                <div className="w-4 h-4 mr-2 border-2 border-gray-300 rounded-full sm:w-5 sm:h-5"></div>
              )}
              <span className={`text-xs sm:text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                {task.title}
              </span>
            </div>
            {!task.completed && (
              <button className="text-xs text-blue-600 sm:text-sm hover:text-blue-800">
                Add now
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}