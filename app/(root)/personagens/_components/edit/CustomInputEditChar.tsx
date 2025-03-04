import { editPersonagemFormSchema } from "@/lib/utils"
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const editFormSchemaChar = editPersonagemFormSchema()

interface CustomEditInputPropsChar {
  control: Control<z.infer<typeof editFormSchemaChar>>
  name: FieldPath<z.infer<typeof editFormSchemaChar>>
  label: string
  placeholder?: string
  id: string
  type?: string
}

const CustomInputEditChar = ({
  control,
  name,
  label,
  id,
  type,
}: CustomEditInputPropsChar) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-row">
          <FormLabel
            className="text-[14px] w-full max-w-[280px] font-medium text-gray-200 self-end"
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
                  className="text-[16px] placeholder:text-[16px] placeholder:text-gray-500 focus-visible:ring-0 border-b border-t-0 border-l-0 border-r-0 rounded-none border-b-gray-600/60"
                  id={id}
                  type={type !== "boolean" && type ? type : "text"}
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

export default CustomInputEditChar
