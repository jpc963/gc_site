import Image from "next/image"

import CharStats from "./CharStats"
import { Separator } from "@/components/ui/separator"

const CardChar = ({
  userId,
  img,
  personagem,
  listaPersonagens,
}: EditImgCharProps) => {
  return (
    <div className="w-48 h-80 bg-[#1c1c29] rounded-md shadow-md group hover:scale-105 transition-all duration-300 overflow-y-hidden">
      <div className="w-3/5 h-fit bg-[#7c3aed] m-auto rounded-b-md">
        <span className="font-semibold text-center block">{img.nome}</span>
      </div>

      <div className="w-20 h-20 bg-[#1c1c34] rounded-md overflow-hidden m-auto mt-6 relative shadow-md">
        <Image
          src={img.imgUrl}
          alt={img.alt}
          fill
          sizes="100%"
          quality={80}
          className="object-cover"
        />
      </div>

      <Separator className="bg bg-gray-900 mt-6 mb-3 w-[calc(100%-16px)] place-self-center" />

      <CharStats
        personagem={personagem}
        userId={userId}
        listaPersonagens={listaPersonagens}
      />
    </div>
  )
}

export default CardChar
