function fiveMinutesInterval(hours, minutes, start) {
  let newMinutes = minutes
  let newHours = hours
  const result = minutes % 5

  if (start) {
    //When press button start
    if (newMinutes > 55) {
      // Si los minutos estan entre 56 y 59 estos se ponen a 0 y se suma 1 hora
      newHours = newHours + 1
      newMinutes = 0
      if (newMinutes < 10) newMinutes = '0' + newMinutes
      return newHours + ':' + newMinutes
    } else {
      if (result === 0) {
        return hours + ':' + minutes
      } else {
        switch (result) {
          case 1:
            newMinutes += 4
            break
          case 2:
            newMinutes += 3
            break
          case 3:
            newMinutes += 2
            break
          case 4:
            newMinutes += 1
            break
        }
        if (newMinutes < 10) newMinutes = '0' + newMinutes
        return hours + ':' + newMinutes
      }
    }
  } else {
    //When press button stop
    if (result === 0) {
      if (newMinutes < 10) newMinutes = '0' + newMinutes
      return hours + ':' + minutes
    } else {
      switch (result) {
        case 1:
          newMinutes -= 1
          break
        case 2:
          newMinutes -= 2
          break
        case 3:
          newMinutes -= 3
          break
        case 4:
          newMinutes -= 4
          break
      }
      if (newMinutes < 10) newMinutes = '0' + newMinutes
      return hours + ':' + newMinutes
    }
  }
}

export default fiveMinutesInterval
