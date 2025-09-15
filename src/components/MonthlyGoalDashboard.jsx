import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
} from "recharts"

export default function MonthlyGoalDashboard({ ranking }) {
  if (!ranking || ranking.length === 0) return null

  // Prepare sales data
  const data = ranking.map((rep) => ({
    name: rep.name,
    sales: rep.sales || rep.yesCount || 0,
  }))

  return (
    <div className="mt-16 w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">
        🎯 September's Goals Dashboard
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 80, left: 20, bottom: 100 }}
        >
          <YAxis stroke="#374151" />
          <Tooltip />

          {/* Dynamic bar coloring */}
          <Bar
            dataKey="sales"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
            fill="#3b82f6"
          >
            <LabelList
              dataKey="sales"
              position="top"
              fill="#374151"
              fontSize={12}
            />
            {data.map((entry, index) => {
              let color = "#9ca3af" // default gray
              if (entry.sales >= 5) color = "#22c55e" // green
              else if (entry.sales >= 3) color = "#eab308" // yellow

              return (
                <cell
                  key={`cell-${index}`}
                  fill={color}
                />
              )
            })}
          </Bar>

          {/* Custom X-axis with avatars */}
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
                    x={-20}
                    y={0}
                    height={40}
                    width={40}
                    clipPath="circle(20px at 20px 20px)"
                  />
                  {/* Name */}
                  <text
                    x={0}
                    y={55}
                    textAnchor="middle"
                    fill="#374151"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {rep?.name}
                  </text>
                  {/* Sales label */}
                  <text
                    x={0}
                    y={70}
                    textAnchor="middle"
                    fill="#6b7280"
                    fontSize="11"
                  >
                    {rep?.sales} Sales
                  </text>
                </g>
              )
            }}
          />

          {/* Goal Line: 3 sales */}
          <ReferenceLine
            y={3}
            stroke="orange"
            strokeDasharray="3 3"
            label={{
              value: "$150 Merch",
              position: "right",
              fill: "orange",
              fontSize: 12,
              fontWeight: "bold",
            }}
          />

          {/* Goal Line: 5 sales */}
          <ReferenceLine
            y={5}
            stroke="green"
            strokeDasharray="3 3"
            label={{
              value: "$300 Merch",
              position: "right",
              fill: "green",
              fontSize: 12,
              fontWeight: "bold",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
