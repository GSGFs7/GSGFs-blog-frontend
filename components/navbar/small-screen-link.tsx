import Link from "next/link";

export default function SmallScreenLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link className="text-2xl" href={href}>
      {label}
    </Link>
  );
}
