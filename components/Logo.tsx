import Image from "next/image"

type LogoProps = {
  h: number
  w: number
}

const Logo = ({ w, h }: LogoProps) => {
  return (
    <>
      <Image
        src="/icons/Grand_Chase_logo.webp"
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
