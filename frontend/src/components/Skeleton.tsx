import { Skeleton } from "./ui/skeleton";
const TableSkeleton = () => {
  return (
    <div className="flex items-center w-full space-y-4 flex-col">
      <Skeleton className="h-12 w-full" />
      {new Array(10).fill(0).map((_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  );
};
const HeaderSkeleton = () => {
  return (
    <div className="flex items-center w-full justify-between my-4">
      <div className="w-[40%] flex gap-2">
        <Skeleton className="h-10 w-[75%]" />
        <Skeleton className="h-10 w-[20%]" />
      </div>
      <Skeleton className="h-10 w-[10%]" />
    </div>
  );
};

export { HeaderSkeleton, TableSkeleton };
