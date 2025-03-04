import Image from "next/image"
import Link from "next/link"

type LogoProps = {
  h: number
  w: number
}

const Logo = ({ w, h }: LogoProps) => {
  return (
    <Link href="/">
      <Image
        src="/images/Grand_Chase_logo.webp"
        width={w}
        height={h}
        quality={100}
        alt="Grand Chase Logo"
        priority
        className="w-auto h-auto"
      />
    </Link>
  )
}
export default Logo
