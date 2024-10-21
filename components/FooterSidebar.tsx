'use client'

import { logoutAccount } from "@/lib/actions/user.actions"
import { LogOut } from "lucide-react"

const FooterSidebar = () => {
  return (
    <footer>
      <button
        onClick={() => logoutAccount()}
        className="flex gap-3 items-center py-1 md:p-3 2xl:p-4 justify-start"
      >
        <div className="relative border-r border-separate">
          <LogOut className="size-6 ml-4 mr-2" />
        </div>

        <p className="text-[16px] font-semibold">Sair</p>
      </button>
    </footer>
  )
}
export default FooterSidebar
