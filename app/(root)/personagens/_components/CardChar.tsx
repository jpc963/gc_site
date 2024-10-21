import Image from "next/image"
import EditCharForm from "./EditCharForm"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

const CardChar = ({ img, personagem }: EditImgCharProps) => {
  return (
    <div className="w-48 h-68 bg-[#1c1c29] rounded-md shadow-md group hover:scale-105 transition-transform duration-150">
      <div className="w-3/5 h-fit bg-[#7c3aed] m-auto rounded-b-md">
        <span className="font-semibold text-center block">{img.nome}</span>
      </div>

      <div className="w-20 h-20 bg-[#1c1c34] rounded-md overflow-hidden m-auto mt-6 relative shadow-md">
        <Image
          src={img.imgUrl}
          alt={img.alt}
          fill
          quality={80}
          className="object-cover"
        />
      </div>

      <p className="block text-center pt-3 text-sm">
        Atk Total: {personagem.totalAtk}
      </p>
      <p className="block text-center pt-1 text-sm">
        Level: {personagem.level}
      </p>
      <p className="block text-center pt-1 text-sm">GP: {personagem.gp}</p>

      <Popover>
        <PopoverTrigger asChild>
          <Button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 block m-auto my-6 rounded-sm border-none bg-[#7c3aed] hover:bg-[#534bf3] font-semibold">
            Editar
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 bg-[#1c1c29] border-[#1c1c33] border shadow-md text-white">
          <EditCharForm personagem={personagem} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default CardChar
