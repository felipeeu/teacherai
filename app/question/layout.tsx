import { nunito } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav
        className={`${nunito.className} text-white flex justify-between w-full h-14 bg-mopi-blue fixed`}
      >
        <Image
          className={"pt-2"}
          src="/logo_mopi.png"
          alt="Mopi Logo"
          width={100}
          height={80}
          priority
        />
        <Link
          className="self-center pr-10 font-extrabold"
          href={`/survey`}
          passHref
        >
          Avaliar
        </Link>
      </nav>
      <div className="flex md:h-screen flex-col md:flex-row md:overflow-hidden md:py-4 py-8">
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </>
  );
}
