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
    <div className="w-48 h-68 bg-[#130f40] rounded-md shadow-md shadow-[#0f172a96] group hover:scale-105 transition-transform duration-150">
      <div className="w-3/5 h-fit bg-[#6b64f3] m-auto rounded-b-md">
        <span className="font-semibold text-center block">{img.nome}</span>
      </div>

      <div className="w-20 h-20 bg-[rgba(107,100,243,0.43)] rounded-md overflow-hidden m-auto mt-6 relative shadow-md shadow-[#0f172a96]">
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
          <Button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 block m-auto my-6 rounded-sm border-none bg-[#6b64f3] hover:bg-[#534bf3] font-semibold">
            Editar
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 bg-[#130f40] text-white border-[#30336b] shadow-md shadow-[#0f172a96]">
          <EditCharForm personagem={personagem} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default CardChar
