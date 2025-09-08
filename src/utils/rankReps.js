export function rankReps(reps, metric = "yesCount") {
  return [...reps].sort((a, b) => b[metric] - a[metric])
}
