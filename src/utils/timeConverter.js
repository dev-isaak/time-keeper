const timeConverter = (time) => {
  let hours = 0
  let minutes = 0
  let seconds = 0
  //convierto ms recividos en s
  let time_seconds = time /1000
  //mientras los segundos no se queden a 0 
  while (time_seconds > 0){
    //restamos 1 segundo
    seconds ++
    time_seconds -= 1
    //cuando llegue a 59 segundo ponemos contador a 0 y sumamos un minuto
    if (seconds === 60){
      seconds = 0
      minutes ++
    }
    //cuando el contador de minutos llegue a 59 lo ponemos a 0 y sumamos 1 hora
    if (minutes === 60){
      minutes = 0
      hours ++
    }
  }
  if (seconds < 10){
    seconds = '0' + seconds
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