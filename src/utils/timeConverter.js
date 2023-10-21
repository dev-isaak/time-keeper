const timeConverter = (time) => {
  let hours = 0
  let minutes = 0

  let time_minutes = time /1000 / 60

  while (time_minutes > 0){
    time_minutes -= 1
    minutes ++
    if (minutes === 60){
      minutes = 0
      hours ++
    }
  }
  
  if (minutes < 10){
    minutes = '0' + minutes
  }
  if (hours < 10){
    hours = '0' + hours
  }
 return `${hours}:${minutes} h`
}

export default timeConverter