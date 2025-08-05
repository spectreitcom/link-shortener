import { PropsWithChildren } from "react";
import { Navbar } from "@/components/navbar";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className={"h-screen"}>
      <Navbar />
      <div className={"container mx-auto mt-8"}>{children}</div>
    </div>
  );
}
