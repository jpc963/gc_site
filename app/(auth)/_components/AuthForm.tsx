"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { authFormSchema } from "@/lib/utils"
import CustomInput from "@/components/CustomInput"
import { useForm } from "react-hook-form"
import React, { useState } from "react"
import Link from "next/link"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { signIn, signUp } from "@/lib/actions/user.actions"
import Logo from "@/components/Logo"

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "joao@gmail.com",
      password: "testeteste",
    },
  })

  const enviar = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      if (type === "registro") {
        const userData = {
          username: data.username!,
          email: data.email,
          password: data.password,
        }

        const newUser = await signUp(userData)

        setUser(newUser)
      }

      if (type === "login") {
        await signIn({
          email: data.email,
          password: data.password,
        })
      }
    } catch (error) {
      console.log("[ON_SUBMIT]: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="flex w-full max-w-[500px] flex-col justify-center gap-5 md:gap-8 rounded-md shadow-lg shadow-[#0f172a] p-12">
      <header className="flex flex-col gap-5 md:gap-8">
        <div className="w-full flex justify-center">
          <Logo
            w={250}
            h={0}
          />
        </div>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-[24px] font-semibold lg:text-[36px]">
            {user ? (
              <Link href="/">Ir ao painel</Link>
            ) : type === "login" ? (
              "Entre com sua conta"
            ) : (
              "Crie sua conta"
            )}

            <p className="text-[16px] font-normal text-gray-400">
              Entre com os detalhes da sua conta
            </p>
          </h1>
        </div>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(enviar)}
          className="space-y-8"
        >
          {type === "registro" && (
            <CustomInput
              control={form.control}
              name="username"
              label="Usuário"
              placeholder="Digite seu nome de usuário"
              id="username"
            />
          )}

          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Digite seu email"
            id="email"
          />

          <CustomInput
            control={form.control}
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            id="password"
          />

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="text-[16px] font-semibold text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <React.Fragment>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  &nbsp; Carregando...
                </React.Fragment>
              ) : type === "login" ? (
                "Entrar"
              ) : (
                "Cadastrar"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <footer className="flex justify-center gap-1">
        <p className="text-[14px] font-normal text-white">
          {type === "login" ? "Não possui uma conta?" : "Já possui uma conta?"}
        </p>

        <Link
          href={type === "login" ? "/registro" : "/login"}
          className="cursor-pointer text-[14px] font-medium text-[#6dc7cd]"
        >
          {type === "login" ? "Cadastrar" : "Entrar"}
        </Link>
      </footer>
    </section>
  )
}

export default AuthForm
