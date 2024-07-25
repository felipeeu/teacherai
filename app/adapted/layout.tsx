import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="w-full h-14 bg-mopi-blue">
        {" "}
        <Image
          className={"pt-2"}
          src="/logo_mopi.png"
          alt="Mopi Logo"
          width={100}
          height={80}
          priority
        />
      </nav>
      <div className="flex md:h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </>
  );
}
