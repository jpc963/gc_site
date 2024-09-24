declare type signUpParams = {
  username: string
  email: string
  password: string
}

declare type signInParams = {
  email: string
  password: string
}

declare type User = {
  $id: string
  username: string
  email: string
  userId: string
  premium: boolean
  vp: number
  pontosDiarios: number
  cLevel: number
  personagens: string[]
}

declare type Personagem = {
  userId?: string
  nome: string
  level: number
  gp: number
}

declare interface PersonagensUser {
  user: User
  personagens: Personagem[]
}
