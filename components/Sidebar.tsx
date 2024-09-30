"use client"

import Link from "next/link"
import { SidebarLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <Image
            src="/icons/Grand_Chase_Logo.webp"
            width={150}
            height={150}
            alt="Grand Chase Logo"
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
              className={cn("sidebar-link", {
                "bg-gradient-to-r from-[#334258]": isActive,
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
    </section>
  )
}

export default Sidebar
