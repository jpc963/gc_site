import { addPersonagemFormSchema } from "@/lib/utils"
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchemaChar = addPersonagemFormSchema()

interface CustomInputPropsChar {
  control: Control<z.infer<typeof formSchemaChar>>
  name: FieldPath<z.infer<typeof formSchemaChar>>
  label: string
  placeholder?: string
  id: string
}

const CustomInputChar = ({
  control,
  name,
  label,
  id,
}: CustomInputPropsChar) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <FormLabel className="text-[14px] w-full max-w-[280px] font-medium text-gray-200">
            {label}
          </FormLabel>

          <div className="flex w-full flex-col">
            <FormControl>
              <Input
              placeholder=""
                className="text-[16px] placeholder:text-[16px] placeholder:text-gray-500"
                id={id}
                {...field}
              />
            </FormControl>

            <FormMessage className="text-[12px] text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  )
}
export default CustomInputChar