export function rankPods(pods, metric = "yesCount") {
  return [...pods].sort((a, b) => b[metric] - a[metric])
}
