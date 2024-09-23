import { PersonagensIcons } from "@/constants"
import Image from "next/image"

const Personagens = () => {
  return (
    <section className="p-8">
      <div className="flex flex-row gap-2 flex-wrap">
        {PersonagensIcons.map((img) => {
          return (
            <div
              className="text-center"
              key={img.nome}
            >
              <button>
                <Image
                  src={img.imgUrl}
                  width={110}
                  height={110}
                  alt={img.alt}
                />
              </button>
              <p className="text-[14px] text-[#c6c6c6]">{img.nome}</p>
            </div>
          )
        })}
      </div>

      <div className="">asdsa</div>
    </section>
  )
}

export default Personagens
