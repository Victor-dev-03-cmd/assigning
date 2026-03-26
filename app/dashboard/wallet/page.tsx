"use client";

import React, { useState, useEffect } from "react";
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  ArrowDownLeft, 
  ArrowUpRight, 
  History, 
  Plus, 
  Coins, 
  ArrowRight,
  Shield,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useDashboard } from "../layout";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data ---

const transactionHistory = [
  { id: "TXN-9921", date: "Mar 26, 2026, 10:30 AM", description: "Payment Released for Python Project", type: "Credit", amount: "LKR 12,500", rawAmount: 12500, category: "Cash" },
  { id: "TXN-9918", date: "Mar 25, 2026, 02:15 PM", description: "Bid Placed for #AU4201", type: "Debit", amount: "100 Credits", rawAmount: 100, category: "Credits" },
  { id: "TXN-9915", date: "Mar 24, 2026, 09:45 AM", description: "Escrow Held for Civil Engineering", type: "Escrow Held", amount: "LKR 18,000", rawAmount: 18000, category: "Cash" },
  { id: "TXN-9912", date: "Mar 23, 2026, 11:20 AM", description: "Withdrawal to HNB Account", type: "Debit", amount: "LKR 5,000", rawAmount: 5000, category: "Cash" },
];

const pendingReleases = [
  { id: "AU4202", title: "Civil Engineering Analysis", amount: "18,000", timeLeft: 850 }, // seconds
];

const chartData = [40, 70, 45, 90, 65, 85, 55]; // Weekly trend

// --- Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "success" | "warning" | "destructive" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-600",
    success: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-700",
    destructive: "bg-red-50 text-red-600",
  };
  return (
    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${variants[variant]} font-poppins`}>
      {children}
    </span>
  );
};

const SimpleTrendChart = () => (
  <div className="flex items-end gap-2 h-24 pt-4 px-2">
    {chartData.map((val, i) => (
      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: `${val}%` }}
          transition={{ delay: i * 0.1, duration: 0.8 }}
          className="w-full bg-blue-500/20 rounded-t-lg group-hover:bg-blue-600 transition-all cursor-pointer relative"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {val}%
          </div>
        </motion.div>
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Day {i+1}</span>
      </div>
    ))}
  </div>
);

const CountdownTimer = ({ initialTime }: { initialTime: number }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="flex items-center gap-1 font-mono font-bold text-amber-600">
      <Clock className="w-4 h-4" />
      <span>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
};

export default function WalletPage() {
  const { credits, role } = useDashboard();
  const [filter, setFilter] = useState("All");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 font-inter"
    >
      {/* 1. Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-none relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] font-poppins">
                {role === "student" ? "Escrow Balance" : "Withdrawable Balance"}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white leading-none font-poppins">
                LKR {role === "student" ? "18,000" : "45,000"}
              </h2>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">Current Cash Assets</p>
            </div>
          </div>
        </Card>

        <Card className="bg-blue-600 border-none relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <button className="text-white text-[9px] font-black uppercase tracking-widest border border-white/20 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-600 transition-all">
                Top Up Credits
              </button>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white leading-none font-poppins">
                {credits} Credits
              </h2>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">Active Bidding Tokens</p>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-poppins">Lifetime {role === "student" ? "Spent" : "Earned"}</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 leading-none font-poppins tracking-tight">LKR 142,500</h2>
            <div className="mt-4">
              <SimpleTrendChart />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 2. Transaction History (Left/Large Column) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight font-poppins flex items-center gap-2">
              <History className="w-5 h-5" /> Transaction History
            </h3>
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              {["All", "Cash", "Credits"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    filter === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest font-poppins">Date & ID</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest font-poppins">Description</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest font-poppins">Type</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest font-poppins text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactionHistory
                    .filter(t => filter === "All" || t.category === filter)
                    .map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-xs font-bold text-slate-900">{tx.date}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 group-hover:text-blue-600 transition-colors">{tx.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-700 leading-tight">{tx.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={tx.type === "Credit" ? "success" : tx.type === "Escrow Held" ? "warning" : "default"}>
                          {tx.type}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`text-sm font-black font-poppins ${tx.type === "Credit" ? "text-emerald-600" : "text-slate-900"}`}>
                          {tx.type === "Debit" ? `- ${tx.amount}` : tx.amount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {transactionHistory.length === 0 && (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto border border-slate-100">
                  <AlertCircle className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">No transactions yet</h4>
                  <p className="text-xs text-slate-500 mt-1">Start exploring assignments to see activity here.</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* 3. Action Columns (Right/Sidebar) */}
        <div className="lg:col-span-4 space-y-8">
          {/* 4. Pending Releases Section */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-poppins px-1">Pending Releases</h3>
            <div className="space-y-3">
              {pendingReleases.map(release => (
                <Card key={release.id} className="bg-amber-50/50 border-amber-200">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{release.title}</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">LKR {release.amount}</p>
                      </div>
                      <CountdownTimer initialTime={release.timeLeft} />
                    </div>
                    <button className="w-full py-3 bg-amber-600 text-white rounded-xl text-xs font-black uppercase tracking-[0.1em] hover:bg-amber-700 transition-all shadow-md shadow-amber-200 active:scale-95 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Confirm & Release
                    </button>
                  </div>
                </Card>
              ))}
              {pendingReleases.length === 0 && (
                <p className="text-[10px] font-bold text-slate-400 uppercase text-center py-4 border border-dashed border-slate-200 rounded-xl">No pending releases</p>
              )}
            </div>
          </section>

          {/* 3. Withdrawal/Top-Up Section */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-poppins px-1">
              {role === "freelancer" ? "Withdrawal Hub" : "Payment Methods"}
            </h3>
            
            <Card className="space-y-6">
              {role === "freelancer" ? (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Linked Bank</p>
                        <p className="text-xs font-bold text-slate-900">HNB Bank • **** 4567</p>
                      </div>
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-[9px] font-bold text-blue-800 leading-relaxed uppercase tracking-tight">
                        Minimum LKR 2,000 required for withdrawal.
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-slate-200 active:scale-95">
                    Process Withdrawal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-500 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-900">Visa • • • • 1234</span>
                      </div>
                      <Badge variant="success">Primary</Badge>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-slate-50 border border-slate-200 border-dashed rounded-xl hover:bg-white hover:border-slate-900 transition-all group">
                      <Plus className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                      <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-900 uppercase tracking-widest">Add Payment Method</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-4 opacity-30 grayscale">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                  </div>
                </>
              )}
            </Card>
          </section>

          {/* Security Badge */}
          <section className="pt-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1 font-poppins">Banking Grade Security</p>
                <p className="text-[9px] font-medium text-slate-500 leading-relaxed uppercase tracking-tight">
                  All transactions are encrypted and secured by Sri Lankan Banking Standards via LankaPay networks.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
