"use client"

import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"

import { authFormSchema } from "@/lib/utils"

import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

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
  const [visible, setVisible] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <FormLabel className="text-[14px] w-full max-w-[280px] font-medium text-gray-200">
            {label}
          </FormLabel>

          <div className="flex w-full flex-col relative">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="text-[16px] placeholder:text-[16px] placeholder:text-gray-500 relative"
                type={
                  name === "password" && !visible
                    ? "password"
                    : name === "password" && visible
                    ? "text"
                    : "text"
                }
                id={id}
                {...field}
              />
            </FormControl>

            {name === "password" && (
              <button
                type="button"
                className="absolute right-2 top-2 p-0 m-0"
                onClick={() => setVisible((prev) => !prev)}
              >
                {visible ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            )}

            <FormMessage className="text-[12px] text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  )
}

export default CustomInput
