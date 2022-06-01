export class CpfAlreadyInUseError extends Error {
  constructor () {
    super("Já existe um usuário com este CPF cadastrado.")
  }
}

export class EmailAlreadyInUseError extends Error {
  constructor () {
    super("Já existe um usuário com este email cadastrado.")
  }
}

export class RegistrationNumberAlreadyInUseError extends Error {
  constructor () {
    super("Já existe um usuário com este número de matrícula cadastrado.")
  }
}

export class DeleteUserError extends Error {
  constructor (message: string) {
    super(message)
  }
}

