"use client";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Schools",
      value: 0,
    },
    {
      title: "Students",
      value: 0,
    },
    {
      title: "Users",
      value: 0,
    },
    {
      title: "Teachers",
      value: 0,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>

        <p className="text-gray-400 mt-2">
          Welcome to your administration dashboard
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="
              bg-[#121622]
              border
              border-[#1e2536]
              rounded-2xl
              p-6
              shadow-xl
            "
          >
            <p className="text-gray-400 text-sm">{stat.title}</p>

            <h2 className="text-4xl font-bold text-[#9E7C2F] mt-3">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div
        className="
          mt-10
          bg-[#121622]
          border
          border-[#1e2536]
          rounded-2xl
          p-6
        "
      >
        <h2 className="text-xl font-bold mb-5">Recent Activity</h2>

        <p className="text-gray-400">No activity yet.</p>
      </div>
    </div>
  );
}
