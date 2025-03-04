import { LogOut } from "lucide-react"

import { logoutAccount } from "@/lib/actions/user.actions"
import { cn } from "@/lib/utils"

const FooterSidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <footer className={cn({ "self-center": !isOpen })}>
      <button
        onClick={() => logoutAccount()}
        className="flex gap-3 items-center justify-start"
      >
        <div
          className={cn("relative", isOpen ? "border-r border-separate" : "")}
        >
          <LogOut className={cn("size-6", isOpen ? "ml-4 mr-2" : "")} />
        </div>

        <p className={cn(isOpen ? "text-[16px] font-semibold" : "hidden")}>
          Sair
        </p>
      </button>
    </footer>
  )
}
export default FooterSidebar
