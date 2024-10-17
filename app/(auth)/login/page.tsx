import AuthForm from "@/app/(auth)/_components/AuthForm"

const Login = () => {
  return (
    <section className="flex justify-center items-center size-full max-sm:px-6">
      <AuthForm type="login" />
    </section>
  )
}

export default Login
