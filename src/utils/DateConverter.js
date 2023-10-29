export class DateConverter{

  currentDay;
  currentMonth;
  currentYear;
  currentHour;
  currentMinutes;
  currentWeekDay;

  constructor(){

    const date = new Date()
    this.currentDay = date.getDate()
    this.currentWeekDay = date.getDay()
    this.currentMonth = date.getMonth() +1
    this.currentYear = date.getFullYear()
    this.currentHour = date.getHours()
    this.currentMinutes = date.getMinutes()

  }

  getCurrentDate(){
    return `${this.currentDay}/${this.currentMonth}/${this.currentYear}`
  }

  getCurrentTime(){
    const hour = this.getDoubleDigitFormat(this.currentHour)
    const minutes = this.getDoubleDigitFormat(this.currentMinutes)
    return `${hour}:${minutes}`
  }

  getWeekStatistics(){
    let counterWeekDay = this.currentWeekDay
    let weekDate = this.currentWeekDay
    let dayCounter = 0
    // If date is equal to 0 (Sunday) change it to 7. (Mon = 1, Tue = 2, Thu = 3...., Sun = 7)
    if (weekDate === 0) {
      weekDate = 7
      counterWeekDay = 7
    }
    // rest currentWeekDay until is equal to 0. For each rest, sum 1 to dayCounter to obtain the total number that we'll need to obtain from DB
    while (counterWeekDay > 1) {
      counterWeekDay -= 1
      dayCounter += 1
    }
    
    return [weekDate, dayCounter]
  }

  getTotalHours(obtainedHours){
    //Recives an array of hours: ['hh:mm', 'hh:mm'] and return the total amount of hours
    let hours = []
    let minutes = []
    let sumHours = 0
    let sumMinutes = 0

    obtainedHours.forEach(hour => {
        hours.push(hour.charAt(0) + hour.charAt(1))
        minutes.push(hour.charAt(3) + hour.charAt(4))
    })

    hours.forEach(hour => {
      sumHours = sumHours + parseInt(hour)
    })
    
    minutes.forEach(minute => {
      sumMinutes = sumMinutes + parseInt(minute)
      if(sumMinutes > 60) {
        sumHours++
        sumMinutes -= 60
      }
    })

    if (sumMinutes < 10) sumMinutes = '0' + sumMinutes
    if (sumHours < 10) sumHours = '0' + sumHours

    return `${sumHours}:${sumMinutes}`
  }

  getDifferenceBetweenTwoHours(startingTime, stoppingHour){
    //recives hh:mm starting time and stopping time and return the total amount of time between those two hours
    
    let startHours = startingTime.charAt(0) + startingTime.charAt(1)
    let startMinutes = startingTime.charAt(3) + startingTime.charAt(4)
    let stopHours = stoppingHour.charAt(0) + stoppingHour.charAt(1)
    let stopMinutes = stoppingHour.charAt(3) + stoppingHour.charAt(4)
    
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

  getDoubleDigitFormat(minutesOrHour){
    // If hour or minutes are 1 to 9, return doble digit, like 01, 02 and so on
    if (minutesOrHour < 10){
      return minutesOrHour = '0' + minutesOrHour
    } 
    else {
      return minutesOrHour
    }
  }

  getOneMinuteInterval(){
    let currentMinutes = this.currentMinutes
    let currentHours = this.currentHour

      currentHours = this.getDoubleDigitFormat(currentHours)
      currentMinutes = this.getDoubleDigitFormat(currentMinutes)
      
      return `${currentHours}:${currentMinutes}`
  }

  getFiveMinutesInterval(isButtonStartClicked){
    let currentMinutes = this.currentMinutes
    let currentHours = this.currentHour
    const result = currentMinutes % 5

    if (isButtonStartClicked) {
      //When press button start
      if (currentMinutes > 55) {
        // If minutes are between 56 and 59, set minutes to 0 and add 1 hour
        currentHours = currentHours + 1
        currentMinutes = 0
        currentHours = this.getDoubleDigitFormat(currentHours)
        currentMinutes = this.getDoubleDigitFormat(currentMinutes)

        return currentHours + ':' + currentMinutes
      } else {
        if (result === 0) {
          return currentHours + ':' + currentMinutes
        } else {
          // To obtain the next 5 minutes chunk, rest 5 to the result of the rest division, and add the result to currentMinutes
          currentMinutes = currentMinutes + (5 - result)

          currentHours = this.getDoubleDigitFormat(currentHours)
          currentMinutes = this.getDoubleDigitFormat(currentMinutes)

          return currentHours + ':' + currentMinutes
        }
      }
    } else {
      //When press button stop
      if (result === 0) {
        currentHours = this.getDoubleDigitFormat(currentHours)
        currentMinutes = this.getDoubleDigitFormat(currentMinutes)

        return currentHours + ':' + currentMinutes
      } else {
        // To obtain the previous 5 minutes chunk, rest the result of the rest division, to currentMinutes
        currentMinutes = currentMinutes - result

        currentHours = this.getDoubleDigitFormat(currentHours)
        currentMinutes = this.getDoubleDigitFormat(currentMinutes)

        return currentHours + ':' + currentMinutes
      }
    }
  }

    getFifteenMinutesInterval(isButtonStartClicked){
      let currentMinutes = this.currentMinutes
      let currentHours = this.currentHour
      const result = currentMinutes % 15

      if (isButtonStartClicked) {
        //When press button start
        if (currentMinutes > 45) {
          // If minutes are between 46 and 59, set minutes to 0 and add 1 hour
          currentHours = currentHours + 1
          currentMinutes = 0
          currentHours = this.getDoubleDigitFormat(currentHours)
          currentMinutes = this.getDoubleDigitFormat(currentMinutes)

          return currentHours + ':' + currentMinutes
        }
        else {
          if (result === 0) {
            return currentHours + ':' + currentMinutes
          } else {
            // To obtain the next 15 minutes chunk, rest 15 to the result of the rest division, and add the result to currentMinutes
            currentMinutes = currentMinutes + (15 - result)
            currentHours = this.getDoubleDigitFormat(currentHours)
            currentMinutes = this.getDoubleDigitFormat(currentMinutes)
  
            return currentHours + ':' + currentMinutes
          }
        }
      }else {
        //When press button stop
        if (result === 0) {
          currentHours = this.getDoubleDigitFormat(currentHours)
          currentMinutes = this.getDoubleDigitFormat(currentMinutes)
  
          return currentHours + ':' + currentMinutes
        } else {
          // To obtain the previous 15 minutes chunk, rest the result of the rest division, to currentMinutes
          currentMinutes = currentMinutes - result
          currentHours = this.getDoubleDigitFormat(currentHours)
          currentMinutes = this.getDoubleDigitFormat(currentMinutes)
          
          return currentHours + ':' + currentMinutes
        }
      }
    }
    
    getMilliseconds(hour){
      //Recives an hh:mm and converts it to ms
      let hours = hour.charAt(0) + hour.charAt(1)
      let minutes = hour.charAt(3) + hour.charAt(4)

      const hoursInMs = hours * 3600000
      const minutesInMs = minutes * 60000
      
      return hoursInMs + minutesInMs
    }
}