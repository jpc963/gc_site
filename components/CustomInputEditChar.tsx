import { editPersonagemFormSchema } from "@/lib/utils"
import { FormControl, FormField, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchemaChar = editPersonagemFormSchema()

interface CustomInputPropsChar {
  control: Control<z.infer<typeof formSchemaChar>>
  name: FieldPath<z.infer<typeof formSchemaChar>>
  placeholder?: string
  id: string
}

const CustomInputEditChar = ({ control, name, id }: CustomInputPropsChar) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="col-span-2 h-8">
          <FormControl>
            <Input
              className="text-[16px] placeholder:text-[16px] placeholder:text-gray-500"
              id={id}
              {...field}
            />
          </FormControl>

          <FormMessage className="text-[12px] text-red-500 mt-2" />
        </div>
      )}
    />
  )
}
export default CustomInputEditChar
