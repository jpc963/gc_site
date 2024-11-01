"use server"

import { ID, Query } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "@/lib/utils"

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
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
    const result = (await account.get()) || null

    if (!result) return null

    const user = await getUserInfo({ userId: result.$id })

    return parseStringify(user)

    //eslint-disable-next-line
  } catch (error) {
    console.log("[GET_LOGGED_IN_USER]: ", "NO SESSION")
    return null
  }
}

export async function getUserInfo({ userId }: { userId: string }) {
  try {
    if (!userId) return null

    const { database } = await createAdminClient()

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    )

    return parseStringify(user.documents[0])
  } catch (error) {
    console.log("[GET_USER_INFO]: ", error)
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
