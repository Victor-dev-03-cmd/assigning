"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Users, 
  Eye, 
  CheckCircle2, 
  Wallet, 
  Search, 
  Lock, 
  ShieldCheck, 
  Cpu, 
  Zap,
  Timer,
  ArrowRight,
  ClipboardCheck,
  MousePointer2
} from "lucide-react";
import Link from "next/link";

const studentSteps = [
  {
    title: "Post Your Assignment",
    description: "Fill in the details, set your budget, and upload your requirements securely. Our system ensures your initial brief is protected.",
    icon: FileText,
    color: "bg-[#6C3BAA]"
  },
  {
    title: "Receive Bids",
    description: "Verified university experts from UOM, UOJ, and other top unis will bid on your task. Check their ratings and past performance.",
    icon: Users,
    color: "bg-[#5411AB]"
  },
  {
    title: "Secure Preview",
    description: "The game changer. View the finished work in our High-Security Viewer. Quality check without the fear of being scammed—no downloads until you pay.",
    icon: Eye,
    color: "bg-[#A379D9]"
  },
  {
    title: "Pay & Release",
    description: "Once satisfied, pay the freelancer. Our system immediately releases the original, high-resolution file to your dashboard.",
    icon: CheckCircle2,
    color: "bg-emerald-500"
  }
];

const freelancerSteps = [
  {
    title: "Top-up Credits",
    description: "Buy a token pack (e.g., LKR 1000 for 10 bids) to start bidding on high-quality university tasks. Low entry cost for experts.",
    icon: Wallet,
    color: "bg-[#6C3BAA]"
  },
  {
    title: "Submit Bids",
    description: "Find tasks that match your expertise (Java, Engineering, etc.) and place your bid. Your profile is your resume.",
    icon: Search,
    color: "bg-[#5411AB]"
  },
  {
    title: "Complete the Work",
    description: "Upload finished work to our portal. Our Watermark System protects your work from being stolen or screenshotted before payment.",
    icon: Lock,
    color: "bg-[#A379D9]"
  },
  {
    title: "Get Paid Instantly",
    description: "Once the student confirms the preview, your payment is released. Confirm the receipt in 15 minutes to finalize the deal!",
    icon: Zap,
    color: "bg-amber-500"
  }
];

const StepItem = ({ step, index, isFlipped }: { step: any, index: number, isFlipped: boolean }) => {
  const isRight = isFlipped;
  
  return (
    <div className={`flex flex-col ${isRight ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-24 py-20 overflow-hidden`}>
      {/* Content Side */}
      <motion.div 
        initial={{ opacity: 0, x: isRight ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 space-y-8"
      >
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <div className={`w-16 h-16 rounded flex items-center justify-center text-white shadow-xl ${step.color} ring-4 ring-white`}>
              <step.icon className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 font-black text-6xl leading-none opacity-40">0{index + 1}</span>
            </div>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl text-slate-800 tracking-tight"
          >
            {step.title}
          </motion.h3>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-slate-600 leading-relaxed max-w-xl"
        >
          {step.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "100px" }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={`h-1.5 rounded-full ${step.color}`}
        />
      </motion.div>

      {/* Visual Side */}
      <motion.div 
        initial={{ opacity: 0, x: isRight ? -100 : 100, scale: 0.8 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 w-full flex justify-center relative"
      >
        <div className="relative group">
          {/* Decorative Background Elements */}
          <div className={`absolute -inset-4 ${step.color} opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity duration-700`}></div>
          
          <div className={`relative w-full max-w-md aspect-square rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-white flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]`}>
             <div className="absolute inset-0 opacity-[0.05]" 
                  style={{ backgroundImage: 'radial-gradient(#5411AB 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}>
             </div>
             
             {/* Dynamic Visual Content */}
             <div className="relative z-10 p-12 text-center space-y-8">
                <motion.div 
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`w-28 h-28 mx-auto rounded-[2.5rem] ${step.color} shadow-2xl flex items-center justify-center`}
                >
                   <step.icon className="w-12 h-12 text-white" />
                </motion.div>
                
                <div className="space-y-3">
                  <div className="h-3 w-48 bg-slate-100 mx-auto rounded-full"></div>
                  <div className="h-3 w-36 bg-slate-50 mx-auto rounded-full"></div>
                </div>
             </div>

             {/* Animated Accents */}
             <motion.div 
               animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
               transition={{ duration: 3, repeat: Infinity }}
               className={`absolute top-10 right-10 w-4 h-4 rounded-full ${step.color} opacity-20`}
             />
             <motion.div 
               animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
               transition={{ duration: 4, repeat: Infinity, delay: 1 }}
               className={`absolute bottom-12 left-12 w-6 h-6 rounded-full ${step.color} opacity-20`}
             />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function HowItWorksPage() {
  const [role, setRole] = useState<"student" | "freelancer">("student");

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative pt-24 pb-10 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl text-slate-800 leading-[1.1]"
          >
            A Secure Bridge Between <br />
            <span className="text-brand-primary">Students and Experts.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            From posting an assignment to getting it done—every step is protected by our 
            View-Only security and Escrow payment system.
          </motion.p>

          {/* 3-Step Visual Flow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 pt-12"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border-1 border-brand-primary/20">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] text-slate-600 uppercase tracking-widest">Post</span>
            </div>
            <div className="w-12 h-[2px] bg-slate-100 mt-[-20px]"></div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border-1 border-brand-primary/20">
                <MousePointer2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] text-slate-600 uppercase tracking-widest">Select</span>
            </div>
            <div className="w-12 h-[2px] bg-slate-100 mt-[-20px]"></div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border-1 border-brand-primary/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] text-slate-600 uppercase tracking-widest">Done</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Role Toggle */}
      <section className="sticky top-[80px] z-40 py-6 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-fit mx-auto flex p-1 bg-slate-100 ">
          <button 
            onClick={() => setRole("student")}
            className={`px-8 py-3 rounded text-sm transition-all rounded border border-brand-primary/20 ${
              role === "student" ? "bg-white text-brand-primary shadow-lg" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            I am a Student
          </button>
          <button 
            onClick={() => setRole("freelancer")}
            className={`px-8 py-3 rounded text-sm transition-all rounded border border-brand-primary/20 ${
              role === "freelancer" ? "bg-white text-brand-primary shadow-lg" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            I am a Freelancer
          </button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {(role === "student" ? studentSteps : freelancerSteps).map((step, idx) => (
                <StepItem key={step.title} step={step} index={idx} isFlipped={idx % 2 !== 0} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Safety First Section */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }}>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-4 mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/20 text-brand-accent rounded text-xs uppercase tracking-widest border border-brand-primary/30">
              <ShieldCheck className="w-4 h-4" />
              Safety First
            </div>
            <h2 className="text-4xl md:text-5xl">Our Security Technology</h2>
            <p className="text-slate-300 max-w-xl mx-auto">
              We've built Assigne.app with a proprietary security layer to ensure fairness and protection for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-white/5 rounded-xl border border-white/10 space-y-6"
            >
              <div className="w-14 h-14 bg-brand-primary rounded flex items-center justify-center">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl">Anti-Piracy Viewer</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our dynamic watermarking and screenshot protection prevent work from being stolen. You see it, you check it, but you can't own it until payment.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-white/5 rounded-xl border border-white/10 space-y-6"
            >
              <div className="w-14 h-14 bg-emerald-500 rounded flex items-center justify-center">
                <Timer className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl">15-Min Auto-Release</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Payments are processed instantly. If a freelancer doesn't confirm receipt within 15 minutes of completion, our system auto-finalizes to prevent delays.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-white/5 rounded-xl border border-white/10 space-y-6"
            >
              <div className="w-14 h-14 bg-blue-500 rounded flex items-center justify-center">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl">Verified Profiles</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                We manually verify student IDs and expert credentials from Sri Lankan universities to maintain a high-trust, elite academic community.
              </p>
            </motion.div>
          </div>

          <div className="mt-20 p-12 bg-brand-primary rounded text-center space-y-8 shadow-2xl shadow-brand-primary/20">
            <h3 className="text-3xl">Ready to get started?</h3>
            <p className="text-white/80 max-w-xl mx-auto">
              Join thousands of students and experts already using the most secure marketplace in Sri Lanka.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/post" className="bg-white text-brand-primary px-8 py-3 rounded hover:scale-105 transition-transform flex items-center gap-2">
                Post an Assignment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/tasks" className="bg-brand-dark text-white px-8 py-3 rounded hover:scale-105 transition-transform">
                Browse Open Tasks
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
