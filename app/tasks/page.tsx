"use client";

import React, { useState, useEffect } from "react";
import TaskCard from "@/components/TaskCard";
import TaskFilters from "@/components/TaskFilters";
import { Search, ChevronDown, PackageOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data - Expanded to 20 items to support pagination
const MOCK_TASKS = [
  {
    id: "AU4201",
    title: "Python Data Science Project",
    university: "University of Moratuwa (UOM)",
    deadline: "2 days left",
    budget: "12,500",
    description: "Build a predictive model using Scikit-learn for housing prices dataset. Documentation and source code required.",
    bidsCount: 5,
    status: "Open for Bids" as const,
    category: "Computer Science"
  },
  {
    id: "AU4202",
    title: "Civil Engineering Structural Analysis",
    university: "University of Peradeniya (UOP)",
    deadline: "12 hours left",
    budget: "18,000",
    description: "Detailed analysis of a bridge structure using SAP2000. Report should include stress-strain diagrams.",
    bidsCount: 12,
    status: "Open for Bids" as const,
    category: "Engineering"
  },
  {
    id: "AU4203",
    title: "Marketing Research Paper",
    university: "University of Colombo (UOC)",
    deadline: "3 days left",
    budget: "8,500",
    description: "Research paper on consumer behavior trends in Sri Lankan retail market for 2024.",
    bidsCount: 3,
    status: "Open for Bids" as const,
    category: "Management"
  },
  {
    id: "AU4204",
    title: "React.js Web Application",
    university: "SLIIT",
    deadline: "5 days left",
    budget: "25,000",
    description: "Develop a basic e-commerce dashboard with real-time analytics using Firebase and React context.",
    bidsCount: 8,
    status: "Active" as const,
    category: "Computer Science"
  },
  {
    id: "AU4205",
    title: "Organic Chemistry Lab Report",
    university: "University of Sri Jayewardenepura (USJP)",
    deadline: "1 day left",
    budget: "6,000",
    description: "Writeup for synthesis of aspirin experiment with full reaction mechanism and results analysis.",
    bidsCount: 2,
    status: "Open for Bids" as const,
    category: "Science"
  },
  {
    id: "AU4206",
    title: "Database Management System",
    university: "NSBM",
    deadline: "4 days left",
    budget: "15,000",
    description: "Design and implement a SQL database for a library management system with normalized tables.",
    bidsCount: 6,
    status: "Open for Bids" as const,
    category: "Computer Science"
  },
  {
    id: "AU4207",
    title: "Mechanical Heat Transfer",
    university: "UOM",
    deadline: "2 days left",
    budget: "20,000",
    description: "Solving steady-state heat conduction problems using numerical methods and MATLAB.",
    bidsCount: 4,
    status: "Open for Bids" as const,
    category: "Engineering"
  },
  {
    id: "AU4208",
    title: "Financial Accounting Report",
    university: "UOC",
    deadline: "6 days left",
    budget: "10,000",
    description: "Analysis of annual financial statements of a public limited company in Sri Lanka.",
    bidsCount: 5,
    status: "Open for Bids" as const,
    category: "Management"
  },
  {
    id: "AU4209",
    title: "AI Chatbot Development",
    university: "IIT",
    deadline: "1 week left",
    budget: "35,000",
    description: "Creating an NLP-based chatbot for customer support using Python and Rasa framework.",
    bidsCount: 9,
    status: "Open for Bids" as const,
    category: "Computer Science"
  },
  {
    id: "AU4210",
    title: "Fluid Mechanics Lab",
    university: "UOP",
    deadline: "3 days left",
    budget: "7,500",
    description: "Laboratory report on Bernoulli's principle experiment and flow rate measurements.",
    bidsCount: 2,
    status: "Open for Bids" as const,
    category: "Engineering"
  },
  {
    id: "AU4211",
    title: "Macroeconomics Essay",
    university: "USJP",
    deadline: "5 days left",
    budget: "5,000",
    description: "Essay on the impact of inflation on the Sri Lankan economy in the past decade.",
    bidsCount: 1,
    status: "Open for Bids" as const,
    category: "Management"
  },
  {
    id: "AU4212",
    title: "Java Spring Boot API",
    university: "SLIIT",
    deadline: "10 days left",
    budget: "30,000",
    description: "Building a RESTful API for a healthcare management system with JWT authentication.",
    bidsCount: 7,
    status: "Open for Bids" as const,
    category: "Computer Science"
  }
];

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-4 animate-pulse">
    <div className="flex justify-between">
      <div className="h-4 w-20 bg-slate-100 rounded"></div>
      <div className="h-4 w-20 bg-slate-100 rounded"></div>
    </div>
    <div className="h-6 w-3/4 bg-slate-100 rounded"></div>
    <div className="space-y-2 pt-2">
      <div className="h-3 w-full bg-slate-50 rounded"></div>
      <div className="h-3 w-5/6 bg-slate-50 rounded"></div>
    </div>
    <div className="pt-4 border-t border-slate-50 flex justify-between">
      <div className="h-4 w-16 bg-slate-100 rounded"></div>
      <div className="h-4 w-24 bg-slate-100 rounded"></div>
    </div>
  </div>
);

export default function BrowseTasksPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks] = useState(MOCK_TASKS);
  const [sortBy, setSortBy] = useState("Newest");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 md:py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Area - Now Sticky */}
        <div className="sticky top-[80px] z-30 bg-slate-50/95 backdrop-blur-sm py-8 mb-12 -mx-6 px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl text-slate-800 tracking-tight">Browse Open Tasks.</h1>
              <p className="text-lg text-slate-500 leading-relaxed">
                Find assignments from across Sri Lankan universities and start earning.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative group w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                <input 
                  type="text"
                  placeholder="Search topics, universities..."
                  className="w-full pl-12 pr-4 py-3 rounded border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary/10 focus:border-brand-primary transition-all text-slate-800"
                  value={searchQuery}
                  onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1); // Reset to page 1 on search
                  }}
                />
              </div>
              <div className="relative group hidden sm:block">
                <select 
                  className="appearance-none bg-white border border-slate-300 pl-4 pr-10 py-3 rounded text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-primary/10 transition-all cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Newest</option>
                  <option>Highest Budget</option>
                  <option>Ending Soonest</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3">
            <TaskFilters />
          </aside>

          {/* Task Grid */}
          <main className="lg:col-span-9 flex flex-col">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <SkeletonCard key={i} />)}
                </motion.div>
              ) : filteredTasks.length > 0 ? (
                <div className="space-y-12">
                  <motion.div 
                    key={`grid-${currentPage}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {currentTasks.map(task => (
                      <TaskCard key={task.id} {...task} />
                    ))}
                  </motion.div>

                  {/* Pagination - "1 2 3 page split" */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-8 border-t border-slate-200">
                      <button 
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-10 h-10 rounded-lg border font-bold text-sm transition-all ${
                            currentPage === number 
                            ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                            : "border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary"
                          }`}
                        >
                          {number}
                        </button>
                      ))}

                      <button 
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded border border-slate-100 p-20 flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                    <PackageOpen className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl text-slate-800">No tasks found.</h3>
                    <p className="text-slate-500 max-w-xs mx-auto">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </div>
                  <button 
                    onClick={() => {setSearchQuery(""); setCurrentPage(1);}}
                    className="text-brand-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
