"use client"

import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"

import { authFormSchema } from "@/lib/utils"

import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

//eslint-disable-next-line
const formSchema = authFormSchema("registro")

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>
  name: FieldPath<z.infer<typeof formSchema>>
  label: string
  placeholder: string
  id: string
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  id,
}: CustomInputProps) => {
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
                placeholder={placeholder}
                className="text-[16px] placeholder:text-[16px] placeholder:text-gray-500"
                type={name === "password" ? "password" : "text"}
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

export default CustomInput
