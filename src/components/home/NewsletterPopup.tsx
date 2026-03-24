"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight } from "lucide-react";
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
        const hasSeenPopup = localStorage.getItem("mavura_newsletter_popup");
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000); // Show after 5 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        localStorage.setItem("mavura_newsletter_popup", "true");
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary/40 backdrop-blur-sm">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-white overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-[#0A1B33]/10"
                    >
                        <button 
                            onClick={closePopup}
                            className="absolute top-6 right-6 text-[#0A1B33]/40 hover:text-accent z-20 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col md:grid md:grid-cols-[1fr_1.2fr]">
                            <div className="relative aspect-[4/5] md:aspect-auto bg-[#0A1B33] overflow-hidden">
                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                    <div className="absolute top-[-20%] right-[-20%] w-[100%] h-[100%] bg-accent/20 rounded-full blur-[80px]" />
                                </div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white space-y-6">
                                    <Mail className="w-10 h-10 text-accent" />
                                    <h3 className="text-3xl font-sans font-bold uppercase tracking-tight">The Mavura Letter</h3>
                                    <div className="h-px w-12 bg-accent/40" />
                                    <p className="text-xs uppercase  font-bold text-accent">Exclusive Insights</p>
                                </div>
                            </div>

                            <div className="p-10 md:p-16 space-y-8 flex flex-col justify-center bg-white">
                                <div className="space-y-4">
                                    <h4 className="text-2xl font-primary leading-tight text-primary">Strategic Perspectives. Delivered Weekly.</h4>
                                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                                        Join a vetted network of global leaders receiving Ambassador Mavura&apos;s 
                                        private reflections on diplomacy and leadership architecture.
                                    </p>
                                </div>

                                <form onSubmit={handleSubscribe} className="space-y-4">
                                    <input 
                                        type="name" 
                                        placeholder="Full Name (Optional)" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full h-12 bg-secondary/5 border border-border px-4 text-sm focus:outline-none focus:border-accent transition-colors font-sans"
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-12 bg-secondary/5 border border-border px-4 text-sm focus:outline-none focus:border-accent transition-colors font-sans"
                                        required
                                    />
                                    <Button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-12 bg-[#0A1B33] text-white hover:bg-[#0A1B33]/90 font-bold   uppercase gap-3"
                                    >
                                        {isSubmitting ? "Suscribing..." : "Secure Subscription"} <ArrowRight className="w-3 h-3" />
                                    </Button>
                                </form>
                                
                                <p className=" text-center text-muted-foreground uppercase  font-bold">
                                    No Spam. Only Signal.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
