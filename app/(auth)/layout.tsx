import Image from "next/image"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between">
      {children}

      <div className="flex h-screen w-full sticky top-0 items-center justify-end bg-white">
        <div>
          <Image
            src="/icons/home.svg"
            alt="Auth image"
            width={600}
            height={600}
          />
        </div>
      </div>
    </main>
  )
}
