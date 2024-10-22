import { getLoggedInUser, getUserInfo } from "@/lib/actions/user.actions"
import Card from "./_components/Card"

const Armazem = async () => {
  const loggedIn = await getLoggedInUser()
  const { userId } = await getUserInfo(loggedIn)
  
  return (
    <section className="w-full h-full">
      <Card userId={userId} />
    </section>
  )
}

export default Armazem
