export function HorizontalTimeline() {
    const events = [
      { id: 1, title: 'Will Finalization', date: '2024-10-15' },
      { id: 2, title: 'Asset Valuation', date: '2024-11-01' },
      { id: 3, title: 'Tax Planning Meeting', date: '2024-11-15' },
      { id: 4, title: 'Beneficiary Review', date: '2024-12-01' },
    ]
  
    return (
      <div className="p-4 overflow-x-auto bg-white rounded-lg shadow-md sm:p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">Upcoming Key Dates</h2>
        <div className="relative min-w-max">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200"></div>
          <div className="relative flex justify-between space-x-4 sm:space-x-8">
            {events.map((event, index) => (
              <div key={event.id} className="flex flex-col items-center w-24 sm:w-32">
                <div className="z-10 w-4 h-4 bg-blue-600 rounded-full sm:w-5 sm:h-5"></div>
                <div className="mt-2 text-center">
                  <p className="text-xs font-medium text-gray-800 sm:text-sm">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }