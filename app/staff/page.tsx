export default function StaffDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Card {i}</h2>
            <p className="text-gray-600 dark:text-gray-400">Placeholder content for card {i}.</p>
          </div>
        ))}
      </div>
    </div>
  );
} 