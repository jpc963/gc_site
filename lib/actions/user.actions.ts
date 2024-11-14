"use server"

import { cookies } from "next/headers"
import { parseStringify } from "@/lib/utils"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { Items } from "@/constants"

export const signIn = async ({ email, password }: signInParams) => {
  let user

  try {
    await signInWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        await getDoc(doc(db, "usuario", res.user.uid)).then((snapshot) =>
          snapshot.exists() ? (user = { ...snapshot.data() }) : null
        )

        cookies().set("user-session", res.user.uid, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        })
      }
    )

    return parseStringify(user)
  } catch (error) {
    console.log("[SIGN_IN]: ", error)
    return null
  }
}

export const signUp = async ({ password, ...userData }: signUpParams) => {
  const { email } = userData

  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        await setDoc(doc(db, "usuario", res.user.uid), {
          ...userData,
          userId: res.user.uid,
          cLevel: 0,
          personagens: [],
          premium: false,
          pontosDiarios: 0,
          vp: 0,
        }).then(
          async () =>
            await setDoc(doc(db, "armazem", res.user.uid), {
              userId: res.user.uid,
              items: Items,
            })
        )

        cookies().set("user-session", res.user.uid, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        })
      }
    )

    return parseStringify(userData)
  } catch (error) {
    console.log("[SIGN_UP]: ", error)
  }
}

export async function getLoggedInUser() {
  try {
    const hasCookies = cookies().get("user-session")?.value

    if (!hasCookies) return null

    const user = await getDoc(doc(db, "usuario", hasCookies)).then((snapshot) =>
      snapshot.exists() ? snapshot.data() : null
    )

    return parseStringify(user)
    //eslint-disable-next-line
  } catch (error) {
    console.log("[GET_LOGGED_IN_USER]: ", error)
    return null
  }
}

export const logoutAccount = async () => {
  try {
    await auth.signOut().then(() => cookies().delete("user-session"))

    return true
  } catch (error) {
    console.log("[LOGOUT_ACCOUNT]: ", error)
    return null
  }
}
