import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export default function SignInPage() {
  return (
    <Card className={"w-xl mt-24"}>
      <CardHeader>
        <CardTitle>Shortener - Sign In</CardTitle>
        <CardAction>
          <Button variant={"link"} asChild>
            <Link href={"/auth/sign-up"}>Sign Up</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}
