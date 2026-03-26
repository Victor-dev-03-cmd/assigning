"use client";

import React, { useState, useMemo } from "react";
import { useDashboard } from "../layout";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  X,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Download,
  AlertCircle,
  ChevronRight,
  User,
  ExternalLink,
  Inbox
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";

// --- Mock Data ---

const MOCK_TASKS = [
  {
    id: "AU4201",
    title: "Python Data Science Project",
    status: "in_progress",
    partnerId: "E402",
    partnerName: "Expert #E402",
    deadline: "2026-03-27",
    budget: "12,500",
    type: "active"
  },
  {
    id: "AU4202",
    title: "Civil Engineering Analysis",
    status: "awaiting_review",
    partnerId: "E215",
    partnerName: "Expert #E215",
    deadline: "Expired",
    budget: "18,000",
    type: "pending"
  },
  {
    id: "AU4203",
    title: "Marketing Research Paper",
    status: "bidding",
    partnerId: "Pending",
    partnerName: "Open for Bids",
    deadline: "3 Days left",
    budget: "8,500",
    type: "active"
  },
  {
    id: "AU4204",
    title: "React.js Web Application",
    status: "completed",
    partnerId: "E891",
    partnerName: "Expert #E891",
    deadline: "2026-03-20",
    budget: "25,000",
    type: "completed"
  }
];

// --- Components ---

const Badge = ({ status }: { status: string }) => {
  const configs: Record<string, { label: string, classes: string }> = {
    bidding: { label: "Bidding", classes: "bg-purple-50 text-purple-600 border-purple-100" },
    in_progress: { label: "In Progress", classes: "bg-blue-50 text-blue-600 border-blue-100" },
    awaiting_review: { label: "Awaiting Review", classes: "bg-yellow-50 text-yellow-700 border-yellow-100" },
    completed: { label: "Completed", classes: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  };

  const config = configs[status] || configs.bidding;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${config.classes}`}>
      {config.label}
    </span>
  );
};

const ActionCenter = ({ task, isOpen, onClose }: { task: any, isOpen: boolean, onClose: () => void }) => {
  const { role } = useDashboard();
  
  if (!task) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Task Action Center</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">ID: #{task.id}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {/* Task Overview */}
              <div className="space-y-4">
                <Badge status={task.status} />
                <h2 className="text-2xl font-bold text-slate-900">{task.title}</h2>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                   <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{task.partnerName}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{task.deadline}</span>
                   </div>
                </div>
              </div>

              {/* Files Section */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Requirements</h4>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between group cursor-pointer hover:border-brand-primary/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                        <FileText className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Specs_Final.pdf</p>
                        <p className="text-[10px] text-slate-400">2.4 MB • Student Upload</p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-slate-300 group-hover:text-brand-primary transition-colors" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Expert Submissions</h4>
                  {task.status === "awaiting_review" || task.status === "completed" ? (
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between group cursor-pointer hover:border-brand-primary/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                          <FileText className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Final_Project_Files.zip</p>
                          <p className="text-[10px] text-slate-400">15.8 MB • Expert Submission</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-slate-300 group-hover:text-brand-primary transition-colors" />
                    </div>
                  ) : (
                    <div className="p-8 rounded-xl border border-slate-100 border-dashed text-center space-y-2">
                       <AlertCircle className="w-6 h-6 text-slate-300 mx-auto" />
                       <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">No submissions yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-4">
                <Link 
                  href={`/dashboard/viewer/${task.id}`}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                >
                  <ShieldCheck className="w-5 h-5 text-brand-accent" />
                  Securely Preview Work
                </Link>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="py-3.5 bg-white border border-slate-200 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Message {role === "student" ? "Expert" : "Student"}
                  </button>
                  <button 
                    disabled={task.status !== "awaiting_review" || role !== "student"}
                    className="py-3.5 bg-emerald-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-600 disabled:opacity-50 disabled:grayscale transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Release Payment
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
               <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Payments are protected by Assigne Escrow.</span>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function MyTasksPage() {
  const { role } = useDashboard();
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const tabs = [
    { id: "active", label: "Active" },
    { id: "pending", label: "Pending Approval" },
    { id: "completed", label: "Completed" },
  ];

  const filteredTasks = useMemo(() => {
    return MOCK_TASKS.filter(task => {
      const matchesTab = task.type === activeTab;
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           task.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Assignments</h1>
          <p className="text-sm text-slate-500 font-medium">Manage and track your ongoing academic collaborations.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input 
              type="text"
              placeholder="Search by ID or Title..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-950/5 transition-all w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-semibold transition-all relative ${
              activeTab === tab.id ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-slate-900" />
            )}
          </button>
        ))}
      </div>

      {/* Task List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Task Info</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">{role === "student" ? "Expert" : "Student"}</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Deadline</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr 
                    key={task.id} 
                    className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedTask(task)}
                  >
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-brand-primary transition-colors">{task.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: #{task.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <Badge status={task.status} />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold">
                          {task.partnerId[0]}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{task.partnerId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Clock className="w-3.5 h-3.5 opacity-40" />
                        {task.deadline}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="px-4 py-2 bg-slate-50 text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-900 hover:text-white transition-all border border-slate-200">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                        <Inbox className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">No assignments found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ActionCenter 
        task={selectedTask} 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)} 
      />
    </div>
  );
}
