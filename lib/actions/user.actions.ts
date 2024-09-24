"use server"

import { ID, Query } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_PERSONAGENSUSER_COLLECTION_ID: PERSONAGENSUSER_COLLECTION_ID,
  APPWRITE_PERSONAGENS_COLLECTION_ID: PERSONAGENS_COLLECTION_ID,
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

    return parseStringify(user)
  } catch (error) {
    console.log("[SIGN_IN]: ", error)
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

    return parseStringify(user)
  } catch (error) {
    console.log("[GET_LOGGED_IN_USER]: ", error)
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

    return parseStringify(user.documents[0])
  } catch (error) {
    console.log(error)
  }
}

export async function getPersonagens() {
  try {
    const { database } = await createAdminClient()

    const personagens = await database.listDocuments(
      DATABASE_ID!,
      PERSONAGENS_COLLECTION_ID!,
      [Query.select(["nome"])]
    )

    return parseStringify(personagens)
  } catch (error) {
    console.log("[GET_PERSONAGENS_USER]: ", error)
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
