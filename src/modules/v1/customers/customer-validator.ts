const validateCpf = (cpf) => {
  if (cpf.length !== 11) {
    console.log("-------------- Aqui --------------")
    return new Error("CPF must be valid")
  }
}

export {
  validateCpf
}
