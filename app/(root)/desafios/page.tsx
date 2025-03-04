import { cookies } from "next/headers"

import Dungeons from "./_components/Dungeons"

const Desafios = async () => {
  const userId = (await cookies().get("user-session")?.value) || ""

  //max-w-screen-2xl
  return (
    <section>
      <Dungeons userId={userId} />
    </section>
  )
}

export default Desafios
