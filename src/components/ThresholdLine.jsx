export default function ThresholdLine({ t, maxSales }) {
  return (
    <div
      className="absolute left-0 right-0 flex items-center pointer-events-none"
      style={{ bottom: `${(t.sales / maxSales) * 100}%` }}
    >
      <div className="w-full border-t-2 border-dashed border-gray-400"></div>
      <span
        className={`ml-2 text-sm font-bold ${t.color} drop-shadow-lg animate-bounce`}
      >
        {t.icon} {t.sales} Sales → {t.prize}
      </span>
    </div>
  )
}
