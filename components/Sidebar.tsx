"use client"

import { CalendarDays, PackageOpen, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import FooterSidebar from "./FooterSidebar"
import Logo from "./Logo"
import { useEffect, useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

export const items = [
  // {
  //   route: "/dashboard",
  //   label: "Painel",
  //   icon: SquareLibrary,
  // },
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
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  const handleSidebar = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false)
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    })
  }, [])

  return (
    <section
      className={cn(
        "sticky inset-y-0 left-0 flex h-screen flex-col justify-between pt-8 p-6 shadow-md bg-[#1c1c22] z-50",
        isOpen ? "w-[20rem]" : "w-[3rem]"
      )}
    >
      <nav className="flex flex-col gap-4">
        <div className={cn(isOpen ? "flex flex-col items-center" : "hidden")}>
          <Logo
            w={190}
            h={0}
          />

          <h1 className="mb-8 text-[26px] font-bold">Tracker</h1>
        </div>

        <div
          className={cn("text-center mb-8 place-items-center", {
            hidden: !isOpen,
          })}
        >
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

        <div className={cn(!isOpen && "mt-8")}></div>
        {items.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`)

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("flex gap-3 items-center py-1 justify-start", [
                {
                  "border-b border-separate border-[#6b64f3]": isActive,
                },
                isOpen ? "md:p-3 2xl:p-4" : "self-center py-2",
              ])}
            >
              <div
                className={cn(
                  isOpen
                    ? "relative border-r border-separate pr-10 size-6"
                    : "border-none p-0"
                )}
              >
                <item.icon />
              </div>

              <p
                className={cn(isOpen ? "text-[16px] font-semibold" : "hidden")}
              >
                {item.label}
              </p>
            </Link>
          )
        })}
      </nav>

      <FooterSidebar isOpen={isOpen} />

      <HamburgerMenuIcon
        className={cn(
          "absolute top-3 hover:bg-[#494E53] size-8 p-1 rounded-md cursor-pointer transition-transform duration-1000",
          isOpen ? "right-2" : "self-center"
        )}
        onClick={handleSidebar}
      />
    </section>
  )
}

export default Sidebar
