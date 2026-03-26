"use client";

import React, { useState } from "react";
import { 
  Filter, 
  Search, 
  GraduationCap, 
  Layers, 
  DollarSign, 
  Clock,
  CheckCircle2,
  X
} from "lucide-react";

const universities = [
  "UOM", "UOJ", "UOC", "USJP", "SLIIT", "NSBM", "IIT"
];

const categories = [
  "Computer Science", "Engineering", "Management", "Science", "Law", "Arts", "Medicine"
];

const TaskFilters = () => {
  const [selectedUni, setSelectedUni] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [budgetRange, setBudgetRange] = useState(50000);
  const [isUrgent, setIsUrgent] = useState(false);

  return (
    <div className="lg:sticky lg:top-[100px] bg-white rounded p-8 border border-slate-300 shadow-xl shadow-slate-200 space-y-10 h-fit font-sans overflow-hidden">
      <div className="flex items-center justify-between pb-6 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-brand-primary" />
          <h2 className="text-xl text-slate-800">Filters</h2>
        </div>
        <button 
          onClick={() => {
            setSelectedUni(null);
            setSelectedCategory(null);
            setBudgetRange(50000);
            setIsUrgent(false);
          }}
          className="text-xs text-slate-600 hover:text-brand-primary transition-colors uppercase tracking-widest"
        >
          Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-600 uppercase text-[10px] font-bold tracking-widest">
          <Layers className="w-4 h-4" />
          <span>Category / Major</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
              className={`px-4 py-2 rounded text-xs transition-all border ${
                selectedCategory === cat 
                ? "bg-brand-primary border-brand-primary text-white shadow-md shadow-brand-primary/20" 
                : "bg-white border-slate-100 text-slate-500 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* University Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-600 uppercase text-[10px] font-bold tracking-widest">
          <GraduationCap className="w-4 h-4" />
          <span>University</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {universities.map((uni) => (
            <button
              key={uni}
              onClick={() => setSelectedUni(uni === selectedUni ? null : uni)}
              className={`px-4 py-2 rounded text-xs transition-all border ${
                selectedUni === uni 
                ? "bg-[#6C3BAA] border-[#6C3BAA] text-white" 
                : "bg-white border-slate-100 text-slate-500 hover:border-slate-300"
              }`}
            >
              {uni}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-slate-600 font-bold uppercase text-[10px] tracking-widest">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>Budget Range</span>
          </div>
          <span className="text-brand-primary text-xs">LKR {budgetRange.toLocaleString()}</span>
        </div>
        <input 
          type="range" 
          min="1000" 
          max="100000" 
          step="1000"
          value={budgetRange}
          onChange={(e) => setBudgetRange(Number(e.target.value))}
          className="w-full accent-brand-primary h-1.5 bg-slate-300 rounded appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px]  text-slate-500">
          <span>LKR 1,000</span>
          <span>LKR 100,000</span>
        </div>
      </div>

      {/* Urgency Toggle */}
      <div className="pt-6 border-t border-slate-50">
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2 text-slate-600 font-bold uppercase text-[10px] tracking-widest">
            <Clock className="w-4 h-4" />
            <span>Urgent (24h)</span>
          </div>
          <div 
            onClick={() => setIsUrgent(!isUrgent)}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              isUrgent ? "bg-brand-primary" : "bg-slate-200"
            }`}
          >
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              isUrgent ? "translate-x-5" : "translate-x-0"
            }`}></div>
          </div>
        </label>
      </div>

      {/* Trust Message */}
      <div className="p-4 bg-emerald-50/50 rounded border border-emerald-200 flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-[10px] text-emerald-700 leading-normal uppercase tracking-wider">
          Verified Sri Lankan University experts only.
        </p>
      </div>
    </div>
  );
};

export default TaskFilters;
