import {
  Bell,
  ChevronDown,
  Menu,
  User,
} from "lucide-react";

function Navbar({ onMenuClick }) {
  const userName =
    localStorage.getItem("userName") ||
    localStorage.getItem("name") ||
    localStorage.getItem("fullName") ||
    "User";

  const role =
    localStorage.getItem("role") || "Candidate";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="shrink-0 rounded-xl p-2 text-gray-600 transition duration-200 hover:bg-gray-100 hover:text-indigo-600 active:scale-95 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="min-w-0">
          <h2 className="hidden truncate text-lg font-bold text-gray-900 sm:block">
            AI Recruitment Platform
          </h2>

          <h2 className="truncate text-lg font-bold text-gray-900 sm:hidden">
            AI Recruit
          </h2>

          <p className="hidden text-xs text-gray-500 md:block">
            Find the right talent with intelligent matching
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-gray-600 transition duration-200 hover:bg-gray-100 hover:text-indigo-600 active:scale-95"
        >
          <Bell size={21} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl p-1.5 transition duration-200 hover:bg-gray-100 sm:pr-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <User size={19} />
          </div>

          <div className="hidden min-w-0 text-left sm:block">
            <p className="max-w-32 truncate text-sm font-semibold text-gray-800">
              {userName}
            </p>

            <p className="text-xs capitalize text-gray-500">
              {role}
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-gray-400 sm:block"
          />
        </button>
      </div>
    </header>
  );
}

export default Navbar;