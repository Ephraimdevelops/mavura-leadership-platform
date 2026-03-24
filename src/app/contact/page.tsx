"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Mail, Linkedin, Twitter, MapPin, ArrowRight, CheckCircle2, Loader2, Globe, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [subject, setSubject] = useState("");
    const submitInquiry = useMutation(api.inquiries.submit);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            organization: formData.get("organization") as string || undefined,
            subject: subject,
            details: formData.get("details") as string,
        };

        try {
            await submitInquiry(data);
            setIsSubmitted(true);
            toast.success("Message sent successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Transmission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-background selection:bg-accent selection:text-white font-sans overflow-x-hidden">
            <Header />
            
            {/* HERO SECTION */}
            <section className="pt-40 pb-20 border-b border-border/10 bg-secondary/5">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-4xl space-y-6">
                        <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block">Contact Togolani's Office</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium font-cormorant leading-[1.1] text-slate-950 tracking-tight">
                            Get In <span className="text-accent italic">Touch</span>
                        </h1>
                        <p className="text-xl text-muted-foreground font-sans max-w-2xl leading-relaxed">
                            Reach out for speaking engagements, media inquiries, or to connect with Ambassador Mavura and his team.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-32">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid lg:grid-cols-[1fr_1.5fr] gap-24">
                        
                        {/* 1. DIRECT CHANNELS */}
                        <div className="space-y-16">
                            <div className="space-y-10">
                                <h3 className="text-2xl font-cormorant font-medium text-slate-950 uppercase tracking-widest">Connect Directly</h3>
                                <div className="space-y-8">
                                    {[
                                        { icon: Mail, label: "Email Address", value: "office@togolani.com" },
                                        { icon: MapPin, label: "Location", value: "New York, United Nations" },
                                        { icon: Globe, label: "Website", value: "www.togolani.com" },
                                        { icon: MessageCircle, label: "Community", value: "WhatsApp Updates" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-6 group">
                                            <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center border border-border/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <div className="space-y-1 pt-1">
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
                                                <p className="text-sm font-bold text-slate-950 uppercase">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-10 bg-slate-950 text-white space-y-6">
                                <h4 className="text-xl font-cormorant italic text-accent">Our Response Policy</h4>
                                <p className="text-xs text-white/50 leading-relaxed font-sans">
                                    "We aim to read every message. Our team usually responds to inquiries within 2-3 business days. 
                                    Urgent requests will be prioritized."
                                </p>
                            </div>
                        </div>

                        {/* 2. ENQUIRY FORM */}
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.div 
                                        key="form"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-white border border-border/10 p-10 md:p-20 shadow-2xl relative"
                                    >
                                        <form onSubmit={handleSubmit} className="space-y-10">
                                            <div className="grid md:grid-cols-2 gap-10">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] uppercase font-bold text-accent tracking-widest">Full Name *</label>
                                                    <Input name="name" required placeholder="Ex. John Doe" className="h-14 rounded-none border-border/40 bg-transparent font-medium focus:border-accent" />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] uppercase font-bold text-accent tracking-widest">Email Address *</label>
                                                    <Input name="email" type="email" required placeholder="official@institution.com" className="h-14 rounded-none border-border/40 bg-transparent font-medium focus:border-accent" />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-10">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] uppercase font-bold text-accent tracking-widest">Organization</label>
                                                    <Input name="organization" placeholder="Mission / Department" className="h-14 rounded-none border-border/40 bg-transparent font-medium focus:border-accent" />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] uppercase font-bold text-accent tracking-widest">Subject *</label>
                                                    <Select value={subject} onValueChange={setSubject}>
                                                        <SelectTrigger className="h-14 rounded-none border-border/40 bg-transparent font-medium focus:border-accent">
                                                            <SelectValue placeholder="How can we help you?" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Speaking Request">Speaking Request</SelectItem>
                                                            <SelectItem value="Media & Press">Media & Press</SelectItem>
                                                            <SelectItem value="Partnership Inquiry">Partnership Inquiry</SelectItem>
                                                            <SelectItem value="General Question">General Question</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase font-bold text-accent tracking-widest">Your Message *</label>
                                                <Textarea name="details" required placeholder="Tell us more about your inquiry..." className="min-h-[200px] rounded-none border-border/40 bg-transparent font-medium resize-none focus:border-accent" />
                                            </div>

                                            <Button 
                                                type="submit" 
                                                disabled={isSubmitting}
                                                className="w-full h-18 bg-slate-950 text-white hover:bg-accent transition-all duration-700 font-bold uppercase tracking-widest gap-4 rounded-none shadow-xl"
                                            >
                                                {isSubmitting ? (
                                                    <>Sending... <Loader2 className="w-4 h-4 animate-spin text-accent" /></>
                                                ) : (
                                                    <>Send Message <ArrowRight className="w-4 h-4 text-accent" /></>
                                                )}
                                            </Button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white border border-accent/20 p-20 text-center space-y-8 shadow-2xl relative"
                                    >
                                        <div className="w-24 h-24 bg-accent text-white rounded-none flex items-center justify-center mx-auto mb-8 shadow-lg">
                                            <CheckCircle2 className="w-12 h-12" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-cormorant font-medium text-slate-950 uppercase tracking-tight">Message Sent</h3>
                                            <p className="text-lg text-muted-foreground font-sans leading-relaxed max-w-sm mx-auto">
                                                Thank you for reaching out. Our team will get back to you shortly.
                                            </p>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            onClick={() => setIsSubmitted(false)}
                                            className="uppercase font-bold text-accent hover:text-slate-950 transition-colors flex items-center gap-3 mx-auto mt-8 border-b border-accent/20 cursor-pointer"
                                        >
                                            Send Another Message
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            <NewsletterBanner />
            <Footer />
        </main>
    );
}
