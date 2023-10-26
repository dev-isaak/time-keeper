function oneMinuteInterval(hours, minutes, start) {
  let newMinutes = minutes
  let newHours = hours

  if (start) {
    if (newMinutes < 10) newMinutes = '0' + newMinutes
    if (newHours < 10) newHours = '0' + newHours
   return `${newHours}:${newMinutes}`
  } else {
    if (newMinutes < 10) newMinutes = '0' + newMinutes
    if (newHours < 10) newHours = '0' + newHours
   return `${newHours}:${newMinutes}`
  }
  }

export default oneMinuteInterval
