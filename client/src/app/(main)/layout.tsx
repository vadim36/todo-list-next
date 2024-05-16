import { AppBar } from "@/widgets/AppBar";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppBar/>
      {children}
    </>
  )
}