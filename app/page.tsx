import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="w-full h-full">
      <section className="flex flex-col items-center justify-center h-2/5">
        <h1 className="font-semibold text-4xl">
          SEU <span className="text-primary">FARM</span>, SEU PROGRESSO
        </h1>

        <p className="text-md opacity-70 text-wrap">
          Acompanhe sua evolução e seus crafts mais importantes
        </p>

        <Button className="w-64">Entre na sua conta</Button>
      </section>
    </main>
  )
}
