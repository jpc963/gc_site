import { ID, Query } from "node-appwrite"
import { createAdminClient } from "../appwrite"

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_DESAFIOS_COLLECTION_ID: DESAFIOS_COLLECTION_ID,
  APPWRITE_ARMAZEM_COLLECTION_ID: ARMAZEM_COLLECTION_ID,
} = process.env

export async function getArmazemUser({ userId }: { userId: string }) {
  try {
    if (!userId) return null

    const { database } = await createAdminClient()

    const armazem = await database.listDocuments(
      DATABASE_ID!,
      ARMAZEM_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    )

    const items = JSON.parse(armazem.documents[0].items)
    const userInfos: ArmazemUserProps = {
      $id: armazem.documents[0].$id,
      userId: armazem.documents[0].userId,
      items,
    }

    console.log(userInfos)

    if (armazem.documents.length === 0) {
      return null
    } else {
      return userInfos
    }
  } catch (error) {
    console.log("[GET_ARMAZEM_INFO]: ", error)
    return null
  }
}

export async function addArmazemUser({
  $id,
  items,
  ...data
}: ArmazemUserProps) {
  try {
    const { database } = await createAdminClient()

    const itens = items.map((item) => ({
      abrev: item.abrev,
      qtd: item.qtd,
    }))

    console.log(itens)

    const criar = await database.createDocument(
      DATABASE_ID!,
      ARMAZEM_COLLECTION_ID!,
      ID.unique(),
      { ...data, items: [JSON.stringify(itens)] }
    )

    if (!criar) throw new Error(`Erro ao adicionar itens no armazém: ${$id}`)

    return "OK"
  } catch (error) {
    console.log("[ADD_ARMAZEM_USER]: ", error)
    return null
  }
}

export async function editArmazemUser({ $id, ...data }: ArmazemUserProps) {
  try {
    const { database } = await createAdminClient()

    const editar = await database.updateDocument(
      DATABASE_ID!,
      DESAFIOS_COLLECTION_ID!,
      $id!,
      { ...data }
    )

    if (!editar) throw new Error("Erro ao editar desafios")

    return "OK"
  } catch (error) {
    console.log("[EDIT_ARMAZEM_USER]: ", error)
    return null
  }
}
