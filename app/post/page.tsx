import React from "react";
import AssignmentForm from "@/components/AssignmentForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PostAssignmentPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 md:py-20 px-6 font-sans">
      <div className="max-w-2xl mx-auto mb-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <div className="space-y-2">
          <h1 className="text-3xl text-slate-900 tracking-tight">Post Your Assignment.</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Fill in the details below to get connected with Sri Lanka's top academic experts.
          </p>
        </div>
      </div>

      <AssignmentForm />
      
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <p className="text-slate-500 text-sm">
          By posting, you agree to our Terms of Service and Honor Code.
        </p>
      </div>
    </div>
  );
}
