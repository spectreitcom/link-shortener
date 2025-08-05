import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export default function SignUpPage() {
  return (
    <Card className={"w-xl mt-24"}>
      <CardHeader>
        <CardTitle>Shortener - Sign Up</CardTitle>
        <CardDescription>
          Create a new account and start shorting your links
        </CardDescription>
        <CardAction>
          <Button variant={"link"} asChild>
            <Link href={"/auth/sign-in"}>Sign In</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
