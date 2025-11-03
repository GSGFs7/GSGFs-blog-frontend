import { GiPumpkinLantern } from "react-icons/gi";

export function HalloweenPumpkin() {
  return (
    <GiPumpkinLantern
      className="pointer-events-none absolute inset-0 -top-56 left-64 -z-10 hidden h-96 w-96 text-orange-500 opacity-70 lg:block"
      style={{ transform: "rotate(45deg)" }}
    />
  );
}
