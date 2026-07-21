import {
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  MessageSquareText,
  Scale,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
  UserCog,
  Users,
  X,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function Sidebar({
  isOpen = false,
  onClose = () => {},
}) {
  const navigate = useNavigate();

  const storedRole =
    localStorage.getItem("role") || "Candidate";

  const normalizedRole = storedRole
    .trim()
    .toLowerCase()
    .replaceAll("_", "")
    .replaceAll(" ", "");

  const isRecruiter =
    normalizedRole === "recruiter";

  const isHiringManager =
    normalizedRole === "hiringmanager";

  const isAdmin =
    normalizedRole === "admin" ||
    normalizedRole === "administrator";

  const candidateLinks = [
    {
      label: "Dashboard",
      path: "/candidate",
      icon: LayoutDashboard,
    },
    {
      label: "Profile",
      path: "/candidate/profile",
      icon: User,
    },
    {
      label: "Jobs",
      path: "/candidate/jobs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Applications",
      path: "/candidate/applications",
      icon: FileText,
    },
    {
      label: "AI Assistant",
      path: "/candidate/ai-assistant",
      icon: Sparkles,
    },
    {
      label: "Messages",
      path: "/candidate/messages",
      icon: MessageSquare,
    },
    {
      label: "Settings",
      path: "/candidate/settings",
      icon: Settings,
    },
  ];

  const recruiterLinks = [
    {
      label: "Dashboard",
      path: "/recruiter",
      icon: LayoutDashboard,
    },
    {
      label: "Manage Jobs",
      path: "/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Applicants",
      path: "/recruiter/applicants",
      icon: Users,
    },
    {
      label: "Analytics",
      path: "/recruiter/analytics",
      icon: FileText,
    },
    {
      label: "Messages",
      path: "/recruiter/messages",
      icon: MessageSquare,
    },
    {
      label: "Settings",
      path: "/recruiter/settings",
      icon: Settings,
    },
  ];

  const hiringManagerLinks = [
    {
      label: "Dashboard",
      path: "/hiring-manager",
      icon: LayoutDashboard,
    },
    {
      label: "Review Candidates",
      path: "/hiring-manager/candidates",
      icon: Users,
    },
    {
      label: "Interview Feedback",
      path: "/hiring-manager/feedback",
      icon: MessageSquareText,
    },
    {
      label: "Hiring Decisions",
      path: "/hiring-manager/decisions",
      icon: Scale,
    },
    {
      label: "Settings",
      path: "/hiring-manager/settings",
      icon: Settings,
    },
  ];

  const adminLinks = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Manage Users",
      path: "/admin/users",
      icon: UserCog,
    },
    {
      label: "Manage Jobs",
      path: "/admin/jobs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Recruiters",
      path: "/admin/recruiters",
      icon: Users,
    },
    {
      label: "System Reports",
      path: "/admin/reports",
      icon: FileText,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  let links = candidateLinks;
  let homePath = "/candidate";
  let roleLabel = "Candidate";

  if (isRecruiter) {
    links = recruiterLinks;
    homePath = "/recruiter";
    roleLabel = "Recruiter";
  } else if (isHiringManager) {
    links = hiringManagerLinks;
    homePath = "/hiring-manager";
    roleLabel = "Hiring Manager";
  } else if (isAdmin) {
    links = adminLinks;
    homePath = "/admin";
    roleLabel = "Administrator";
  }

  const dashboardPaths = [
    "/candidate",
    "/recruiter",
    "/hiring-manager",
    "/admin",
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");

    onClose();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      aria-label="Dashboard navigation"
      className={`
        fixed inset-y-0 left-0 z-40
        flex h-screen w-64 shrink-0
        transform flex-col
        bg-slate-950 text-white
        shadow-2xl
        transition-transform duration-300 ease-in-out

        lg:static
        lg:z-auto
        lg:translate-x-0

        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `}
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 px-5">
        <NavLink
          to={homePath}
          onClick={onClose}
          className="flex min-w-0 items-center gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-950/40">
            {isAdmin ? (
              <ShieldCheck size={19} />
            ) : (
              <Sparkles size={19} />
            )}
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-tight">
              AI Recruit
            </h1>

            <p className="truncate text-xs text-slate-400">
              Recruitment Platform
            </p>
          </div>
        </NavLink>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
        >
          <X size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Menu
        </p>

        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;

            const isDashboardRoute =
              dashboardPaths.includes(link.path);

            return (
              <NavLink
                key={`${link.label}-${link.path}`}
                to={link.path}
                end={isDashboardRoute}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                    group relative flex items-center
                    gap-3 overflow-hidden rounded-xl
                    px-4 py-3 text-sm font-medium
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/30"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-white" />
                    )}

                    <Icon
                      size={20}
                      className="shrink-0"
                    />

                    <span className="truncate">
                      {link.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="shrink-0 border-t border-slate-800 p-4">
        <div className="mb-3 rounded-xl bg-slate-900 p-3">
          <p className="text-xs text-slate-400">
            Signed in as
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-white">
            {roleLabel}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
        >
          <LogOut size={20} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;