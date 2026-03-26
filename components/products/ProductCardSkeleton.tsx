export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-[32px] bg-white p-4 shadow-[0_4px_4px_-1px_rgba(12,12,13,0.1),0_4px_4px_-1px_rgba(12,12,13,0.05)] overflow-clip animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-[42px] w-40 rounded bg-gray-200" />
        <div className="h-6 w-52 rounded bg-gray-200" />
      </div>
      <div className="h-[300px] w-full rounded-3xl bg-gray-200" />
    </div>
  );
}
