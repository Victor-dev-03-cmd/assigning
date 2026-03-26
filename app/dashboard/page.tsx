"use client";

import React from "react";
import { useDashboard } from "./layout";
import { 
  Plus, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  FileUp, 
  TrendingUp, 
  Briefcase, 
  CheckSquare, 
  AlertCircle,
  User,
  Star,
  Timer,
  Wallet,
  Inbox,
  ExternalLink,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- Mock Data ---

const studentActiveProjects = [
  {
    id: "AU4201",
    title: "Python Data Science Project",
    budget: "12,500",
    bidsReceived: 5,
    status: "expert_hired", 
  },
  {
    id: "AU4203",
    title: "Marketing Research Paper",
    budget: "8,500",
    bidsReceived: 3,
    status: "posted",
  }
];

const expertsForSelection = [
  { id: "E402", rating: 5.0, deliveryTime: "3 Days", bidAmount: "12,000", reviews: 24 },
  { id: "E215", rating: 4.8, deliveryTime: "2 Days", bidAmount: "13,500", reviews: 18 },
];

const freelancerDeadlines = [
  {
    id: "AU4201",
    title: "Advanced Database Management",
    urgency: "High",
    timeLeft: "00:12:45", 
    status: "hired",
  },
  {
    id: "AU4204",
    title: "React.js Web App",
    urgency: "Medium",
    timeLeft: "2 Days",
    status: "hired",
  }
];

const activityFeed = [
  { text: "New bid received for 'Python Project'", type: "bid", time: "2m ago" },
  { text: "Payment of LKR 5,000 released to your wallet", type: "payment", time: "1h ago" },
  { text: "Reminder: 2 hours left for 'Database Assignment'", type: "reminder", time: "2h ago" },
];

// --- Shadcn-style Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 flex flex-col space-y-1.5 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`text-lg font-bold leading-none tracking-tight text-slate-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <p className={`text-xs font-medium text-slate-400 uppercase tracking-wider ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "" }: { children: React.ReactNode, variant?: "default" | "outline" | "secondary" | "destructive" | "success" | "brand", className?: string }) => {
  const variants = {
    default: "bg-brand-primary text-white hover:bg-brand-dark",
    outline: "text-slate-950 border border-slate-200",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    destructive: "bg-red-500 text-white hover:bg-red-500/80",
    success: "bg-emerald-500 text-white hover:bg-emerald-500/80",
    brand: "bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
  };
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

const MilestoneTracker = ({ currentStatus }: { currentStatus: string }) => {
  const steps = ["posted", "expert_hired", "work_uploaded", "completed"];
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="space-y-5 pt-4">
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>Project Lifecycle</span>
        <span className="text-brand-primary capitalize">{currentStatus.replace('_', ' ')}</span>
      </div>
      <div className="relative h-1.5 w-full bg-slate-100 rounded-full">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex) / (steps.length - 1)) * 100}%` }}
          className="absolute inset-0 bg-brand-primary shadow-[0_0_8px_rgba(29,78,216,0.4)]"
        />
        <div className="absolute inset-0 flex justify-between">
          {steps.map((step, idx) => (
            <div 
              key={step} 
              className={`w-4 h-4 -mt-1.25 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                idx <= currentIndex 
                  ? "bg-brand-primary border-brand-primary shadow-[0_0_10px_rgba(29,78,216,0.3)]" 
                  : "bg-white border-slate-200"
              }`}
            >
              {idx < currentIndex ? (
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              ) : idx === currentIndex ? (
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between px-1">
        {steps.map((step, idx) => (
          <span key={step} className={`text-[9px] font-bold uppercase tracking-tighter ${idx <= currentIndex ? "text-slate-900" : "text-slate-300"}`}>
            {step.replace('_', ' ')}
          </span>
        ))}
      </div>
    </div>
  );
};

const StudentDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {studentActiveProjects.length > 0 ? (
        studentActiveProjects.map(project => (
          <Card key={project.id}>
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>ID: #{project.id}</CardDescription>
              </div>
              <Badge variant="brand">LKR {project.budget}</Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-primary rounded-full animate-ping"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">{project.bidsReceived} Experts Bid</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Active Opportunities</span>
                  </div>
                </div>
                <Badge variant="brand" className="bg-white">New Bids</Badge>
              </div>
              <MilestoneTracker currentStatus={project.status} />
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="lg:col-span-2 py-12 flex flex-col items-center justify-center border-dashed bg-slate-50/50">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-4">
            <Plus className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No active assignments</h3>
          <p className="text-sm text-slate-500 mt-1 mb-6">Post your first assignment to start getting bids from experts.</p>
          <Link href="/post" className="bg-brand-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-dark transition-all shadow-md">
            Post an Assignment
          </Link>
        </Card>
      )}
    </div>

    <Card className="overflow-hidden">
      <CardHeader className="border-b border-slate-50 bg-slate-50/30">
        <CardTitle>Top Experts for Selection</CardTitle>
        <CardDescription>Qualified freelancers matching your project requirements.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-50">
          {expertsForSelection.map(expert => (
            <div key={expert.id} className="flex items-center justify-between p-6 hover:bg-slate-50/80 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-slate-100">
                  <User className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-brand-primary transition-colors">Expert #U{expert.id}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-[10px] font-bold text-amber-700">{expert.rating}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{expert.reviews} reviews</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="text-right hidden sm:block">
                  <div className="flex items-center gap-1.5 justify-end text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    <Clock className="w-3 h-3" /> Delivery
                  </div>
                  <div className="text-sm font-bold text-slate-900">{expert.deliveryTime}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bid Amount</div>
                  <div className="text-sm font-black text-slate-900">LKR {expert.bidAmount}</div>
                </div>
                <button className="bg-brand-primary text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-brand-dark transition-all shadow-[0_4px_14px_rgba(29,78,216,0.3)] hover:shadow-[0_6px_20px_rgba(29,78,216,0.4)] active:scale-95">
                  Hire Expert
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const FreelancerDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          <TrendingUp className="w-4 h-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">LKR 45,000</div>
          <p className="text-xs text-slate-500 mt-1">+12% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
          <Briefcase className="w-4 h-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8 Projects</div>
          <p className="text-xs text-slate-500 mt-1">3 pending review</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <CheckSquare className="w-4 h-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98%</div>
          <p className="text-xs text-slate-500 mt-1">12 tasks total</p>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 px-1">Upcoming Deadlines</h3>
        <div className="space-y-4">
          {freelancerDeadlines.length > 0 ? (
            freelancerDeadlines.map(deadline => (
              <Card key={deadline.id}>
                <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{deadline.title}</CardTitle>
                      {deadline.urgency === "High" && <Badge variant="destructive">Urgent</Badge>}
                    </div>
                    <CardDescription>Assignment ID: #{deadline.id}</CardDescription>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200">
                      <Timer className={`w-4 h-4 ${deadline.urgency === "High" ? "text-red-500" : "text-slate-500"}`} />
                      <span className="text-sm font-bold text-slate-900">{deadline.timeLeft}</span>
                    </div>
                    <button className="flex-1 sm:flex-none bg-brand-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-dark transition-colors inline-flex items-center gap-2">
                      <FileUp className="w-4 h-4" /> Upload
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="py-12 flex flex-col items-center justify-center border-dashed bg-slate-50/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-4">
                <Briefcase className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No active deadlines</h3>
              <p className="text-sm text-slate-500 mt-1 mb-6">Browse open tasks to start earning credits.</p>
              <Link href="/browse" className="bg-brand-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-dark transition-all shadow-md">
                Browse Open Tasks
              </Link>
            </Card>
          )}
        </div>
      </div>

      <div className="lg:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {activityFeed.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-lg shrink-0 ${
                  activity.type === "bid" ? "bg-brand-primary" : activity.type === "payment" ? "bg-emerald-500" : "bg-amber-500"
                }`}>
                  {activity.type === "bid" ? <TrendingUp className="w-4 h-4 text-white" /> : activity.type === "payment" ? <Wallet className="w-4 h-4 text-white" /> : <AlertCircle className="w-4 h-4 text-white" />}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900 leading-none">{activity.text}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
            <button className="w-full mt-4 text-xs font-bold text-slate-400 hover:text-brand-primary transition-colors uppercase tracking-widest">
              View full history
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  const { role } = useDashboard();

  return (
    <motion.div
      key={role}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {role === "student" ? <StudentDashboard /> : <FreelancerDashboard />}
    </motion.div>
  );
}
