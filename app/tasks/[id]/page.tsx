"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  GraduationCap, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  FileText, 
  Lock, 
  ArrowRight,
  User,
  Star,
  CheckCircle2,
  AlertCircle,
  FileIcon,
  Timer
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Mock Data
const TASK_DATA = {
  id: "AU4201",
  title: "Advanced Database Management System Project",
  university: "University of Moratuwa (UOM)",
  major: "Computer Science",
  subjectCode: "CS3022",
  deadline: "2026-03-27T23:59:59",
  budget: "15,000",
  description: `Build a comprehensive database management system for a university enrollment portal. 
  The system should support:
  - Student registration and login
  - Course catalog and enrollment
  - Grade tracking and GPA calculation
  - Admin dashboard for faculty management

  Technical Requirements:
  - Use MySQL or PostgreSQL
  - Implement complex queries and stored procedures
  - Ensure data normalization (at least 3NF)
  - Provide a clear ER diagram and documentation.`,
  attachedFiles: [
    { name: "Requirements_Spec.pdf", size: "2.4 MB" },
    { name: "ER_Diagram_Sample.png", size: "1.2 MB" },
  ],
  student: {
    id: "S1203",
    rating: 4.8,
    completedAssignments: 12,
  },
  existingBids: [
    { id: "E402", rating: 5.0, amount: "14,500" },
    { id: "E215", rating: 4.9, amount: "15,000" },
    { id: "E891", rating: 4.7, amount: "13,000" },
  ]
};

const TaskDetailsPage = () => {
  const [bidAmount, setBidAmount] = useState(TASK_DATA.budget);
  const [deliveryDays, setDeliveryDays] = useState("3");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [credits, setCredits] = useState(850);
  const [showCreditError, setShowCreditError] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(TASK_DATA.deadline).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("EXPIRED");
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d : ${hours}h : ${minutes}m : ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleConfirmBid = () => {
    if (credits < 100) {
      setShowCreditError(true);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#5411AB", "#6C3BAA", "#A379D9"]
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 md:py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/tasks" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors mb-10"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Browse Tasks
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (Main): 70% */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/40">
              {/* Header Section */}
              <div className="space-y-6 mb-10">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-brand-primary/5 text-brand-primary rounded text-[10px] uppercase tracking-wider border border-brand-primary/10">
                    {TASK_DATA.university}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-[10px] uppercase tracking-wider border border-blue-100">
                    {TASK_DATA.major}
                  </span>
                  <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded text-[10px] uppercase tracking-wider border border-slate-100">
                    {TASK_DATA.subjectCode}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl text-slate-800 leading-tight">
                  {TASK_DATA.title}
                </h1>
              </div>

              {/* Description Section */}
              <div className="space-y-4 mb-12">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Assignment Instructions</h3>
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
                  {TASK_DATA.description}
                </div>
              </div>

              {/* Attached Files Preview */}
              <div className="space-y-4 mb-12">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs text-slate-400 uppercase tracking-[0.2em]">Attached Requirements</h3>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[10px]">
                    <ShieldCheck className="w-3 h-3" />
                    VIEW ONLY PROTECTED
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TASK_DATA.attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded border border-slate-100 hover:border-brand-primary/20 transition-colors group cursor-not-allowed">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded shadow-sm">
                          <FileIcon className="w-6 h-6 text-brand-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-800">{file.name}</span>
                          <span className="text-[10px] text-slate-400 uppercase">{file.size}</span>
                        </div>
                      </div>
                      <Lock className="w-4 h-4 text-slate-300 group-hover:text-brand-primary transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Profile Brief */}
              <div className="pt-10 border-t border-slate-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-slate-50 rounded border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded flex items-center justify-center border border-slate-300">
                      <User className="w-8 h-8 text-slate-300" />
                    </div>
                    <div>
                      <h4 className="text-slate-800">Student #{TASK_DATA.student.id}</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-slate-700">{TASK_DATA.student.rating}</span>
                        <span className="text-slate-400 text-xs ml-1">Rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 px-6 py-2 border-l border-slate-300">
                    <div className="text-center">
                      <div className="text-xl text-brand-primary">{TASK_DATA.student.completedAssignments}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest">Completed</div>
                    </div>
                    <div className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded text-[10px] uppercase tracking-wider">
                      Trusted Student
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section: Existing Bids (Social Proof) */}
            <div className="bg-white rounded p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/40">
              <h3 className="text-xs text-slate-400 uppercase tracking-[0.2em] mb-8">Existing Bids ({TASK_DATA.existingBids.length})</h3>
              <div className="space-y-4">
                {TASK_DATA.existingBids.map((bid, index) => (
                  <div key={index} className="flex items-center justify-between p-6 hover:bg-slate-50 rounded transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center border-2 border-slate-300">
                        <span className="text-slate-400 text-xs">E</span>
                      </div>
                      <div>
                        <h4 className="text-slate-800">Expert #{bid.id}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-slate-800">{bid.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg text-slate-700">LKR {bid.amount}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest">Proposed Bid</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar): 30% */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[100px] h-fit">
            <div className="bg-white rounded p-8 border border-slate-300 shadow-xl shadow-slate-200">
              
              <div className="space-y-8">
                {/* Countdown Timer */}
                <div className="p-6 bg-red-50 rounded border border-red-200 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-red-600 text-xs uppercase tracking-widest">
                    <Timer className="w-4 h-4" />
                    Bidding Ends In
                  </div>
                  <div className="text-2xl text-red-700 tracking-wide whitespace-pre-wrap">
                    {timeLeft}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Bid Input */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Bid Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">LKR</span>
                      <input 
                        type="number"
                        className="w-full pl-14 pr-4 py-4 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-primary/10 focus:border-brand-primary transition-all text-xl"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Delivery Days */}
                  <div className="space-y-3">
                    <label className="text-xs text-slate-400 uppercase tracking-widest">How many days?</label>
                    <select 
                      className="w-full px-4 py-4 rounded border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary/10 transition-all text-slate-800 appearance-none"
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(e.target.value)}
                    >
                      {[1,2,3,4,5,7,10,14].map(day => (
                        <option key={day} value={day}>{day} Day{day > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  {/* Token Alert */}
                  <div className="p-4 bg-blue-50/50 rounded border border-blue-100/50 space-y-2">
                    <div className="flex items-center gap-2 text-blue-600 text-[10px] uppercase tracking-widest">
                      <DollarSign className="w-3 h-3" />
                      Token Cost Alert
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal uppercase">
                      Placing this bid costs <span className="text-blue-600">100 Credits</span>. 
                      Balance: <span className="text-slate-800">{credits} Credits</span>
                    </p>
                  </div>

                  {/* Action Button */}
                  <AnimatePresence mode="wait">
                    {!isSuccess ? (
                      <motion.button 
                        key="submit"
                        onClick={handleConfirmBid}
                        disabled={isSubmitting}
                        className="w-full bg-brand-primary text-white py-5 rounded shadow-xl shadow-brand-primary/20 hover:bg-brand-dark transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <>
                            Confirm Bid
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    ) : (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-5 bg-emerald-500 text-white rounded text-center flex flex-col items-center gap-2"
                      >
                        <CheckCircle2 className="w-8 h-8" />
                        Bid Placed Successfully!
                        <p className="text-[10px] opacity-80 uppercase tracking-widest">
                          The student will be notified
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Support Box */}
            <div className="p-6 bg-slate-900 rounded text-white space-y-4">
              <h4 className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Assigne Protection
              </h4>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Your credits are only deducted if the bid is active. Our encrypted delivery system keeps your intellectual work secure.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
