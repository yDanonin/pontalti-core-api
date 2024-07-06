const isTrue = (value: unknown) => {
  return ((value === 'true') || (value === true))
}

const isFilled = (value: unknown) => {
  return value !== null && value !== undefined && value !== ''
}

const isNumberList = (list: unknown) => {
  return Array.isArray(list) ? (list.length ? list.every(item => { return !isNaN(item) }) : false) : false
}

const startAndEndOfDate = (date: Date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return {
    startOfDay,
    endOfDay
  }
}

export {
  isTrue,
  isFilled,
  isNumberList,
  startAndEndOfDate
}
