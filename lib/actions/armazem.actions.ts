"use server"

import { doc, getDoc, setDoc } from "firebase/firestore"

import { Items } from "@/constants"
import { parseStringify } from "@/lib/utils"

import { db } from "../firebase"

export async function getArmazemUser({ userId }: { userId: string }) {
  try {
    const armazem = (await getDoc(doc(db, "armazem", userId)).then((doc) => ({
      $id: doc.id,
      ...doc.data(),
    }))) as ArmazemUserProps

    if (!armazem) {
      return null
    }

    // adicionar um item novo caso não exista no armazem
    const itensAtualizados = Items.map((item) => {
      const found = armazem.items.find((i) => i.abrev === item.abrev)
      return found ? found : { abrev: item.abrev, qtd: 0 }
    }) as QtdItemType[]

    armazem.items = itensAtualizados

    return parseStringify(armazem)
  } catch (error) {
    console.log("[GET_ARMAZEM_INFO]: ", error)
    return null
  }
}

export async function editArmazemUser({ ...data }: ArmazemUserProps) {
  try {
    const itens = data.items.map((item) => ({
      abrev: item.abrev,
      qtd: item.qtd,
    }))

    await setDoc(doc(db, "armazem", data.$id), {
      items: itens,
    })

    return "OK"
  } catch (error) {
    console.log("[EDIT_ARMAZEM_USER]: ", error)
    return null
  }
}
