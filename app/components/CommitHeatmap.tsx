"use client"

interface CommitDay {
  date: string
  count: number
}

export default function CommitHeatmap({ data }: { data: CommitDay[] }) {
  // Last 30 days ki array banao
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    const dateStr = d.toISOString().split("T")[0]
    const found = data.find((x) => x.date === dateStr)
    return { date: dateStr, count: found?.count || 0 }
  })

  const totalCommits = data.reduce((sum, d) => sum + d.count, 0)
  const activeDays = data.filter((d) => d.count > 0).length

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-800"
    if (count <= 2) return "bg-indigo-900"
    if (count <= 5) return "bg-indigo-600"
    if (count <= 10) return "bg-indigo-400"
    return "bg-indigo-300"
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Commit Activity — Last 30 Days</h2>
        <div className="flex gap-4 text-sm">
          <span className="text-indigo-400 font-bold">{totalCommits} commits</span>
          <span className="text-gray-400">{activeDays} active days</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="flex flex-wrap gap-1.5">
        {days.map((day) => (
          <div
            key={day.date}
            className={`w-7 h-7 rounded-sm ${getColor(day.count)} cursor-pointer transition hover:opacity-80 relative group`}
          >
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
              <div className="bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {day.date}: {day.count} commits
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
        <span>Less</span>
        <div className="w-4 h-4 rounded-sm bg-gray-800" />
        <div className="w-4 h-4 rounded-sm bg-indigo-900" />
        <div className="w-4 h-4 rounded-sm bg-indigo-600" />
        <div className="w-4 h-4 rounded-sm bg-indigo-400" />
        <div className="w-4 h-4 rounded-sm bg-indigo-300" />
        <span>More</span>
      </div>
    </div>
  )
}