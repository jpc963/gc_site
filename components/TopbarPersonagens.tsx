import ButtonAddPersonagem from "./ButtonAddPersonagem"

declare type TopbarPersonagensProps = {
  userId: string
  personagensAdicionados: { nome: string; level: number }[]
}

const TopbarPersonagens = ({
  personagensAdicionados,
  userId,
}: TopbarPersonagensProps) => {
  return (
    <div className="flex flex-row sticky top-0 h-12 shadow-sm w-full justify-end from-[#202b3c] to-[#334258] bg-gradient-to-bl">
      <ButtonAddPersonagem
        label="Adicionar personagem"
        personagensAdicionados={personagensAdicionados}
        userId={userId}
        className="rounded-none h-full w-[200px] font-semibold"
      />
    </div>
  )
}

export default TopbarPersonagens
