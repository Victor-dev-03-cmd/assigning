"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, Coins, Menu, X, Plus } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<"Freelancer" | "Client">("Freelancer"); // Example state
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navLinks = [
    { name: "Explore", href: "/tasks" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    ...(isLoggedIn ? [{ name: "Dashboard", href: "/dashboard" }] : []),
    { name: "Support", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-[80px] bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center px-6 md:px-12 font-sans">
      {/* Left Section: Branding */}
      <div className="flex-1 flex items-center">
        <Link href="/" className="text-3xl font-bold transition-transform hover:scale-105 active:scale-95 flex items-center font-sans">
          <span className="text-[#6C3BAA]">Assigne</span>
          <span className="text-[#A379D9]">.app</span>
        </Link>
      </div>

      {/* Center Section: Main Navigation (Desktop) */}
      <nav className="hidden md:flex items-center space-x-8 font-sans">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="relative text-slate-600 font-medium transition-colors hover:text-brand-primary group font-sans"
          >
            {link.name}
            <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-brand-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
        ))}
      </nav>

      {/* Right Section: User Status & Security */}
      <div className="flex-1 flex items-center justify-end space-x-4 font-sans">
        {isLoggedIn && (
          <>
            <Link 
              href="/post"
              className="flex items-center space-x-2 bg-brand-primary text-white px-4 py-2 rounded text-sm transition-all hover:bg-brand-dark active:scale-95 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Post Project</span>
            </Link>

            <div className="relative cursor-pointer">
              <Bell className="w-6 h-6 text-slate-600 outline-none" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-brand-primary rounded-full border-2 border-white animate-ping"></span>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-brand-primary rounded-full border-2 border-white"></span>
            </div>

            {userRole === "Freelancer" && (
              <div className="flex items-center space-x-2 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 animate-pulse-slow">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="text-emerald-700 font-bold text-sm">Credits: 1000</span>
              </div>
            )}

            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 rounded-full border-2 border-brand-primary bg-brand-accent/10 flex items-center justify-center overflow-hidden">
                <span className="text-brand-primary font-bold">U</span>
              </div>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 font-sans">
                <Link href="/dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">Dashboard</Link>
                <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">Settings</Link>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-slate-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-600 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 top-[80px] bg-white z-40 transition-transform duration-300 md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col p-6 space-y-6 font-sans">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xl font-medium text-slate-700 hover:text-brand-primary transition-colors font-sans"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
