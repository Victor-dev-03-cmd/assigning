"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  ChevronRight, 
  LogOut, 
  CheckCircle2, 
  MoreVertical,
  Camera,
  Mail,
  Lock,
  Smartphone,
  Globe,
  Trash2,
  AlertTriangle,
  Banknote,
  Clock,
  Save,
  Check,
  ShieldCheck,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboard } from "../layout";

// --- Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

const Toggle = ({ enabled, onChange }: { enabled: boolean, onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
      enabled ? "bg-blue-600" : "bg-slate-200"
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        enabled ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

const SettingItem = ({ icon: Icon, title, description, badge, children }: { icon: any, title: string, description: string, badge?: string, children?: React.ReactNode }) => (
  <div className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-slate-200 transition-all group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-left">
        <div className="text-sm font-bold text-slate-900 leading-none mb-1 flex items-center gap-2 font-poppins">
          {title}
          {badge && <span className="bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-widest">{badge}</span>}
        </div>
        <p className="text-[11px] font-medium text-slate-500 leading-relaxed max-w-[200px] sm:max-w-md">{description}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      {children || <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-all" />}
    </div>
  </div>
);

// --- Sections ---

const ProfileSection = () => (
  <div className="space-y-6">
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
      <div className="relative pt-10 flex flex-col sm:flex-row items-center sm:items-end gap-6">
        <div className="relative group">
          <div className="w-28 h-28 rounded-[2rem] bg-slate-100 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
            <User className="w-12 h-12 text-slate-300" />
          </div>
          <button className="absolute bottom-1 right-1 w-9 h-9 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div className="pb-2 text-center sm:text-left">
          <h3 className="text-2xl font-black text-slate-900 font-poppins tracking-tight">User #U1245</h3>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">u1245.assigne.app@gmail.com</p>
        </div>
      </div>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-poppins">Identity & University</h4>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Full Name</label>
            <input type="text" defaultValue="Laxsan Victor" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600/30 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-500 uppercase ml-1">University</label>
            <div className="relative">
              <input type="text" defaultValue="University of Colombo" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none pr-10" />
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mt-1 ml-1">
               <Shield className="w-3 h-3" /> VERIFIED STUDENT ID
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-poppins">Bio & Expertise</h4>
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Profile Bio</label>
          <textarea rows={4} defaultValue="Final year Computer Science student at UOC. Passionate about software architecture and security systems." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600/30 transition-all resize-none" />
        </div>
      </Card>
    </div>
  </div>
);

const SecuritySection = () => {
  const [toggles, setToggles] = useState({ twoFactor: true });

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-poppins">Login Credentials</h4>
        <div className="space-y-3">
          <SettingItem icon={Mail} title="Email Address" description="u1245.assigne.app@gmail.com (OTP Verified)" badge="Primary" />
          <SettingItem icon={Lock} title="Change Password" description="Last changed 2 months ago." />
          <SettingItem icon={Smartphone} title="Two-Factor Authentication" description="Secure your payment releases and logins.">
            <Toggle enabled={toggles.twoFactor} onChange={() => setToggles({...toggles, twoFactor: !toggles.twoFactor})} />
          </SettingItem>
        </div>
      </Card>

      <Card className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-poppins">Active Sessions</h4>
        <div className="space-y-3">
          {[
            { device: "Ubuntu Linux - Colombo, LK", current: true, time: "Active Now" },
            { device: "iPhone 15 Pro - Colombo, LK", current: false, time: "2 hours ago" },
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                   <Smartphone className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{session.device} {session.current && <span className="text-emerald-500 text-[10px] ml-1 uppercase tracking-widest font-black">(Current)</span>}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{session.time}</p>
                </div>
              </div>
              {!session.current && <button className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Revoke</button>}
            </div>
          ))}
          <button className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-[0.15em]">Log out from all devices</button>
        </div>
      </Card>
    </div>
  );
};

const FinanceSection = () => {
  const { role } = useDashboard();
  const [toggles, setToggles] = useState({ autoWithdraw: false });

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-poppins">Financial Connectivity</h4>
        <div className="space-y-3">
          <SettingItem icon={CreditCard} title="Primary Card" description="Visa Card ending in • • • • 1234" badge="Secured" />
          {role === "freelancer" && (
            <SettingItem icon={Banknote} title="HNB Bank Account" description="Account ending in • • • • 4567 (Verified)" />
          )}
        </div>
      </Card>

      {role === "freelancer" && (
        <Card className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-poppins">Payout Preferences</h4>
          <div className="space-y-3">
            <SettingItem icon={Clock} title="Auto-Withdrawal" description="Automatically transfer funds once balance hits LKR 5,000.">
              <Toggle enabled={toggles.autoWithdraw} onChange={() => setToggles({...toggles, autoWithdraw: !toggles.autoWithdraw})} />
            </SettingItem>
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[10px] font-bold text-blue-800 leading-relaxed uppercase tracking-tight">
                Manual withdrawals take 1-3 business days to reflect in your Sri Lankan bank account.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

const NotificationSection = () => {
  const [toggles, setToggles] = useState({ newBid: true, payment: true, timer: true });

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-poppins">Notification Controls</h4>
        <div className="space-y-2">
          <SettingItem icon={Bell} title="New Bids Alerts" description="Email me when I receive a new bid on my assignment.">
            <Toggle enabled={toggles.newBid} onChange={() => setToggles({...toggles, newBid: !toggles.newBid})} />
          </SettingItem>
          <SettingItem icon={Banknote} title="Payment Releases" description="Notify me when payment is officially released to my wallet.">
            <Toggle enabled={toggles.payment} onChange={() => setToggles({...toggles, payment: !toggles.payment})} />
          </SettingItem>
          <SettingItem icon={Clock} title="Auto-Release Warnings" description="Alert me 15 minutes before the auto-release timer expires.">
            <Toggle enabled={toggles.timer} onChange={() => setToggles({...toggles, timer: !toggles.timer})} />
          </SettingItem>
        </div>
      </Card>
    </div>
  );
};

// --- Main Page ---

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showSave, setShowSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile Info", icon: User },
    { id: "security", label: "Security & Login", icon: Shield },
    { id: "finance", label: "Payments & Payouts", icon: CreditCard },
    { id: "notifications", label: "Notification Controls", icon: Bell },
    { id: "prefs", label: "Account Prefs", icon: Globe },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSave(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 font-inter">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Sub-Navigation */}
        <aside className="w-full lg:w-64 shrink-0 space-y-2">
          <div className="px-1 mb-4">
             <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-poppins">Settings Menu</h2>
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${
                activeTab === tab.id 
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-1" 
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}

          <div className="pt-10 space-y-4">
             <div className="px-1 mb-2">
                <h2 className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] font-poppins">Danger Zone</h2>
             </div>
             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm group">
               <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
               Deactivate Account
             </button>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              onViewportEnter={() => setShowSave(true)}
            >
              {activeTab === "profile" && <ProfileSection />}
              {activeTab === "security" && <SecuritySection />}
              {activeTab === "finance" && <FinanceSection />}
              {activeTab === "notifications" && <NotificationSection />}
              {activeTab === "prefs" && (
                <Card className="py-20 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-2 bg-slate-50/50">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm border border-slate-100 mb-2">
                    <Globe className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Advanced Preferences</h3>
                  <p className="text-xs text-slate-500 max-w-[200px]">Coming soon: Theme engine and localized currency support.</p>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Sticky Save Footer */}
      <AnimatePresence>
        {showSave && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-3 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
               <div className="flex items-center gap-3 ml-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-600">Unsaved changes detected</span>
               </div>
               <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl shadow-slate-200 disabled:opacity-50"
               >
                 {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 ) : (
                    <><Save className="w-4 h-4" /> Save Changes</>
                 )}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
