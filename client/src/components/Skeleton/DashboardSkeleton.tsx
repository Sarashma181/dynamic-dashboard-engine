function DashboardSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-40 animate-pulse rounded-xl bg-gray-200"
        />
      ))}

    </div>
  );
}

export default DashboardSkeleton;