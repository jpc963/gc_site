"use client"

import { Items } from "@/constants"
import Buttons from "./Buttons"
import Topbar from "./Topbar"

const Card = () => {
  const userItems = Items.map((item) => ({ nome: item.nome, qtd: item.qtd }))

  return (
    <>
      <Topbar items={userItems} />

      <div className="flex flex-col items-center mt-6">
        <div className="flex flex-row flex-wrap justify-center gap-4 p-4">
          {userItems.map((item) => (
            <div
              className="w-48 h-68 pb-4 bg-[#1c1c29] rounded-md shadow-md group hover:scale-105 transition-transform duration-150"
              key={item.nome}
            >
              <div className="w-3/5 h-12 bg-[#7c3aed] m-auto rounded-b-md place-content-center">
                <span className="font-semibold text-center block">
                  {item.nome}
                </span>
              </div>

              <div className="w-20 h-20 bg-[#1c1c34] rounded-md overflow-hidden m-auto mt-6 relative place-content-end"></div>

              <Buttons
                userItem={userItems}
                item={item}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Card
