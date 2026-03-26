"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquare, 
  Wallet, 
  Settings, 
  LogOut, 
  Coins,
  Bell,
  Plus,
  ArrowLeftRight
} from "lucide-react";

type Role = "student" | "freelancer";

interface DashboardContextType {
  role: Role;
  setRole: (role: Role) => void;
  credits: number;
}

const DashboardContext = React.createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within DashboardProvider");
  return context;
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("student");
  const [credits] = useState(850);
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "My Tasks", icon: FolderKanban, href: "/dashboard/tasks" },
    { name: "Messages", icon: MessageSquare, href: "/dashboard/messages" },
    { name: "Wallet", icon: Wallet, href: "/dashboard/wallet" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <DashboardContext.Provider value={{ role, setRole, credits }}>
      <div className="flex min-h-screen bg-white font-sans">
        {/* Sidebar */}
        <aside className="w-16 md:w-64 bg-slate-50/80 backdrop-blur-md border-r border-slate-200 flex flex-col sticky top-0 h-screen z-50 transition-all duration-300">
          <div className="h-[60px] flex items-center px-6 border-b border-slate-200">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
              <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white shrink-0 shadow-lg shadow-slate-900/10">A</div>
              <span className="text-slate-900 md:inline hidden">Assigne.app</span>
            </Link>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-sm font-medium group relative ${
                    isActive 
                      ? "bg-white/50 text-slate-900 border-l-4 border-slate-900 shadow-sm" 
                      : "text-slate-500 hover:bg-white/30 hover:text-slate-900 border-l-4 border-transparent"
                  }`}
                >
                  <link.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-slate-900" : ""}`} />
                  <span className="md:inline hidden">{link.name}</span>
                  {!isActive && (
                    <div className="md:hidden absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                       {link.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-slate-200">
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-slate-500 hover:bg-red-50/50 hover:text-red-600 transition-colors text-sm font-medium group">
              <LogOut className="w-4 h-4 shrink-0 group-hover:text-red-600" />
              <span className="md:inline hidden">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Dashboard Header */}
          <header className="h-[60px] bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm shadow-slate-900/[0.02]">
            <div className="flex items-center gap-4">
               {/* Shadcn-style Role Switcher Tabs */}
               <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-sm">
                  <button 
                    onClick={() => setRole("student")}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-2 ${
                      role === "student" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Student
                  </button>
                  <button 
                    onClick={() => setRole("freelancer")}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-2 ${
                      role === "freelancer" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Expert
                  </button>
               </div>
               <button 
                onClick={() => setRole(role === "student" ? "freelancer" : "student")}
                className="hidden md:flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
               >
                 <ArrowLeftRight className="w-3 h-3" />
                 Quick Switch
               </button>
            </div>

            <div className="flex items-center gap-4">
              {role === "freelancer" && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-md border border-slate-200">
                  <Coins className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-slate-900 font-bold text-xs">{credits} Credits</span>
                </div>
              )}

              <div className="relative cursor-pointer p-2 hover:bg-slate-100 rounded-md transition-colors group">
                <Bell className="w-4 h-4 text-slate-500 group-hover:text-slate-900" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-primary rounded-full border border-white"></span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-xs font-bold text-slate-900">#U1245</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-medium text-slate-500 uppercase">Online</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-xs font-bold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors">
                  U1
                </div>
              </div>
            </div>
          </header>

          <div className="p-8 flex-1">
             <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                      Welcome back, #U1245
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                      Here's an overview of your {role === "student" ? "assignments" : "active tasks"} for today.
                    </p>
                  </div>
                  {role === "student" && (
                    <Link href="/post" className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm inline-flex items-center gap-2">
                       <Plus className="w-4 h-4" />
                       New Assignment
                    </Link>
                  )}
                </div>
                {children}
             </div>
          </div>
        </main>
      </div>
    </DashboardContext.Provider>
  );
}
