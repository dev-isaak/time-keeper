const totalHours = (startingTime, stoppingDate) => {
    console.log(startingTime, stoppingDate)
    //stopping date y startingTime reciven hh:mm

    const startHours = startingTime.charAt(0) + startingTime.charAt(1)
    const startMinutes = startingTime.charAt(3) + startingTime.charAt(4)
    const stopHours = stoppingDate.charAt(0) + stoppingDate.charAt(1)
    const stopMinutes = stoppingDate.charAt(3) + stoppingDate.charAt(4)
    
    let totalHours = stopHours - startHours
    let totalMinutes = stopMinutes - startMinutes
    if (totalMinutes < 0){
        totalHours = totalHours - 1
        totalMinutes = totalMinutes + 60
    }

    if (totalHours < 10) totalHours = '0'+ totalHours
    if (totalMinutes < 10) totalMinutes = '0'+ totalMinutes
  
    return `${totalHours}:${totalMinutes}`

}

export default totalHours