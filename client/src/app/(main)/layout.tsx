import { AppBar } from "@/widgets/AppBar";
import { ReactNode } from "react";

export default function MainLayout({ 
  children}: Readonly<{children: ReactNode }> 
) {
  return (
    <>
      <AppBar/>
      {children}
    </>
  )
}