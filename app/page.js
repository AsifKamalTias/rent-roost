import Link from "next/link";

export default function Home() {
  return (
    <main>
      Home
      <Link href="/properties">Show Properties</Link>
    </main>
  );
}
