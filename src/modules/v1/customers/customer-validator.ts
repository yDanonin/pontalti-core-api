const validateCpf = (cpf) => {
  if (cpf.length !== 11) {
    return new Error("CPF must be valid")
  }
}

export {
  validateCpf
}
