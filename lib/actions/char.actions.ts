"use server"

import { doc, getDoc, setDoc } from "firebase/firestore"

import { parseStringify } from "@/lib/utils"

import { db } from "../firebase"

export async function getPersonagensUser(userId: string) {
  try {
    const personagens = (await getDoc(doc(db, "personagens", userId)).then(
      (doc) => ({ ...doc.data() })
    )) as PersonagemUser

    if (!personagens.personagens) {
      return []
    }

    return parseStringify(personagens)
  } catch (error) {
    console.log("[GET_PERSONAGENS_USER]: ", error)
    return []
  }
}

export async function addPersonagensUser({ ...data }: PersonagemUser) {
  try {
    await setDoc(doc(db, "personagens", data.userId), {
      personagens: data.personagens,
    })

    return "OK"
  } catch (error) {
    console.log("[ADD_PERSONAGENS_USER]: ", error)
    return null
  }
}

export async function editPersonagensUser({ ...data }: PersonagemUser) {
  try {
    await setDoc(doc(db, "personagens", data.userId), {
      personagens: data.personagens,
    })

    return "OK"
  } catch (error) {
    console.log("[ADD_PERSONAGENS_USER]: ", error)
    return null
  }
}

export async function getHighChar(userId: string) {
  try {
    // ordernar pelo campo totalAtk no array personagens
    const highChar = (await getDoc(doc(db, "personagens", userId)).then(
      (doc) => {
        const personagens = doc.data()?.personagens as Personagem[]
        const highChar = personagens.reduce((acc, curr) =>
          acc.totalAtk > curr.totalAtk ? acc : curr
        )

        return highChar
      }
    )) as Personagem

    console.log(highChar)

    return highChar
  } catch (error) {
    console.log("[ADD_PERSONAGENS_USER]: ", error)
    return null
  }
}
