"use server"

import { parseStringify } from "@/lib/utils"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

export async function getPersonagensUser(userId: string) {
  try {
    const personagens = await getDoc(doc(db, "personagens", userId)).then(
      (doc) => ({ ...doc.data() })
    ) as PersonagemUser

    if (!personagens) {
      return null
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