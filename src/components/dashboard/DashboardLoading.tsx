
export const DashboardLoading = () => {
  return (
    <section className="min-h-[50vh] flex flex-col justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-purple"></div>
      <p className="mt-4 text-gray-300">Loading dashboard...</p>
    </section>
  );
};
