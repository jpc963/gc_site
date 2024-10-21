"use server"

import { Databases, ID, Query } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "@/lib/utils"

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_PERSONAGENSUSER_COLLECTION_ID: PERSONAGENSUSER_COLLECTION_ID,
  APPWRITE_DESAFIOS_COLLECTION_ID: DESAFIOS_COLLECTION_ID,
} = process.env

export const signIn = async ({ email, password }: signInParams) => {
  try {
    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    })

    const user = await getUserInfo({ userId: session.userId })

    return await parseStringify(user)
  } catch (error) {
    console.log("[SIGN_IN]: ", error)
    return null
  }
}

export const signUp = async ({ password, ...userData }: signUpParams) => {
  const { email, username } = userData

  let newUserAccount

  try {
    const { account, database } = await createAdminClient()

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newUserAccount) throw new Error("Erro ao criar uma nova conta")

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      { ...userData, userId: newUserAccount.$id }
    )

    const session = await account.createEmailPasswordSession(email, password)

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    })

    return parseStringify(newUser)
  } catch (error) {
    console.log("[SIGN_UP]: ", error)
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient()
    const result = await account.get()

    const user = await getUserInfo({ userId: result.$id })

    return await parseStringify(user)

    //eslint-disable-next-line
  } catch (error) {
    console.log("[GET_LOGGED_IN_USER]: ", "NO SESSION")
    return null
  }
}

export async function getUserInfo({ userId }: { userId: string }) {
  try {
    const { database } = await createAdminClient()

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    )

    return await parseStringify(user.documents[0])
  } catch (error) {
    console.log("[GET_USER_INFO]: ", error)
    return null
  }
}

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

export async function getDesafiosConcluidos(userId: string) {
  try {
    const { database } = await createAdminClient()

    const dungeons = await database.listDocuments(
      DATABASE_ID!,
      DESAFIOS_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    )

    console.log(dungeons)
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

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient()

    cookies().delete("appwrite-session")

    await account.deleteSession("current")
  } catch (error) {
    console.log("[LOGOUT_ACCOUNT]: ", error)
    return null
  }
}
