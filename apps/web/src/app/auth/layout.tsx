import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className={"h-screen flex justify-center items-start bg-slate-200"}>
      {children}
    </div>
  );
}
