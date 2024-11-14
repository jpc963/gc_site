import { cookies } from "next/headers"
import Card from "./_components/Card"

const Armazem = async () => {
  const userId = (await cookies().get("user-session")?.value) || ""

  return (
    <section className="w-full h-full">
      <Card userId={userId} />
    </section>
  )
}

export default Armazem
