import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value))

export const authFormSchema = (type: string) =>
  z.object({
    //obrigatório somente no registro
    username:
      type === "registro"
        ? z
            .string()
            .min(3, "Usuário precisa conter no mínimo 3 caracteres.")
            .max(20, "Usuário pode conter no máximo 20 caracteres.")
        : z.string().optional(),

    //obrigatório no registro e no login
    email: z.string().email("Email inválido."),
    password: z
      .string()
      .min(8, "A senha precisa conter no mínimo 8 caracteres.")
      .max(20, "A senha pode conter no máximo 20 caracteres."),
  })
