import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false, // WIP
    follow: false,
  },
};

export default async function Page() {
  return <div>category</div>;
}
