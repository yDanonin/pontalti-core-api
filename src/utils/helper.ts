const isTrue = (value: unknown) => {
  return ((value === 'true') || (value === true))
}

const isFilled = (value: unknown) => {
  return value !== null && value !== undefined && value !== ''
}

const isNumberList = (list: unknown) => {
  return Array.isArray(list) ? (list.length ? list.every(item => { return !isNaN(item) }) : false) : false
}

export {
  isTrue,
  isFilled,
  isNumberList,
}
