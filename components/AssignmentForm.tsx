"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Upload, 
  DollarSign, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  Lock, 
  Search,
  CheckCircle2,
  X,
  FileIcon
} from "lucide-react";

const steps = [
  { id: "details", title: "Details", icon: FileText },
  { id: "files", title: "Files", icon: Upload },
  { id: "budget", title: "Budget", icon: DollarSign },
];

const universities = [
  "University of Moratuwa (UOM)",
  "University of Jaffna (UOJ)",
  "University of Colombo (UOC)",
  "University of Sri Jayewardenepura (USJP)",
  "University of Peradeniya (UOP)",
  "University of Kelaniya (UOK)",
  "SLIIT",
  "ESOFT",
  "IIT",
  "NSBM",
  "CINEC",
  "KDU",
];

const AssignmentForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    university: "",
    deadline: "",
    description: "",
    budget: "",
    files: [] as File[],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isUniDropdownOpen, setIsUniDropdownOpen] = useState(false);

  const filteredUnis = universities.filter(uni => 
    uni.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
      {/* Step Indicator */}
      <div className="flex border-b border-slate-50 bg-slate-50/50 p-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex items-center justify-center relative">
            <div className={`flex flex-col items-center gap-2 z-10 transition-colors ${
              index <= currentStep ? "text-brand-primary" : "text-slate-400"
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                index < currentStep ? "bg-brand-primary border-brand-primary text-white" : 
                index === currentStep ? "border-brand-primary bg-white text-brand-primary" : 
                "border-slate-300 bg-white text-slate-400"
              }`}>
                {index < currentStep ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`absolute left-1/2 top-5 w-full h-[2px] -z-0 transition-colors ${
                index < currentStep ? "bg-brand-primary" : "bg-slate-200"
              }`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="p-8 md:p-10">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm text-slate-800 flex items-center gap-2">
                  Assignment Title
                  <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Software Engineering Final Project"
                  className="w-full px-4 py-3 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-primary/20 focus:border-brand-primary transition-all placeholder:text-slate-400"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 relative">
                  <label className="text-sm text-slate-800">University / Category</label>
                  <div className="relative">
                    <button 
                      onClick={() => setIsUniDropdownOpen(!isUniDropdownOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded border border-slate-300 bg-white text-left  hover:border-slate-300 transition-colors"
                    >
                      <span className={formData.university ? "text-slate-900" : "text-slate-400"}>
                        {formData.university || "Select University"}
                      </span>
                      <Search className="w-4 h-4 text-slate-400" />
                    </button>
                    {isUniDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-2xl z-50 overflow-hidden">
                        <input 
                          type="text"
                          placeholder="Search university..."
                          className="w-full p-3 border-b border-slate-50 focus:outline-none text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="max-h-48 overflow-y-auto">
                          {filteredUnis.map((uni) => (
                            <button
                              key={uni}
                              className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors font-medium text-slate-700"
                              onClick={() => {
                                setFormData({...formData, university: uni});
                                setIsUniDropdownOpen(false);
                              }}
                            >
                              {uni}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-800">Deadline</label>
                  <div className="relative">
                    <input 
                      type="datetime-local"
                      className="w-full px-4 py-3 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    />
                    {/* Note: The 15-minute auto-release is mentioned in the prompt logic */}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-800">Detailed Description</label>
                <textarea 
                  rows={4}
                  placeholder="Describe your assignment requirements in detail..."
                  className="w-full px-4 py-3 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-primary/20 focus:border-brand-primary transition-all placeholder:text-slate-400 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="border-2 border-dashed border-slate-300 rounded p-10 text-center space-y-4 hover:border-brand-primary/40 transition-colors relative group">
                <input 
                  type="file" 
                  multiple 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={handleFileChange}
                />
                <div className="w-16 h-16 bg-brand-primary/5 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-brand-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-lg text-slate-900">Drag & Drop Files</p>
                  <p className="text-slate-500 text-sm">Upload PDF, Image, or Doc files (Max 20MB)</p>
                </div>
              </div>

              <div className="space-y-3">
                {formData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <FileIcon className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 truncate max-w-[200px]">{file.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-red-50 text-red-400 hover:text-red-500 rounded-lg transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <label className="text-sm text-slate-800">Proposed Budget (LKR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">LKR</span>
                  <input 
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-14 pr-4 py-4 rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-2xl"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  />
                </div>
                <div className="p-4 bg-blue-50/50 rounded border border-blue-100/50">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="text-blue-600 block mb-1 uppercase text-xs tracking-wider">Note:</span>
                    This budget is paid directly to the freelancer. 
                    Remember, your 5th assignment is <span className="text-blue-600 underline decoration-2 underline-offset-4">FREE</span> of platform fees!
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center gap-3 text-slate-500 mb-6 bg-slate-50 p-4 rounded border border-slate-100">
                  <Lock className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <p className="text-xs leading-normal">
                    Your files are encrypted and protected by our View-Only system. 
                    Freelancers can only see a protected version before task completion.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-10 mt-8 border-t border-slate-50">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 transition-all ${
              currentStep === 0 ? "opacity-0 invisible" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            onClick={currentStep === steps.length - 1 ? () => console.log("Post", formData) : nextStep}
            className="flex items-center gap-2 bg-brand-primary text-white px-5 py-2 rounded shadow-lg shadow-brand-primary/20 hover:bg-brand-dark transition-all active:scale-95"
          >
            {currentStep === steps.length - 1 ? "Post Task & Get Bids" : "Next Step"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentForm;
