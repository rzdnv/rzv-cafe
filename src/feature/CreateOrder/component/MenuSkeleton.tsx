export const MenuSkeleton = () => {
  return (
    <div className="rounded-xl shadow-sm overflow-hidden bg-white">
      {/* Skeleton Gambar */}
      <div className="w-full aspect-4/3 bg-gray-300 animate-pulse" />

      {/* Body */}
      <div className="p-4 flex justify-between items-end">
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse" />
        </div>

        {/* Tombol Skeleton */}
        <div className="h-8 w-24 bg-gray-300 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};
