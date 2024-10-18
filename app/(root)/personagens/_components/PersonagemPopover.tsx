import Image from "next/image"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import EditCharForm from "./EditCharForm"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const PersonagemPopover = ({ personagem, img }: EditImgCharProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full h-fit bg-[#130f40] flex flex-row justify-between gap-4 shadow-md shadow-[#0f172a96] rounded-sm border border-[#30336b]">
          <AspectRatio
            ratio={16 / 7}
            className="rounded-l-sm"
          >
            <Image
              src={img.imgUrl}
              alt={`Imagem do personagem ${img.nome}`}
              quality={80}
              fill
              loading="lazy"
              className="object-cover"
            />
          </AspectRatio>

          <div className="flex justify-between w-full mr-4 items-center text-white font-semibold">
            <div>
              <p className="mb-8">{personagem.nome}</p>
              <p>Level:</p>
              <p>GP:</p>
            </div>

            <div className="text-right mt-8">
              <br />
              <p>{personagem.level}</p>
              <p>{personagem.gp}</p>
            </div>
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-80 bg-[#130f40] bg-gradient-to-tl from-[10%] text-white border-[#30336b] shadow-md shadow-[#0f172a96]">
        <EditCharForm personagem={personagem} />
      </PopoverContent>
    </Popover>
  )
}

export default PersonagemPopover
