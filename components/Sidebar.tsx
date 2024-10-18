"use client"

import Link from "next/link"
import { SidebarLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import FooterSidebar from "./FooterSidebar"
import Logo from "./Logo"

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between pt-8 max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px] shadow-md">
      <nav className="flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <Logo
            w={190}
            h={0}
          />

          <h1 className="mb-12 text-[26px] font-bold">Tracker</h1>
        </div>

        {SidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`)

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("flex gap-3 items-center py-1 md:p-3 2xl:p-4 justify-start ", {
                "border-b border-separate border-[#00ffff]": isActive,
              })}
            >
              <div className="relative border-r border-separate pr-10 size-6">
                <Image
                  src={item.imgUrl}
                  alt={item.label}
                  fill
                  className="invert"
                />
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
