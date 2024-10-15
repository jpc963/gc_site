import Image from "next/image"

type LogoProps = {
  h: number
  w: number
}

const Logo = ({ w, h }: LogoProps) => {
  return (
    <>
      <Image
        src="/icons/Grand_Chase_Logo.webp"
        width={w}
        height={h}
        alt="Grand Chase Logo"
        priority
      />
    </>
  )
}
export default Logo
