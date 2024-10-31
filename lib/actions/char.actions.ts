import { ID, Query } from "node-appwrite"
import { createAdminClient } from "../appwrite"
import { parseStringify } from "@/lib/utils"

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_PERSONAGENSUSER_COLLECTION_ID: PERSONAGENSUSER_COLLECTION_ID,
} = process.env

export async function getPersonagensUser({ userId }: { userId: string }) {
  try {
    const { database } = await createAdminClient()

    const personagens = await database.listDocuments(
      DATABASE_ID!,
      PERSONAGENSUSER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    )

    return parseStringify(personagens)
  } catch (error) {
    console.log("[GET_PERSONAGENS_USER]: ", error)
    return []
  }
}

export async function addPersonagensUser({ ...data }: Personagem) {
  try {
    const { database } = await createAdminClient()

    const criar = await database.createDocument(
      DATABASE_ID!,
      PERSONAGENSUSER_COLLECTION_ID!,
      ID.unique(),
      { ...data }
    )

    if (!criar) throw new Error("Erro ao adicionar personagem")

    return "OK"
  } catch (error) {
    console.log("[ADD_PERSONAGENS_USER]: ", error)
    return null
  }
}

export async function editPersonagensUser({ $id, ...data }: EditPersonagem) {
  try {
    const { database } = await createAdminClient()

    const editar = await database.updateDocument(
      DATABASE_ID!,
      PERSONAGENSUSER_COLLECTION_ID!,
      $id,
      { ...data }
    )

    if (!editar) throw new Error("Erro ao editar personagem")

    return "OK"
  } catch (error) {
    console.log("[EDIT_PERSONAGENS_USER]: ", error)
    return null
  }
}
