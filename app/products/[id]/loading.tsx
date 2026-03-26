export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-4 py-12 animate-pulse">
      <div className="h-6 w-32 rounded bg-gray-200" />
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="h-[250px] w-full shrink-0 rounded-[32px] bg-gray-200 lg:h-[600px] lg:w-[600px]" />
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="h-[72px] w-48 rounded bg-gray-200" />
            <div className="h-6 w-36 rounded bg-gray-200" />
          </div>
          <div className="h-[42px] w-24 rounded bg-gray-200" />
          <div className="flex flex-col gap-2 pl-4">
            <div className="h-5 w-56 rounded bg-gray-200" />
            <div className="h-5 w-44 rounded bg-gray-200" />
          </div>
          <div className="h-11 w-44 rounded-full bg-gray-200" />
        </div>
      </div>
    </main>
  );
}
