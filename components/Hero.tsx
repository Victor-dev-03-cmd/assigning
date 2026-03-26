"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Shield, FileText, Plus } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden bg-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#5411AB 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Typography & Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left space-y-8"
          >
            <h1 className="text-5xl md:text-6xl leading-tight text-slate-900 tracking-tight">
              Get Your University <br />
              Assignments Done by <br />
              Top <span className="text-brand-primary">Experts.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The most secure freelance marketplace for Sri Lankan university students. 
              Post your task, set your budget, and get high-quality results—guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link 
                href="/post" 
                className="group flex items-center gap-2 bg-brand-primary text-white px-6 py-4 rounded text-lg shadow-lg shadow-brand-primary/20 hover:bg-brand-dark transition-all active:scale-95"
              >
                Post an Assignment
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              </Link>
              
              <Link 
                href="/tasks" 
                className="flex items-center gap-2 bg-white text-brand-primary border-2 border-brand-primary px-6 py-4 rounded text-lg hover:bg-brand-primary/5 transition-all active:scale-95"
              >
                Browse Open Tasks
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 opacity-80">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Verified Experts</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Shield className="w-5 h-5 text-brand-primary" />
                <span>100% Secure Payments</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Interactive Card Concept (Option A) */}
            <div className="relative w-full max-w-[500px] h-[400px]">
              {/* Blurred Document Placeholder */}
              <div className="absolute inset-0 bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden shadow-2xl rotate-3">
                <div className="p-8 space-y-4 opacity-30 blur-[2px]">
                  <div className="h-4 w-3/4 bg-slate-300 rounded"></div>
                  <div className="h-4 w-full bg-slate-300 rounded"></div>
                  <div className="h-4 w-5/6 bg-slate-300 rounded"></div>
                  <div className="h-32 w-full bg-slate-200 rounded-lg"></div>
                  <div className="h-4 w-2/3 bg-slate-300 rounded"></div>
                </div>
                {/* View Only Watermark */}
                <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                  <span className="text-4xl font-bold text-slate-300 -rotate-45 opacity-40">VIEW ONLY</span>
                </div>
              </div>

              {/* Floating Info Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-[-20px] bg-white p-6 rounded-2xl shadow-xl border border-slate-100 w-[280px] z-20 -rotate-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-brand-primary/10 rounded-lg">
                    <FileText className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 text-sm">Python Data Science Project</h4>
                    <p className="text-xs text-slate-500">Assignment #AU4201</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                  <span className="text-brand-primary font-medium">LKR 12,500</span>
                  <div className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[10px] flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    VERIFIED
                  </div>
                </div>
              </motion.div>

              {/* Expert Profile Card */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 right-[-10px] bg-white p-4 rounded-xl shadow-xl border border-slate-100 w-[220px] z-30 rotate-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-brand-primary">
                    <span className="text-brand-primary text-xs">UOM</span>
                  </div>
                  <div>
                    <h4 className="text-slate-900 text-sm">Expert #E201</h4>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-yellow-400"></div>)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Social Proof / Trust Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 pt-10 border-t border-slate-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Trusted by students from:</span>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Placeholders for logos (UOM, UOJ, UOC, etc.) */}
               <div className="text-xl font-black text-slate-600 tracking-tighter">UOM</div>
               <div className="text-xl font-black text-slate-600 tracking-tighter">UOJ</div>
               <div className="text-xl font-black text-slate-600 tracking-tighter">UOC</div>
               <div className="text-xl font-black text-slate-600 tracking-tighter">USJP</div>
               <div className="text-xl font-black text-slate-600 tracking-tighter">SLIIT</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
