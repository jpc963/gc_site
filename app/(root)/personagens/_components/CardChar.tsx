import { Button } from "@/components/ui/button"
import Image from "next/image"

const CardChar = () => {
  return (
    <div className="w-48 h-68 bg-[#130f40] rounded-md shadow-[1px 5px 60px 0px #100a886b]">
      <div className="w-3/5 h-[3%] bg-[#6b64f3] m-auto rounded-b-md"></div>

      <div className="w-16 h-20 bg-[rgba(107,100,243,0.43)] rounded-md m-auto mt-6 relative shadow-md">
        <Image
          src="/icons/personagens/Ai_SD.webp"
          alt="Ai personagem"
          fill
          quality={100}
          className="object-cover rounded-md"
        />
      </div>

      <span className="font-semibold text-center block pt-3">Ai</span>

      <p className="block text-center pt-1 text-sm">Job Title</p>

      <Button className="block m-auto mt-6 rounded-sm border-none bg-[#6b64f3] hover:bg-[#534bf3] font-semibold">
        Editar
      </Button>
    </div>
  )
}

export default CardChar
