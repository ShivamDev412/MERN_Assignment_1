import { Skeleton } from "./ui/skeleton";
const TableSkeleton = () => {
  return (
    <div className="flex items-center w-full space-y-4 flex-col">
    <Skeleton className="h-12 w-full" />
    {new Array(10).fill(0).map((_, index) => (
      <Skeleton key={index} className="h-10 w-full" />
    ))}
  </div>
  )
}

export default TableSkeleton