import Image from "next/image"

export default function Podium({ ranking }) {
  if (!ranking || ranking.length < 3) return null

  // Sort by yesCount (descending)
  const sorted = [...ranking].sort((a, b) => b.yesCount - a.yesCount)

  const podiumOrder = [sorted[0], sorted[1], sorted[2]] // top 3

  return (
    <div className="flex justify-center items-end gap-8 mt-12">
      {podiumOrder.map((rep, index) => {
        const colors = ["bg-yellow-400", "bg-gray-400", "bg-orange-500"]
        const ranks = ["1st", "2nd", "3rd"]

        return (
          <div
            key={rep.id}
            className="flex flex-col items-center relative"
          >
            {/* Avatar */}
            <div className="absolute -top-12">
              <Image
                src={`/icons/${rep.name.toLowerCase()}.png`}
                alt={rep.name}
                width={80}
                height={80}
                className="rounded-full border-4 border-white shadow-md"
              />
            </div>

            {/* Podium Bar */}
            <div
              className={`${colors[index]} rounded-t-lg flex flex-col items-center justify-end text-white font-bold shadow-lg`}
              style={{ height: `${150 + rep.yesCount * 10}px`, width: "100px" }}
            >
              <p className="mb-1">{rep.yesCount} Yes</p>
            </div>

            {/* Rank Label */}
            <p className="mt-2 text-gray-800 font-semibold">{ranks[index]}</p>
          </div>
        )
      })}
    </div>
  )
}
