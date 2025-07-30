import Link from "next/link";

export function NavigateFooter() {
  return (
    <ul className="space-y-2">
      <li className="hover:text-[var(--gold)] transition-colors duration-200">
        <Link href="/Categories/Rings">RINGS</Link>
      </li>
      <li className="hover:text-[var(--gold)] transition-colors duration-200">
        <Link href="/Categories/Necklace">NECKLACE</Link>
      </li>
      <li className="hover:text-[var(--gold)] transition-colors duration-200">
        <Link href="/Categories/Earrings">EARRINGS</Link>
      </li>
      <li className="hover:text-[var(--gold)] transition-colors duration-200">
        <Link href="/Categories/Bracelet">BRACELET</Link>
      </li>
      <li className="hover:text-[var(--gold)] transition-colors duration-200">
        <Link href="/Categories/Nose-Pin">NOSE PIN</Link>
      </li>
    </ul>
  );
}
