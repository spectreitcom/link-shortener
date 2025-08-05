import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";

export async function Navbar() {
  const session = await getSession();
  return (
    <div className={"px-8 py-4 shadow-md flex justify-between items-center"}>
      <div className={"text-xl font-bold"}>Shortener</div>
      <div className={"flex gap-4 items-center"}>
        <p>Hello, {session?.email}</p>
        <Button variant={"ghost"} asChild>
          <a href="/api/auth/logout">Log out</a>
        </Button>
      </div>
    </div>
  );
}
