import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import EditCharForm from "./EditCharForm"

const PersonagemPopover = ({ personagem, img }: EditImgCharProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative group flex justify-center items-center w-full h-full cursor-pointer">
          <Image
            src={img.imgUrl}
            width={100}
            height={100}
            alt={`Imagem do personagem ${img.nome}`}
            className="group-hover:opacity-15 group-hover:blur-sm group-hover:skew-x-6 transition-all duration-75"
          />

          <p className="text-2xl absolute opacity-0 place-content-center group-hover:opacity-100 transition-opacity duration-150 w-full h-full">
            {personagem.level}
          </p>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-80 bg-[#334258] text-white">
        <EditCharForm personagem={personagem} />
      </PopoverContent>
    </Popover>
  )
}

export default PersonagemPopover
