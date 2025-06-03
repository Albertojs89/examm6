import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-center gap-4 p-4 bg-black/50 text-white z-10">
      <Link href="/">
        <button className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">MovieExplorer</button>
      </Link>
      <Link href="/about">
        <button className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">About </button>
      </Link>
      <Link href="/">
        <button className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">Alberto Jiménez</button>
      </Link>
      
    </header>
  );
}