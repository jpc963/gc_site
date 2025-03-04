import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"

import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addPersonagemFormSchema } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchemaChar = addPersonagemFormSchema()

interface CustomInputPropsChar {
  control: Control<z.infer<typeof formSchemaChar>>
  name: FieldPath<z.infer<typeof formSchemaChar>>
  label: string
  placeholder?: string
  id: string
  type?: string
}

const CustomInputChar = ({
  control,
  name,
  label,
  id,
  type,
  placeholder,
}: CustomInputPropsChar) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <FormLabel
            className="text-[14px] w-full max-w-[280px] font-medium text-gray-200"
            htmlFor={id}
          >
            {label}
          </FormLabel>

          <div className="flex w-full flex-col">
            <FormControl>
              {type === "boolean" ? (
                <Checkbox
                  id={id}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              ) : (
                <Input
                  className="text-[16px] placeholder:text-[16px] placeholder:text-gray-500 focus-visible:ring-0"
                  placeholder={placeholder ? placeholder : ""}
                  id={id}
                  type={type ? type : "text"}
                  {...field}
                  value={typeof field.value === "boolean" ? "" : field.value}
                />
              )}
            </FormControl>

            <FormMessage className="text-[12px] text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  )
}
export default CustomInputChar
