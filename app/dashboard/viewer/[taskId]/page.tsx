"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  X, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  ChevronLeft, 
  RotateCcw,
  FileText,
  Lock,
  EyeOff,
  AlertTriangle,
  Zap,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import confetti from "canvas-confetti";

// --- Types ---

interface ViewerProps {
  taskId: string;
}

// --- Components ---

const WatermarkOverlay = ({ userId }: { userId: string }) => {
  const timestamp = useMemo(() => new Date().toLocaleString(), []);
  
  // Create a grid of moving watermarks
  const rows = [0, 1, 2, 3, 4];
  const cols = [0, 1, 2];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50 opacity-[0.08] select-none">
      {rows.map((row) => (
        <div key={row} className="flex justify-around py-20">
          {cols.map((col) => (
            <motion.div
              key={`${row}-${col}`}
              animate={{
                x: [0, 50, 0, -50, 0],
                y: [0, -30, 0, 30, 0],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="text-white text-xl font-black rotate-[-30deg] whitespace-nowrap flex flex-col items-center"
            >
              <span>PREVIEW ONLY • {userId}</span>
              <span className="text-sm font-bold opacity-60 uppercase tracking-tighter">{timestamp}</span>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

const CountdownTimer = ({ onExpire }: { onExpire?: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onExpire]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
      <Clock className="w-4 h-4 text-red-500 animate-pulse" />
      <span className="text-sm font-black text-red-500 font-mono tracking-widest">
        {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
      </span>
    </div>
  );
};

export default function SecureViewerPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.taskId as string;
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRevision, setIsRevision] = useState(false);
  const [isBlurred, setIsBlurEnabled] = useState(true);
  
  // Flashlight Effect logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // 2. Disable Print / Save shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'u')) ||
        (e.metaKey && (e.key === 'p' || e.key === 's' || e.key === 'u')) ||
        (e.shiftKey && e.key === 'S' && (e.ctrlKey || e.metaKey)) // Snipping tool
      ) {
        e.preventDefault();
        alert("Security Alert: Direct saving and printing is disabled in the Secure Viewer.");
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleReleasePayment = () => {
    setIsSuccess(true);
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.7 },
      colors: ["#5411AB", "#6C3BAA", "#A379D9"]
    });
    
    // In a real app, this would trigger the backend release logic
    setTimeout(() => {
      router.push("/dashboard/tasks");
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-[#0F111A] z-[100] flex flex-col font-sans select-none overflow-hidden">
      {/* Top Bar */}
      <header className="h-20 bg-[#161925] border-b border-white/5 flex items-center justify-between px-8 relative z-[110]">
        <div className="flex items-center gap-6">
          <Link href="/dashboard/tasks" className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-accent" />
              <h1 className="text-white font-bold tracking-tight">Reviewing: Final_Project_Deliverable.pdf</h1>
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Secure Escrow ID: {taskId}</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Confirmation Window</span>
            <CountdownTimer onExpire={() => router.push("/dashboard/tasks")} />
          </div>
          
          <div className="w-[1px] h-10 bg-white/10 mx-2 hidden md:block"></div>

          <button onClick={() => router.back()} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Viewer Area */}
      <main 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="flex-1 relative overflow-auto flex justify-center p-12 custom-scrollbar cursor-none"
      >
        <div className="max-w-4xl w-full bg-[#1A1D2B] shadow-2xl rounded-sm relative min-h-[1200px] overflow-hidden">
          {/* Moving Watermarks */}
          <WatermarkOverlay userId="#U1245" />

          {/* Secure CSS Shield wrapper */}
          <div className="secure-viewer relative w-full h-full p-16 space-y-12 text-slate-300">
            {/* Mock PDF Content - Low resolution / Blurred Feel */}
            <div className="space-y-8 blur-[1.5px] opacity-40">
              <div className="h-12 w-3/4 bg-white/5 rounded-md mb-12"></div>
              <div className="space-y-4">
                {[...Array(25)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-white/5 rounded-sm"></div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-8 py-12">
                <div className="aspect-square bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                   <ShieldAlert className="w-12 h-12 text-white/10" />
                </div>
                <div className="aspect-square bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                   <Zap className="w-12 h-12 text-white/10" />
                </div>
              </div>
              <div className="space-y-4">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-white/5 rounded-sm"></div>
                ))}
              </div>
            </div>

            {/* Flashlight Overlay */}
            <motion.div 
              className="absolute inset-0 pointer-events-none z-[60]"
              style={{
                background: useMemo(() => {
                  return `radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.03) 0%, transparent 100%)`;
                }, [smoothX, smoothY])
              }}
            />

            {/* Content Mask (Sharp Content follows cursor) */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-[55] overflow-hidden"
              style={{
                clipPath: useMemo(() => {
                  // This creates a circular "sharp" area that follows the cursor
                  return `circle(150px at ${smoothX}px ${smoothY}px)`;
                }, [smoothX, smoothY])
              }}
            >
              <div className="w-full h-full p-16 space-y-12 text-white opacity-100 bg-[#1A1D2B]">
                <div className="h-12 w-3/4 bg-white/10 rounded-md mb-12"></div>
                <div className="space-y-4">
                  {[...Array(25)].map((_, i) => (
                    <div key={i} className="h-4 w-full bg-white/10 rounded-sm"></div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-8 py-12">
                  <div className="aspect-square bg-white/10 rounded-xl"></div>
                  <div className="aspect-square bg-white/10 rounded-xl"></div>
                </div>
                <div className="space-y-4">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="h-4 w-full bg-white/10 rounded-sm"></div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Cursor UI */}
        <motion.div
          className="fixed w-8 h-8 rounded-full border border-white/20 z-[200] pointer-events-none flex items-center justify-center bg-white/5 backdrop-blur-sm"
          style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
        >
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </motion.div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="h-24 bg-[#161925] border-t border-white/5 flex items-center justify-between px-12 relative z-[110]">
        <div className="flex items-center gap-4 text-amber-500 bg-amber-500/5 px-4 py-2 rounded-xl border border-amber-500/10">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Screenshot protection active</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsRevision(true)}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all flex items-center gap-2 border border-white/5"
          >
            <RotateCcw className="w-4 h-4" />
            Request Revision
          </button>
          
          <button 
            onClick={handleReleasePayment}
            className="px-10 py-3 bg-brand-primary text-white rounded-xl font-bold transition-all hover:bg-brand-dark shadow-xl shadow-brand-primary/20 flex items-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            Release Payment
          </button>
        </div>
      </footer>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[300] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-[#1A1D2B] p-10 rounded-[2.5rem] border border-white/10 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white font-poppins">Payment Released!</h2>
                <p className="text-slate-400 text-sm">
                  The original file is now available for download in your dashboard.
                </p>
              </div>
              <div className="pt-4">
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] font-black">Redirecting to Dashboard...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .secure-viewer {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
