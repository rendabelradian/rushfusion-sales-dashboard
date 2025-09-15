import Image from "next/image"

export default function Podium({ ranking }) {
  if (!ranking || ranking.length === 0) return null

  // Filter out reps with 0 sales
  const filteredRanking = ranking.filter(rep => (rep.sales || rep.yesCount) > 0)

  // Only take top 3 sorted by sales
  const topThree = [...filteredRanking]
    .sort((a, b) => (b.sales || b.yesCount) - (a.sales || a.yesCount))
    .slice(0, 3)

  // Podium order: 2nd, 1st, 3rd
  const podiumOrder = [topThree[1], topThree[0], topThree[2]]

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4">
      {/* Title */}
      <h2 className="text-xl sm:text-3xl font-bold text-center mb-12 sm:mb-20 text-gray-800">
        🏆 Sales Champion Podium
      </h2>

      <div className="flex justify-center items-end space-x-4 sm:space-x-8">
        {podiumOrder.map((rep, index) =>
          rep ? (
            <div
              key={rep.name}
              className="flex flex-col items-center relative"
            >
              {/* Crown for 1st place */}
              {index === 1 && (
                <div className="absolute -top-10 sm:-top-16 text-2xl sm:text-4xl animate-bounce">
                  👑
                </div>
              )}

              {/* Avatar */}
              <div className="absolute -top-8 sm:-top-10">
                <Image
                  src={`/icons/${rep.name.toLowerCase()}.png`}
                  alt={rep.name}
                  width={60}
                  height={60}
                  className="sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-lg bg-white"
                />
              </div>

              {/* Podium block */}
              <div
                className={`flex flex-col justify-center items-center rounded-t-lg w-20 sm:w-28`}
                style={{
                  height: `${100 + (rep.sales || rep.yesCount) * 12}px`,
                  backgroundColor:
                    index === 0
                      ? "#9ca3af" // 2nd place → gray
                      : index === 1
                      ? "#facc15" // 1st place → yellow
                      : "#fb923c", // 3rd place → orange
                }}
              >
                <p className="text-white font-bold text-sm sm:text-lg mt-8 sm:mt-10">
                  {(rep.sales || rep.yesCount) + " Sales"}
                </p>
              </div>

              {/* Rank label */}
              <p className="mt-2 sm:mt-3 font-bold text-gray-800 text-sm sm:text-lg">
                {index === 0
                  ? "2nd"
                  : index === 1
                  ? "1st"
                  : "3rd"}
              </p>

              {/* Name */}
              <p className="mt-1 text-gray-700 font-medium text-xs sm:text-base">
                {rep.name}
              </p>
            </div>
          ) : (
            <div key={index} className="w-20 sm:w-28"></div>
          )
        )}
      </div>
    </div>
  )
}
