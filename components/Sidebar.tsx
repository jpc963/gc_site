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
    <section className="sidebar">
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
              className={cn("sidebar-link", {
                "bg-gradient-to-r from-[#130f40]": isActive,
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
