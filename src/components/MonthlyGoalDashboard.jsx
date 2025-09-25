import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts"

export default function MonthlyGoalDashboard({ ranking }) {
  if (!ranking || ranking.length === 0) return null

  // Prepare sales data (exclude admins)
  const data = ranking
    .filter((rep) => !rep.isAdmin) // 👈 filter out admins
    .map((rep) => ({
      name: rep.name,
      sales: rep.sales || rep.yesCount || 0,
    }))

  return (
    <div className="mt-16 w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl sm:text-3xl font-bold mb-4 text-gray-900 text-center sm:text-left">
        🎯 September's Goals Dashboard
      </h2>

      {/* Responsive wrapper with horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px] sm:min-w-0">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 40, left: 20, bottom: 100 }}
            >
              <YAxis stroke="#374151" />
              <Tooltip />

              {/* Dynamic bar coloring */}
              <Bar
                dataKey="sales"
                radius={[8, 8, 0, 0]}
                animationDuration={800}
                fill="#9ca3af" // default gray
              >
                <LabelList
                  dataKey="sales"
                  position="top"
                  fill="#374151"
                  fontSize={12}
                />
                {data.map((entry, index) => {
                  let color = "#9ca3af" // default gray
                  if (entry.sales >= 5) color = "#22c55e" // ✅ same green
                  else if (entry.sales >= 3) color = "#f97316" // ✅ same orange as line

                  return <Cell key={`cell-${index}`} fill={color} />
                })}
              </Bar>

              {/* Custom X-axis with avatars + names */}
              <XAxis
                dataKey="name"
                stroke="#374151"
                interval={0}
                tick={({ x, y, payload }) => {
                  const rep = data.find((d) => d.name === payload.value)
                  return (
                    <g transform={`translate(${x},${y})`}>
                      {/* Avatar */}
                      <image
                        href={`/icons/${rep?.name.toLowerCase()}.png`}
                        x={-15}
                        y={0}
                        height={30}
                        width={30}
                        clipPath="circle(15px at 15px 15px)"
                      />
                      {/* Name */}
                      <text
                        x={0}
                        y={45}
                        textAnchor="middle"
                        fill="#374151"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {rep?.name}
                      </text>
                      {/* Sales label */}
                      <text
                        x={0}
                        y={60}
                        textAnchor="middle"
                        fill="#6b7280"
                        fontSize="9"
                      >
                        {rep?.sales} Sales
                      </text>
                    </g>
                  )
                }}
              />

              {/* Goal Lines */}
              <ReferenceLine y={3} stroke="#f97316" strokeDasharray="3 3" />
              <ReferenceLine y={5} stroke="#22c55e" strokeDasharray="3 3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend below chart */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-6 border-t-2 border-dashed border-[#f97316]"></span>
          <span className="text-[#f97316] font-medium">3 Sales → 🎁 $150 Merch</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 border-t-2 border-dashed border-[#22c55e]"></span>
          <span className="text-[#22c55e] font-medium">5 Sales → 💰 $300 Merch</span>
        </div>
      </div>
    </div>
  )
}
