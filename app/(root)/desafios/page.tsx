import Dungeons from "./_components/Dungeons"
import { cookies } from "next/headers"

const Desafios = async () => {
  const userId  = await cookies().get("user-session")?.value || ""

  return (
    <section className="h-screen overflow-y-auto">
      <Dungeons userId={userId} />
    </section>
  )
}

export default Desafios
