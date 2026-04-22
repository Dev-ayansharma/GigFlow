"use client";

import { Briefcase, LogOut } from "lucide-react";
import { useAuth } from "../../context/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            GigFlow
          </h1>
        </div>

        {/* USER SECTION */}
        <div className="flex items-center gap-4">

          {/* USER INFO */}
          <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">

            {/* AVATAR */}
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            {/* NAME + ROLE */}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-gray-900">
                {user?.name}
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {user?.role}
              </span>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;