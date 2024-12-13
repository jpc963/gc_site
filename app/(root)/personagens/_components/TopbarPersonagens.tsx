import ButtonAddPersonagem from "./add/ButtonAddPersonagem"

declare type TopbarPersonagensProps = {
  userId: string
  personagensAdicionados: Personagem[]
}

const TopbarPersonagens = ({
  personagensAdicionados,
  userId,
}: TopbarPersonagensProps) => {
  return (
    <div className="flex flex-row sticky top-0 h-12 shadow-md w-full justify-end bg-[#1c1c22] z-50">
      <ButtonAddPersonagem
        label="Adicionar personagem"
        personagensAdicionados={personagensAdicionados}
        userId={userId}
      />
    </div>
  )
}

export default TopbarPersonagens
