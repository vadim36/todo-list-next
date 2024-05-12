import { Skeleton } from "@/components/ui/skeleton";

export function LoadingPage() {
  return (
    <div className="flex flex-col p-3 gap-2">
      Page is loading...
      <Skeleton className="h-28 w-dvw"/>
      <Skeleton className="h-12 w-1/2"/>
      <Skeleton className="h-12 w-1/2"/>
      <Skeleton className="h-12 w-1/2"/>
      <Skeleton className="h-12 w-1/2"/>
    </div>
  )
}