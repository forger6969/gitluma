import { Bell } from "lucide-react";

export default function Header() {
  return (
    <div className="w-full bg-[#0B1220] px-6 py-3 flex items-center justify-between  shadow-md">
      <div className="flex items-center gap-3 bg-[#111827] px-4 py-2 rounded-xl w-[500px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197M15 10a5 5 0 11-10 0 5 5 0 0110 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search resources, tasks, or commits..."
          className="bg-transparent outline-none text-sm text-gray-300 w-full placeholder-gray-500"
        />
      </div>

      <div className="flex items-center gap-5">
        <Bell className="text-gray-400 w-5 h-5 cursor-pointer" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-white font-medium">Alex Chen</p>
            <p className="text-xs text-gray-400">Lead Architect</p>
          </div>

          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-9 h-9 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
