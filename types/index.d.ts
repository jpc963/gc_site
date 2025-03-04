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
  nome: string
  totalAtk: number
  level: number
  gp: number
  awake: boolean
}

declare type PersonagemUser = {
  userId: string
  personagens: Personagem[]
}

declare type ImgChar = {
  imgUrl: string
  nome: string
  alt: string
}

declare type EditPersonagem = {
  nome: string
  totalAtk: number
  level: number
  gp: number
  awake: boolean
}

declare interface AddCharFormProps {
  userId: string
  nomeChar: string
  lista: ImgChar[]
  personagens: Personagem[]
}

declare interface EditCharFormProps {
  userId: string
  personagem: Personagem
  personagens: Personagem[]
}

declare interface EditPersonagemProps {
  personagem: EditPersonagem
}

declare interface EditImgCharProps {
  userId: string
  personagem: EditPersonagem
  img: ImgChar
  listaPersonagens: Personagem[]
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

declare type ArmazemUserProps = {
  $id: string
  userId: string
  items: QtdItemType[]
}
