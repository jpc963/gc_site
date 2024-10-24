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
  $userId: string
  premium: boolean
  vp: number
  pontosDiarios: number
  cLevel: number
  personagens: string[]
}

declare type Personagem = {
  userId: string
  nome: string
  totalAtk: number
  level: number
  gp: number
}

declare type ImgChar = {
  imgUrl: string
  nome: string
  alt: string
}

declare type EditPersonagem = {
  userId: string
  $id: string
  nome: string
  totalAtk: number
  level: number
  gp: number
}

declare interface AddCharFormProps {
  userId: string
  nomeChar: string
  lista: ImgChar[]
}

declare interface EditPersonagemProps {
  personagem: EditPersonagem
}

declare interface EditImgCharProps {
  personagem: EditPersonagem
  img: ImgChar
}

declare type DungeonFeita = {
  nome: string
  personagens: string[]
}

declare interface DungeonFeitaUser extends DungeonFeita {
  userId: string
}

declare type DocDungeonsType = {
  $id: string
  userId: string
  nome: string
  personagens: string[]
}[]

declare type EditDungeonsParams = {
  $id: string
  userId: string
  nome: string
  personagens: string[]
}

declare type QtdItemType = {
  abrev: string
  qtd: number
}

declare type ArmazemUserType = {
  $id: string
  userId: string
  items: QtdItemType[]
}

declare type EditArmazemParams = {
  $id: string
  userId: string
  items: QtdItemType[]
}
