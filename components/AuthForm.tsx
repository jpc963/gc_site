"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "@/lib/utils";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === "registro") {
        const userData = {
          username: data.username!,
          email: data.email,
          password: data.password,
        };

        const newUser = await signUp(userData);

        setUser(newUser);
      }

      if (type === "login") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) router.push("/");
      }
    } catch (error) {
      console.log("[ON_SUBMIT]: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image
            src="/icons/home.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />

          <h1 className="text-26 font-bold">Horizon</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-[24px] font-semibold lg:text-[36px]">
            {user ? (
              <Link href="/">Ir ao painel</Link>
            ) : type === "login" ? (
              "Entre com sua conta"
            ) : (
              "Crie sua conta"
            )}

            <p className="text-[16px] font-normal text-gray-600">
              Entre com os detalhes da sua conta
            </p>
          </h1>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {type === "registro" && (
            <>
              <CustomInput
                control={form.control}
                name="username"
                label="Usuário"
                placeholder="Digite seu nome de usuário"
              />
            </>
          )}

          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Digite seu email"
          />

          <CustomInput
            control={form.control}
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
          />

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="rounded-lg border text-[16px] font-semibold text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  &nbsp; Carregando...
                </>
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
          {type === "login" ? "Cadastrar" : "Login"}
        </Link>
      </footer>
    </section>
  );
};

export default AuthForm;
