import Image from "next/image"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import EditCharForm from "./EditCharForm"

const PersonagemPopover = ({ personagem, img }: EditImgCharProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full h-auto bg-[#130f40] flex flex-row justify-between gap-4 shadow-lg rounded-sm border border-[#30336b]">
          <Image
            src={img.imgUrl}
            width={210}
            height={140}
            alt={`Imagem do personagem ${img.nome}`}
            quality={100}
            loading="lazy"
          />

          <div className="flex justify-between w-full mr-4 items-center text-white font-semibold">
            <div>
              <p>{personagem.nome}</p>
              <p>Level:</p>
              <p>GP:</p>
            </div>

            <div className="text-right">
              <br />
              <p>{personagem.level}</p>
              <p>{personagem.gp}</p>
            </div>
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-80 bg-[#130f40] bg-gradient-to-tl from-[10%] text-white border-[#30336b] shadow-lg">
        <EditCharForm personagem={personagem} />
      </PopoverContent>
    </Popover>
  )
}

export default PersonagemPopover
