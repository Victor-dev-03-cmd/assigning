"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  Paperclip, 
  Send, 
  MoreVertical, 
  CheckCheck, 
  ExternalLink, 
  Clock, 
  Wallet, 
  CheckCircle2,
  MessageSquare, 
  User, 
  ChevronRight,
  Info,
  ShieldCheck,
  Shield,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data ---

const contacts = [
  {
    id: "E402",
    name: "Expert #E402",
    lastMessage: "The Python Data Science script is ready for preview. Please check it.",
    time: "10:24 AM",
    online: true,
    unread: 2,
    taskId: "#AU4201",
    taskTitle: "Python Data Science Project",
    status: "expert_hired",
    budget: "12,500",
    deadline: "2 Days Left"
  },
  {
    id: "E215",
    name: "Expert #E215",
    lastMessage: "Got the requirements. Starting the design phase now.",
    time: "9:15 AM",
    online: false,
    unread: 0,
    taskId: "#AU4203",
    taskTitle: "Marketing Research Paper",
    status: "posted",
    budget: "8,500",
    deadline: "4 Days Left"
  },
  {
    id: "E99",
    name: "Expert #E99",
    lastMessage: "Payment received. Thank you!",
    time: "Yesterday",
    online: false,
    unread: 0,
    taskId: "#AU3950",
    taskTitle: "Java UI/UX Assignment",
    status: "completed",
    budget: "15,000",
    deadline: "Completed"
  }
];

const initialMessages = [
  { id: 1, senderId: "me", text: "Hi, how is the project going?", time: "10:15 AM", status: "read" },
  { id: 2, senderId: "E402", text: "I've just finished the data cleaning part. Working on the visualizations now.", time: "10:18 AM", status: "read" },
  { id: 3, senderId: "me", text: "Great! Can you ensure the charts are in PNG format?", time: "10:20 AM", status: "read" },
  { id: 4, type: "system", text: "Expert has uploaded the draft. [View Preview]", time: "10:22 AM" },
  { id: 5, senderId: "E402", text: "The Python Data Science script is ready for preview. Please check it.", time: "10:24 AM", status: "sent" },
];

// --- Components ---

const Badge = ({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "success" | "brand" | "warning" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-600",
    success: "bg-emerald-50 text-emerald-600",
    brand: "bg-blue-50 text-blue-600",
    warning: "bg-amber-50 text-amber-600",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${variants[variant]} font-poppins`}>
      {children}
    </span>
  );
};

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, selectedContact]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const msg = {
      id: Date.now(),
      senderId: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };

    setMessages([...messages, msg]);
    setNewMessage("");

    // Mock typing response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white border border-slate-300 rounded overflow-hidden shadow-sm font-inter">
      
      {/* Left Pane: Contact List (30%) */}
      <aside className="w-[30%] border-r border-slate-300 flex flex-col bg-slate-50/30 backdrop-blur-sm">
        <div className="p-4 border-b border-slate-300 bg-white/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded text-sm focus:ring-1 focus:ring-blue-500/20 transition-all outline-none font-inter"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`w-full flex items-start gap-3 p-4 border-b border-slate-100 transition-all hover:bg-white group relative ${
                selectedContact?.id === contact.id ? "bg-white shadow-sm ring-1 ring-slate-200/50 z-10" : ""
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-500 font-bold overflow-hidden font-poppins">
                  <User className="w-6 h-6" />
                </div>
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate font-poppins text-sm tracking-tight">
                    {contact.name}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap font-inter">
                    {contact.time}
                  </span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest font-poppins">
                  Task: {contact.taskId}
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 leading-relaxed font-inter">
                  {contact.lastMessage}
                </p>
              </div>

              {contact.unread > 0 && (
                <div className="absolute right-4 bottom-4 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                  {contact.unread}
                </div>
              )}

              {selectedContact?.id === contact.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"></div>
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* Center Pane: Chat Window & Right Pane */}
      {selectedContact ? (
        <>
          <main className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <header className="p-4 border-b border-slate-200 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-black font-poppins">
                  {selectedContact.id.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-slate-900 leading-none font-poppins tracking-tight">{selectedContact.name}</h2>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${selectedContact.online ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`}></div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] font-poppins">
                        {selectedContact.online ? "Active Now" : "Offline"}
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 mt-1 text-xs font-bold text-blue-600 hover:underline text-left font-poppins">
                    {selectedContact.taskTitle} <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900">
                <MoreVertical className="w-5 h-5" />
              </button>
            </header>

            {/* Message Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 scroll-smooth">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.type === "system" ? (
                      <div className="w-full flex justify-center py-2">
                        <div className="bg-blue-50/80 border border-blue-100 px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm backdrop-blur-sm font-poppins uppercase tracking-widest text-[10px]">
                          <AlertCircle className="w-3 h-3 text-blue-600" />
                          <span className="text-blue-800 font-bold">{msg.text}</span>
                        </div>
                      </div>
                    ) : (
                      <div className={`max-w-[75%] space-y-1 ${msg.senderId === "me" ? "items-end" : "items-start"} flex flex-col`}>
                        <div className={`px-4 py-2.5 rounded-2xl text-[13px] font-medium shadow-sm leading-relaxed font-inter ${
                          msg.senderId === "me" 
                            ? "bg-blue-600 text-white rounded-tr-none" 
                            : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                        }`}>
                          {msg.text}
                        </div>
                        <div className="flex items-center gap-1.5 px-1">
                          <span className="text-[10px] font-medium text-slate-400 uppercase font-inter">{msg.time}</span>
                          {msg.senderId === "me" && (
                            <CheckCheck className={`w-3 h-3 ${msg.status === "read" ? "text-blue-500" : "text-slate-300"}`} />
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sticky Input */}
            <footer className="p-4 bg-white border-t border-slate-200">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-1 pr-2 transition-all focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-500/30 font-inter">
                <button type="button" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 group relative">
                  <Paperclip className="w-5 h-5" />
                  <div className="absolute bottom-full left-0 mb-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                    Attach File
                  </div>
                </button>
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..." 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 outline-none"
                />
                <button 
                  type="submit" 
                  className={`p-2 rounded-lg transition-all ${
                    newMessage.trim() 
                      ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 active:scale-95" 
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </footer>
          </main>

          {/* Right Pane: Task Context (25%) */}
          <aside className="w-[25%] border-l border-slate-200 bg-slate-50/50 flex flex-col p-6 space-y-8 overflow-y-auto font-inter">
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-poppins">Task Context</h3>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 font-poppins">Budget</div>
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-emerald-500" />
                    <span className="text-lg font-black text-slate-900 font-poppins">LKR {selectedContact.budget}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 font-poppins">Deadline</div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-bold text-slate-900 font-inter">{selectedContact.deadline}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 font-poppins">Status</div>
                  <Badge variant={selectedContact.status === "completed" ? "success" : "brand"}>
                    {selectedContact.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-poppins">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all group">
                  <span className="text-xs font-bold font-poppins">Request Milestone</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all group">
                  <span className="text-xs font-bold font-poppins">Send Invoice</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95">
                  <span className="text-xs font-bold font-poppins">Mark as Completed</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </section>

            <section className="pt-4">
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[10px] font-medium text-emerald-800 leading-relaxed font-inter">
                  <strong>Assigne Protection:</strong> Your payments are secured in escrow until you approve the work.
                </p>
              </div>
            </section>
          </aside>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/20 p-8 text-center font-inter">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
            <MessageSquare className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-xl font-black text-slate-900 font-poppins uppercase tracking-tight">Select a conversation</h2>
          <p className="text-sm text-slate-500 mt-2 max-w-sm font-inter">
            Choose a contact from the list on the left to start discussing your project requirements and updates.
          </p>
        </div>
      )}
    </div>
  );
}
