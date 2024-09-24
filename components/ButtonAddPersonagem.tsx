"use client"

import { Button } from "./ui/button"

declare type ButtonAddPersonagemProps = {
  label: string
  personagens: string[]
}

const ButtonAddPersonagem = ({
  label,
  personagens,
}: ButtonAddPersonagemProps) => {
  const teste = () => {
    console.log(personagens)
  }

  return <Button onClick={teste}>{label}</Button>
}

export default ButtonAddPersonagem
