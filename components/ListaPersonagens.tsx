import { getLoggedInUser, getUserInfo } from "@/lib/actions/user.actions"

const ListaPersonagens = async () => {
  const loggedIn = await getLoggedInUser()
  const { userId, possuiPersonagem } = await getUserInfo(loggedIn)

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      {possuiPersonagem ? (
        <div>Lista de personagens:</div>
      ) : (
        <div>Você ainda não possui personagens</div>
      )}
    </section>
  )
}

export default ListaPersonagens
