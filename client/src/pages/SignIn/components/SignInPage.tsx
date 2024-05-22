import { Button } from "@/components/ui/button";
import { PAGES } from "@/shared";
import { SignInForm } from "@/widgets/SignInForm";
import Link from "next/link";

export function SignInPage() {
  return (
    <div className="p-2 flex flex-col items-start">
      <Button asChild>
        <Link href={PAGES.SIGN_UP}>Back</Link>
      </Button>
      <SignInForm/>
    </div>
  )
}