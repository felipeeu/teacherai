import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <Image
        className={"pt-2 bg-mopi-blue rounded-md"}
        src="/logo_mopi.png"
        alt="Mopi Logo"
        width={100}
        height={100}
        priority
      />
    </main>
  );
}
