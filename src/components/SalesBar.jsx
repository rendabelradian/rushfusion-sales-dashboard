import Image from "next/image"

export default function SalesBar({ rep, i, maxSales }) {
  const sales = rep.sales || rep.yesCount || 0
  const heightPercent = (sales / maxSales) * 100

  return (
    <div
      className="flex flex-col items-center mx-2 relative"
      style={{ width: "80px" }}
    >
      {/* Bar */}
      <div
        className="w-12 rounded-t-lg shadow-lg transition-all duration-700 ease-out"
        style={{
          height: `${heightPercent}%`,
          background:
            sales >= 5
              ? "linear-gradient(to top, #22c55e, #16a34a)" // green
              : sales >= 3
              ? "linear-gradient(to top, #facc15, #eab308)" // yellow
              : "linear-gradient(to top, #9ca3af, #6b7280)", // gray
        }}
      ></div>

      {/* Avatar under bar */}
      <div className="mt-4">
        <Image
          src={`/icons/${rep.name.toLowerCase()}.png`}
          alt={rep.name}
          width={60}
          height={60}
          className="rounded-full border-4 border-white shadow-md bg-white"
          onError={(e) => (e.target.src = "/icons/default.png")}
        />
      </div>

      {/* Labels */}
      <p className="mt-2 font-bold text-gray-800">{rep.name}</p>
      <p className="text-gray-600">{sales} Sales</p>
    </div>
  )
}
