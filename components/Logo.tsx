import Image from "next/image"

type LogoProps = {
  h: number
  w: number
}

const Logo = ({ w, h }: LogoProps) => {
  return (
    <>
      <Image
        src="/icons/logo-grandchase.png"
        width={w}
        height={h}
        quality={100}
        alt="Grand Chase Logo"
        priority
      />
    </>
  )
}
export default Logo
