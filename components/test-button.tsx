"use client";

export default function TestButton({ action }: { action: () => void }) {
  return (
    <form action={action}>
      <button type="submit">test</button>
    </form>
  );
}
