function capitalizeLetters(string) {
  if (string !== null) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
}

export default capitalizeLetters
