"use client"

import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Form } from "./ui/form"
import { addPersonagemFormSchema } from "@/lib/utils"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CustomInputChar from "./CustomInputChar"
import { addPersonagensUser } from "@/lib/actions/user.actions"

interface AddCharFormProps {
  // personagemAdd: Personagem[]
  // setPersonagemAdd: (personagem: Personagem[]) => void
  userId: string
  nomeChar: string
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const AddCharForm = ({
  // personagemAdd,
  // setPersonagemAdd,
  userId,
  isLoading,
  setIsLoading,
  nomeChar,
}: AddCharFormProps) => {
  const formSchema = addPersonagemFormSchema()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      level: 1,
      gp: 0,
      $userId: userId,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    data.gp = Number(data.gp)
    data.nome = nomeChar

    // setPersonagemAdd([...personagemAdd, { ...personagem }])

    await addPersonagensUser({ ...data }).then(() => {
      setIsLoading(false)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <h3>{nomeChar}</h3>

        <CustomInputChar
          control={form.control}
          name="level"
          label="Level"
          id={nomeChar}
        />

        <CustomInputChar
          control={form.control}
          name="gp"
          label="gp"
          id={nomeChar + "GP"}
        />

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="rounded-lg border text-[16px] font-semibold text-white"
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
