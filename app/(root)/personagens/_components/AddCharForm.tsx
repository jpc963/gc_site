"use client"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { addPersonagemFormSchema } from "@/lib/utils"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CustomInputChar from "./CustomInputChar"
import { addPersonagensUser } from "@/lib/actions/char.actions"
import { useState } from "react"

const AddCharForm = ({ userId, nomeChar, lista, personagens}: AddCharFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = addPersonagemFormSchema()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      totalAtk: 0,
      level: 1,
      gp: 0,
    },
  })

  const adicionar = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    data.nome = nomeChar

    await addPersonagensUser({ userId, personagens: [...personagens, data] }).then(() => {
      lista.filter((char) => char.nome !== nomeChar)
    })

    form.reset()
    setIsLoading(false)
    window.location.reload()
  }

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={form.handleSubmit(adicionar)}
      >
        <CustomInputChar
          control={form.control}
          name="totalAtk"
          label="Ataque Total"
          id={nomeChar + "atk"}
        />

        <CustomInputChar
          control={form.control}
          name="level"
          label="Level"
          id={nomeChar}
        />

        <CustomInputChar
          control={form.control}
          name="gp"
          label="GP"
          id={nomeChar + "GP"}
        />

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="text-[16px] font-semibold text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                &nbsp; Adicionando...
              </>
            ) : (
              "Adicionar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default AddCharForm
