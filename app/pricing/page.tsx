"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Coins, 
  Zap, 
  ShieldCheck, 
  Star, 
  CreditCard, 
  ArrowRight,
  ChevronDown,
  Gift,
  BadgeCheck,
  Headphones
} from "lucide-react";

const creditPacks = [
  {
    name: "Starter Pack",
    price: "1,000",
    credits: "10",
    description: "Recommended for Beginners",
    features: ["10 Credits (10 Bids)", "Standard Support", "Instant Notifications"],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro Pack",
    price: "2,500",
    credits: "30",
    description: "Best Value for Experts",
    features: ["30 Credits (30 Bids)", "Priority Bidding", "'Verified Expert' Badge (30d)", "Advanced Analytics"],
    cta: "Buy Pro",
    popular: true
  },
  {
    name: "Bulk Pack",
    price: "5,000",
    credits: "70",
    description: "Maximum Earning Potential",
    features: ["70 Credits (70 Bids)", "Featured Profile on 'Explore'", "24/7 Premium Support", "Early Access to Tasks"],
    cta: "Go Unlimited",
    popular: false
  }
];

const faqs = [
  {
    q: "What happens if my bid is not accepted?",
    a: "Your credits are only deducted when you place a bid. They are non-refundable but never expire. Think of them as a small investment to connect with students."
  },
  {
    q: "Is there any hidden cost for students?",
    a: "No. The price you see on the freelancer's bid is what you pay (until your 5th task). We believe in transparent pricing for the academic community."
  },
  {
    q: "How do I top up my credits?",
    a: "You can purchase credit packs using any major Sri Lankan payment method including Visa, Mastercard, FriMi, or direct Bank Transfer."
  }
];

const FAQItem = ({ faq }: { faq: typeof faqs[0] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg text-slate-800 group-hover:text-brand-primary transition-colors">{faq.q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section */}
      <section className="pt-24 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 text-brand-primary rounded text-xs uppercase tracking-widest border border-brand-primary/20"
          >
            <Coins className="w-4 h-4" />
            Simple Pricing
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl text-slate-800 leading-[1.1]"
          >
            Flexible Credits for Experts. <br />
            <span className="text-brand-primary">Fair Deals for Students.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            No monthly subscriptions. Only pay for the bids you use. 
            Students get their first 4 assignments with 0% platform fees.
          </motion.p>
        </div>
      </section>

      {/* Credit Packs */}
      <section className="py-16 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {creditPacks.map((pack, idx) => (
            <motion.div 
              key={pack.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-white p-10 rounded border ${
                pack.popular ? "border-brand-primary shadow-2xl shadow-brand-primary/10 ring-1 ring-brand-primary/5" : "border-slate-300 shadow-xl shadow-slate-200/40"
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand-primary text-white text-[10px] uppercase tracking-widest rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl text-slate-800">{pack.name}</h3>
                  <p className="text-sm text-slate-400 mt-1 uppercase tracking-wider">{pack.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-slate-400">LKR</span>
                  <span className="text-4xl text-slate-800">{pack.price}</span>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded shadow-sm flex items-center justify-center">
                    <Zap className="w-5 h-5 text-brand-primary fill-brand-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg text-brand-primary">{pack.credits} Credits</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">Available Bids</span>
                  </div>
                </div>

                <ul className="space-y-4 pt-4">
                  {pack.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3 text-slate-600 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded text-lg transition-all active:scale-95 ${
                  pack.popular 
                  ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20 hover:bg-brand-dark" 
                  : "bg-slate-900 text-white hover:bg-slate-800"
                }`}>
                  {pack.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Student Loyalty Banner */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#2F0A61] rounded-br-[10px] rounded-bl-[100px] rounded-tr-[90px] rounded-tl-[10px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}>
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-brand-accent rounded-full text-xs font-black uppercase tracking-widest border border-white/10">
                  <Gift className="w-4 h-4" />
                  Student Rewards
                </div>
                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                  Your first 4 assignments are <span className="text-emerald-400 underline decoration-4 underline-offset-8">FREE</span> of platform fees.
                </h2>
                <p className="text-white/70 font-medium text-lg leading-relaxed">
                  Starting from your 5th assignment, a small 5% service fee applies to maintain our high-security infrastructure. Pay only what the freelancer quotes—no surprises.
                </p>
              </div>

              <div className="bg-white/5 p-10 rounded border border-white/10 space-y-10">
                <div className="flex items-center justify-between">
                  <h4 className="font-black uppercase tracking-[0.2em] text-xs opacity-60">Loyalty Tracker</h4>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase">Active Benefit</span>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className="flex-1 flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-xl font-black">
                        {num}
                      </div>
                      <div className="text-[10px] font-black opacity-40 uppercase">Task</div>
                    </div>
                  ))}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-900 shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="text-[10px] font-black text-emerald-400 uppercase">FREE</div>
                  </div>
                  <div className="w-8 h-[2px] bg-white/10"></div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center text-xl font-black opacity-20">
                      5
                    </div>
                    <div className="text-[10px] font-black opacity-20 uppercase">5% Fee</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm font-bold text-white/60 pt-4 border-t border-white/5">
                  <BadgeCheck className="w-5 h-5 text-emerald-400" />
                  Benefit automatically applied to your account.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center space-y-10">
          <div className="space-y-2">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Supported Payment Methods</h4>
            <p className="text-sm font-bold text-slate-500">Securely processed via Sri Lankan Payment Gateways.</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale select-none">
            {/* Payment Placeholders */}
            <span className="text-2xl font-black text-slate-900 tracking-tighter">VISA</span>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">MASTERCARD</span>
            <span className="text-2xl font-black text-slate-900 tracking-tighter italic">FriMi</span>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">genie</span>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">LankaPay</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-black text-slate-900">Pricing FAQs</h2>
            <p className="text-slate-500 font-medium">Everything you need to know about credits and fees.</p>
          </div>
          
          <div className="bg-white border border-slate-300 rounded p-10 shadow-xl shadow-slate-200/40">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} />
            ))}
          </div>

          <div className="mt-16 p-8 bg-slate-50 rounded border border-slate-300 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded flex items-center justify-center shadow-sm">
                <Headphones className="w-6 h-6 text-brand-primary" />
              </div>
              <div className="text-left">
                <h4 className=" text-slate-800">Still have questions?</h4>
                <p className="text-sm text-slate-400">Our support team is here to help 24/7.</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-white border border-slate-300 rounded text-sm hover:border-brand-primary transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
