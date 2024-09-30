export function EstateProgress() {
    const progress = 65 // Example progress percentage
    const netEstateValue = 1500000 // Example net estate value
  
    return (
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md sm:p-6">
        <div className="flex flex-col items-start justify-between mb-4 sm:flex-row sm:items-center">
          <h2 className="mb-2 text-lg font-semibold text-gray-800 sm:text-xl sm:mb-0">Estate Progress</h2>
          <div className="text-left sm:text-right">
            <p className="text-xs text-gray-600 sm:text-sm">Net Estate Value</p>
            <p className="text-xl font-bold text-blue-600 sm:text-2xl">${netEstateValue.toLocaleString()}</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-xs text-gray-600 sm:text-sm">Estate Closing is {progress}% complete</p>
      </div>
    )
  }