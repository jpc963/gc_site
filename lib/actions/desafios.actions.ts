"use server"

import { parseStringify } from "@/lib/utils"
import { db } from "../firebase"
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore"

export async function getDesafiosConcluidos(userId: string) {
  try {
    const dungeons = await getDocs(
      query(collection(db, "desafios"), where("userId", "==", userId))
    ).then((snapshot) =>
      snapshot.docs.map((doc) => ({
        $id: doc.id,
        ...doc.data(),
      }))
    ) as DungeonFeitaUser[]

    return parseStringify(dungeons)
  } catch (error) {
    console.log("[GET_DUNGEONS_USER]: ", error)
    return null
  }
}

export async function addDesafiosConcluidos({ ...data }: DungeonFeitaUser) {
  try {
    await setDoc(doc(collection(db, "desafios")), { ...data })

    return "OK"
  } catch (error) {
    console.log("[ADD_DUNGEONS_USER]: ", error)
    return null
  }
}

export async function editDesafiosConcluidos({
  $id,
  ...data
}: EditDungeonsParams) {
  try {
    await setDoc(doc(db, "desafios", $id), { ...data })

    return "OK"
  } catch (error) {
    console.log("[EDIT_DUNGEONS_USER]: ", error)
    return null
  }
}
