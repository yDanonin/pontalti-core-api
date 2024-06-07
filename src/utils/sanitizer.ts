const sanitizeBoolean = (currentValue) => {
  return ((currentValue === 'true') || (currentValue === true))
}

const sanitizeSpecialCharacters = (currentValue) => {
  try {
    if(typeof currentValue !== 'string') return currentValue
    return currentValue.replace(/[^\d]/g, '')
  } catch(e) {
    console.log(e)
    return currentValue
  }
}


export {
  sanitizeBoolean,
  sanitizeSpecialCharacters
}