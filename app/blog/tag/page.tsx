import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false, // WIP
    follow: false,
  },
};

export default function Page() {
  return <div>tag</div>;
}
