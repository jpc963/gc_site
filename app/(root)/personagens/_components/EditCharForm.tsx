"use client"

import { editPersonagemFormSchema } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { editPersonagensUser } from "@/lib/actions/user.actions"
import { Form } from "@/components/ui/form"
import CustomInputEditChar from "./CustomInputEditChar"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const EditCharForm = ({ personagem }: EditPersonagemProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = editPersonagemFormSchema()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: personagem.userId,
      $id: personagem.$id,
      nome: personagem.nome,
      totalAtk: personagem.totalAtk,
      level: personagem.level,
      gp: personagem.gp,
    },
  })

  const editar = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    await editPersonagensUser({ ...data })

    setIsLoading(false)
    window.location.reload()
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={form.handleSubmit(editar)}
      >
        <div className="space-y-2">
          <h4 className="font-medium leading-none">{personagem.nome}</h4>

          <p className="text-sm text-muted-foreground">
            Edite as informações do personagem
          </p>
        </div>

        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="totalAtk">Ataque Total</Label>

            <CustomInputEditChar
              control={form.control}
              name="totalAtk"
              id={personagem.nome + "atk"}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="level">Level</Label>

            <CustomInputEditChar
              control={form.control}
              name="level"
              id={personagem.nome}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="gp">GP</Label>

            <CustomInputEditChar
              control={form.control}
              name="gp"
              id={personagem.nome + "GP"}
            />
          </div>
        </div>

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
                &nbsp; Editando...
              </>
            ) : (
              "Concluído"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default EditCharForm
