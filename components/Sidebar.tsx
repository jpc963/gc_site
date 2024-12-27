"use client"

import { CalendarDays, PackageOpen, SquareLibrary, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import FooterSidebar from "./FooterSidebar"
import Logo from "./Logo"

export const items = [
  {
    route: "/",
    label: "Painel",
    icon: SquareLibrary,
  },
  {
    route: "/personagens",
    label: "Personagens",
    icon: User,
  },
  {
    route: "/desafios",
    label: "Desafios",
    icon: CalendarDays,
  },
  {
    route: "/armazem",
    label: "Armazém",
    icon: PackageOpen,
  },
]

const Sidebar = ({
  username,
  cLevel,
  highCharName,
}: {
  username: string
  cLevel: number
  highCharName?: string
}) => {
  const pathname = usePathname()

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between pt-8 max-sm:hidden sm:p-4 md:p-6 md:w-[300px] xl:w-[355px] shadow-md bg-[#1c1c22] z-20">
      <nav className="flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <Logo
            w={190}
            h={0}
          />

          <h1 className="mb-8 text-[26px] font-bold">Tracker</h1>
        </div>

        <div className="text-center mb-8 place-items-center">
          <div className="overflow-hidden relative w-16 h-16 md:w-20 md:h-20 rounded-md mb-1">
            {highCharName && (
              <Image
                src={`/images/personagens/CharIcon_${highCharName}.webp`}
                alt={`${highCharName} image`}
                quality={100}
                fill
                sizes="100%"
                className="object-cover"
              />
            )}
          </div>

          <div>
            <h3>Bem vindo, {username}</h3>

            <p>cLvL - {cLevel}</p>
          </div>
        </div>

        {items.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`)

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center py-1 md:p-3 2xl:p-4 justify-start",
                {
                  "border-b border-separate border-[#6b64f3]": isActive,
                }
              )}
            >
              <div className="relative border-r border-separate pr-10 size-6">
                <item.icon />
              </div>

              <p className="text-[16px] font-semibold">{item.label}</p>
            </Link>
          )
        })}
      </nav>

      <FooterSidebar />
    </section>
  )
}

export default Sidebar
