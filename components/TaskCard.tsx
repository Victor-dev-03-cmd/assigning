"use client";

import React from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  Clock, 
  DollarSign, 
  MessageSquare, 
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface TaskCardProps {
  id: string;
  title: string;
  university: string;
  deadline: string;
  budget: string;
  description: string;
  bidsCount: number;
  status: "Open for Bids" | "Active";
  category: string;
}

const TaskCard = ({
  id,
  title,
  university,
  deadline,
  budget,
  description,
  bidsCount,
  status,
  category
}: TaskCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group flex flex-col h-full font-sans"
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${
          status === "Open for Bids" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
        }`}>
          {status}
        </span>
        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">
          {category}
        </span>
      </div>

      <h3 className="text-xl text-[#6C3BAA] group-hover:text-brand-primary transition-colors mb-3 leading-tight">
        {title}
      </h3>

      <div className="grid grid-cols-1 gap-2 mb-4">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <GraduationCap className="w-4 h-4 text-brand-primary/60" />
          <span>{university}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
          <Clock className="w-4 h-4 text-brand-primary/60" />
          <span>{deadline}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-800 text-sm">
          <DollarSign className="w-4 h-4 text-emerald-500" />
          <span>LKR {budget}</span>
        </div>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-6">
        {description}
      </p>

      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs uppercase tracking-wider">
          <MessageSquare className="w-4 h-4" />
          <span>{bidsCount} Bids</span>
        </div>
        
        <Link 
          href={`/tasks/${id}`}
          className="flex items-center gap-1.5 text-brand-primary text-sm hover:translate-x-1 transition-transform"
        >
          View Details
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default TaskCard;
