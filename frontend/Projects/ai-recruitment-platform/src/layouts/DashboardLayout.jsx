import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscapeKey
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      sidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      <div className="min-w-0 flex-1">
        <Navbar onMenuClick={openSidebar} />

        <main className="w-full p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;