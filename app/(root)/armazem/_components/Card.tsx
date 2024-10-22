"use client"

import { Items, ItemsNames } from "@/constants"
import Buttons from "./Buttons"
import Topbar from "./Topbar"
import { useEffect, useState } from "react"
import { getArmazemUser } from "@/lib/actions/user.actions"

const Card = ({ userId }: { userId: string }) => {
  const [exists, setExists] = useState<boolean>(true)
  const [userItems, setUserItems] = useState<ArmazemUserType>({
    $id: "",
    userId: "",
    items: Items,
  })

  useEffect(() => {
    const infos = async () => {
      const { documents }: { documents: ArmazemUserType } =
        (await getArmazemUser({ userId })) || {}

      if (documents) {
        setUserItems(documents)
      } else {
        setExists(false)
      }
    }

    infos()
  }, [userId])

  return (
    <>
      <Topbar
        items={userItems}
        exists={exists}
      />

      <div className="flex flex-col items-center mt-6">
        <div className="flex flex-row flex-wrap justify-center gap-4 p-4">
          {userItems.items.map((item, index) => (
            <div
              className="w-48 h-68 pb-4 bg-[#1c1c29] rounded-md shadow-md group hover:scale-105 transition-transform duration-150"
              key={item.abrev}
            >
              <div className="w-3/5 h-12 bg-[#7c3aed] m-auto rounded-b-md place-content-center">
                <span className="font-semibold text-center block">
                  {ItemsNames[index]}
                </span>
              </div>

              <div className="w-20 h-20 bg-[#1c1c34] rounded-md overflow-hidden m-auto mt-6 relative place-content-end"></div>

              <Buttons
                userItem={userItems.items}
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
