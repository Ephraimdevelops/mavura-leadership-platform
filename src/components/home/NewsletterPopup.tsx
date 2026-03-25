"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const lastSeen = localStorage.getItem("mavura_newsletter_last_seen");
        const now = Date.now();
        const twoDays = 2 * 24 * 60 * 60 * 1000;

        if (!lastSeen || (now - parseInt(lastSeen)) > twoDays) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 15000); // 15 seconds delay
            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        localStorage.setItem("mavura_newsletter_last_seen", Date.now().toString());
    };

    const subscribeMutation = useMutation(api.newsletter.subscribe);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await subscribeMutation({ 
                email, 
                name, 
                source: "popup" 
            });
            if (result.success) {
                toast.success(result.message);
                localStorage.setItem("mavura_newsletter_last_seen", (Date.now() + 365 * 24 * 60 * 60 * 1000).toString()); // Don't show again for a year after success
                setTimeout(closePopup, 2000);
            }
        } catch (error) {
            toast.error("Subscription failed. Please try again.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-md">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="relative w-full max-w-4xl bg-white overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] border border-white/10 flex flex-col md:flex-row min-h-[500px]"
                    >
                        {/* 1. CINEMATIC IMAGE PANEL */}
                        <div className="relative w-full md:w-1/2 overflow-hidden bg-slate-900 group">
                            <img 
                                src="/images/tm-portrait-flag.png" 
                                alt="Ambassador Togolani Mavura" 
                                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-1000"
                            />
                            {/* Cinematic Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10" />
                            
                            {/* Branding on Image */}
                            <div className="absolute bottom-10 left-10 space-y-2 z-10">
                                <span className="text-[10px] uppercase font-bold text-accent tracking-[0.3em] block">Official Archive</span>
                                <h3 className="text-3xl font-cormorant italic text-white leading-tight">
                                    The <span className="text-accent">Mavura</span> Letter
                                </h3>
                            </div>
                        </div>

                        {/* 2. FORM PANEL */}
                        <div className="relative w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white">
                            <button 
                                onClick={closePopup}
                                className="absolute top-6 right-6 text-slate-400 hover:text-accent transition-colors p-2"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center text-accent">
                                        <Bell className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-3xl md:text-4xl font-cormorant font-medium text-slate-950 leading-tight">
                                        Diplomatic Insights, <br /> Direct to Your Inbox.
                                    </h4>
                                    <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-sm">
                                        Join over 5,000 global leaders receiving Ambassador Mavura's 
                                        weekly reflections on leadership, statecraft, and Africa's trajectory.
                                    </p>
                                </div>

                                <form onSubmit={handleSubscribe} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase font-bold text-accent tracking-widest">Full Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Ex. John Doe" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full h-12 border-b border-slate-200 focus:border-accent outline-none font-sans text-sm transition-colors bg-transparent"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase font-bold text-accent tracking-widest">Email Address</label>
                                        <input 
                                            type="email" 
                                            placeholder="official@institution.com" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full h-12 border-b border-slate-200 focus:border-accent outline-none font-sans text-sm transition-colors bg-transparent"
                                            required
                                        />
                                    </div>
                                    
                                    <Button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-14 bg-slate-950 text-white hover:bg-accent transition-all duration-500 font-bold uppercase tracking-widest gap-4 rounded-none mt-4 shadow-xl"
                                    >
                                        {isSubmitting ? "Processing..." : "Secure Access"} <ArrowRight className="w-4 h-4 text-accent" />
                                    </Button>
                                </form>

                                <div className="flex items-center gap-4 pt-4 opacity-50">
                                    <ShieldCheck className="w-4 h-4" />
                                    <p className="text-[9px] uppercase font-bold tracking-widest">Privacy Protected • One Click Unsubscribe</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function ShieldCheck({ className }: { className?: string }) {
    return (
        <svg  className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
            <path d="m9 12 2 2 4-4"/>
        </svg>
    )
}

