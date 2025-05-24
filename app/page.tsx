import { Button } from "@/components/ui/button"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function Home() {
  const userSession = cookies().get("user-session")?.value

  if (userSession) {
    redirect("/dashboard")
  }

  return (
    <main className="w-full h-full">
      <section className="flex flex-col items-center h-full">
        <div className="flex flex-col items-center justify-center h-2/5 w-full">
          <h1 className="font-semibold text-2xl md:text-4xl">
            SEU <span className="text-primary">FARM</span>, SEU PROGRESSO
          </h1>

          <p className="text-sm md:text-md opacity-70 text-wrap">
            Acompanhe sua evolução e seus crafts mais importantes
          </p>
        </div>

        <Link href="/login">
          <Button className="w-64">Entre na sua conta</Button>
        </Link>
      </section>
    </main>
  )
}
