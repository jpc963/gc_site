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
      .min(6, "A senha precisa conter no mínimo 6 caracteres.")
      .max(20, "A senha pode conter no máximo 20 caracteres."),
  })

export const addPersonagemFormSchema = () =>
  z.object({
    nome: z.string(),
    level: z
      .number()
      .min(1, "O level do personagem pode ser no mínimo 1.")
      .max(85, "O level do personagem pode ser no máximo 85.")
      .default(1),
    gp: z
      .number()
      .min(0, "O gp do personagem pode ser no mínimo 0.")
      .max(30000000, "O gp do personagem pode ser no máximo 30.000.000")
      .default(0),
  })
