import { getLoggedInUser, getUserInfo } from "@/lib/actions/user.actions"
import Dungeons from "./_components/Dungeons"

const Desafios = async () => {
  const loggedIn = await getLoggedInUser()
  const { userId } = await getUserInfo(loggedIn)

  return (
    <section className="h-screen overflow-y-auto">
      <Dungeons userId={userId} />
    </section>
  )
}

export default Desafios
