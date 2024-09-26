import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/chat"}>Chat</Link>
      <h1>Next.js + Electron</h1>
      <p>This is a desktop chat app built with Next.js and Electron.</p>
    </div>
  );
}
