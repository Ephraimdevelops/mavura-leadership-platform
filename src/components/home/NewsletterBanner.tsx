"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export function NewsletterBanner() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
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
                source: "homepage" 
            });
            if (result.success) {
                toast.success(result.message);
                setEmail("");
            }
        } catch (error) {
            toast.error("Subscription failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <section className="bg-[#0A1B33] py-20 w-full border-y border-white/5 relative overflow-hidden">
            {/* Subtle Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block">Community Hub</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white font-cormorant leading-tight tracking-tight">
                                Letters on <span className="text-accent italic">Leadership</span> & <span className="text-accent italic">Diplomacy</span>
                            </h2>
                            <p className="text-lg text-white/60 font-sans max-w-lg leading-relaxed">
                                Join a global community receiving monthly reflections on statecraft, 
                                public service, and the architecture of Africa&apos;s future.
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Input 
                                    type="email" 
                                    placeholder="Your primary email address" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-14 bg-white/5 border-white/10 rounded-none px-6 text-base focus:ring-accent/30 text-white lowercase placeholder:text-white/20"
                                    required
                                />
                                <Button 
                                    type="submit" 
                                    variant="premium" 
                                    className="group shrink-0 h-14 px-8 rounded-none border-0 shadow-none"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Linking..." : "Connect"} 
                                    <Send className="w-4 h-4 ml-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </Button>
                            </div>
                            <p className="text-[9px] uppercase font-bold text-white/20 tracking-widest">
                                Join 5,000+ ambassadors, students, and global leaders.
                            </p>
                        </form>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative aspect-square overflow-hidden group shadow-2xl">
                        <img 
                            src="/images/tm-newsletter-dark.png" 
                            alt="Ambassador Mavura Official" 
                            className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B33]/80 via-[#0A1B33]/10 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}
