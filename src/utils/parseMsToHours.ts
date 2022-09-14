const parseMsToHours = (duration: number): string => {
  if (duration < 0) return 'Отрицательная длительность'

  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  const strHours = hours < 10 ? '0' + hours : hours.toString()
  const strMinutes = minutes < 10 ? '0' + minutes : minutes.toString()
  const strSeconds = seconds < 10 ? '0' + seconds : seconds.toString()

  return strHours + ':' + strMinutes + ':' + strSeconds
}

export default parseMsToHours
