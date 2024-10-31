import { ID, Query } from "node-appwrite"
import { createAdminClient } from "../appwrite"
import { parseStringify } from "@/lib/utils"

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_DESAFIOS_COLLECTION_ID: DESAFIOS_COLLECTION_ID,
} = process.env

export async function getDesafiosConcluidos(userId: string) {
  try {
    const { database } = await createAdminClient()

    const dungeons = await database.listDocuments(
      DATABASE_ID!,
      DESAFIOS_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    )

    return parseStringify(dungeons)
  } catch (error) {
    console.log("[GET_DUNGEONS_USER]: ", error)
    return null
  }
}

export async function addDesafiosConcluidos({ ...data }: DungeonFeitaUser) {
  try {
    const { database } = await createAdminClient()

    const criar = await database.createDocument(
      DATABASE_ID!,
      DESAFIOS_COLLECTION_ID!,
      ID.unique(),
      { ...data }
    )

    if (!criar) throw new Error("Erro ao adicionar desafios concluídos")

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
    const { database } = await createAdminClient()

    const editar = await database.updateDocument(
      DATABASE_ID!,
      DESAFIOS_COLLECTION_ID!,
      $id,
      { ...data }
    )

    if (!editar) throw new Error("Erro ao editar desafios")

    return "OK"
  } catch (error) {
    console.log("[EDIT_DUNGEONS_USER]: ", error)
    return null
  }
}
