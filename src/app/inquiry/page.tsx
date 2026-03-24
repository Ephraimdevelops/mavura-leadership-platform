"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
    MessageSquare, 
    Mic, 
    Video, 
    Send, 
    Calendar, 
    MapPin, 
    Users, 
    CheckCircle2,
    ArrowRight,
    FileText,
    Undo2
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";


type InquiryType = "media" | "greeting" | "speaking" | null;

export default function InquiryPortal() {
    const [selectedType, setSelectedType] = useState<InquiryType>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-background selection:bg-accent selection:text-primary">
            <Header />
            <main className="pt-32 pb-32 paper-texture">
                <div className="max-w-[1200px] mx-auto px-6 relative z-10">

                <div className="max-w-5xl mx-auto space-y-24">
                    
                    {/* Page Header */}
                    <div className="text-center space-y-8">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="diplomatic-line w-12" />
                            <span className="text-accent   font-bold uppercase">Official Correspondence</span>
                            <div className="diplomatic-line w-12" />
                        </div>
                        <h1 className="text-5xl md:text-9xl font-montserrat  text-primary tracking-tight leading-none">
                            Liaison <span className="text-accent/80">&</span> Inquiry
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-sans font-light  leading-relaxed">
                            A dedicated channel for structured engagement with Ambassador Togolani Mavura&apos;s office.
                        </p>
                    </div>

                    {!submitted ? (
                        <div className="space-y-16">
                            {/* Selection Registry */}
                            <AnimatePresence mode="wait">
                                {!selectedType ? (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="grid grid-cols-1 md:grid-cols-3 gap-10"
                                    >
                                        <SelectionCard 
                                            icon={<MessageSquare size={24} />}
                                            title="Media Center"
                                            description="Official requests for interviews, quotes, or publication collaborations."
                                            onClick={() => setSelectedType("media")}
                                        />
                                        <SelectionCard 
                                            icon={<Video size={24} />}
                                            title="Personal Greeting"
                                            description="Requests for personalized video messages or written words of encouragement."
                                            onClick={() => setSelectedType("greeting")}
                                        />
                                        <SelectionCard 
                                            icon={<Mic size={24} />}
                                            title="Speaking Role"
                                            description="Invitations for keynote addresses, forums, or diplomatic panels."
                                            onClick={() => setSelectedType("speaking")}
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-card border border-border/80 p-10 md:p-20 shadow-2xl paper-texture relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                            <FileText size={160} />
                                        </div>

                                        <FormHeader 
                                            title={`${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Protocol`} 
                                            onBack={() => setSelectedType(null)} 
                                            info="Official Routing Slip TR-2024"
                                        />
                                        
                                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10">
                                            {selectedType === "media" && (
                                                <>
                                                    <RegistryField label="Publication / Outlet" required />
                                                    <RegistryField label="Representative Name" required />
                                                    <RegistryField label="Filing Deadline" type="date" />
                                                    <RegistryField label="Region of Origin" placeholder="Tanzania / Global" />
                                                    <div className="md:col-span-2">
                                                        <RegistryArea label="Subject Matter & Lead Inquiry" placeholder="Describe the focus of your inquiry or story pitch..." />
                                                    </div>
                                                </>
                                            )}

                                            {selectedType === "greeting" && (
                                                <>
                                                    <RegistryField label="Recipient Full Name" required />
                                                    <RegistryField label="The Occasion" placeholder="Graduation, Milestone, etc." />
                                                    <div className="md:col-span-2">
                                                        <RegistryArea label="Motivation & Context" placeholder="Tell us about the recipient and why this message will inspire them..." />
                                                    </div>
                                                </>
                                            )}

                                            {selectedType === "speaking" && (
                                                <>
                                                    <RegistryField label="Event Designation" required />
                                                    <RegistryField label="Organizing Body" required />
                                                    <RegistryField label="Proposed Date" type="date" required />
                                                    <RegistryField label="Engagement Type" placeholder="Keynote / Panel / Virtual" />
                                                    <div className="md:col-span-2">
                                                        <RegistryField label="Target Assembly / Audience" placeholder="e.g., Global Youth Leaders, Foreign Correspondents" />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <RegistryArea label="Forum Objectives" placeholder="Describe the theme and desired impact of the address..." />
                                                    </div>
                                                </>
                                            )}

                                            <div className="md:col-span-2 pt-10">
                                                <Button type="submit" className="bg-primary text-secondary px-12 h-16 uppercase font-bold   hover:bg-accent transition-all rounded-none group w-full md:w-auto">
                                                    Submit to Registry <ArrowRight className="ml-4 w-4 h-4 transition-transform group-hover:translate-x-3" />
                                                </Button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            className="bg-card border border-accent/20 p-20 text-center space-y-10 shadow-2xl paper-texture relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <ShieldTarget size={120} className="text-accent" />
                            </div>
                            <div className="w-20 h-20 bg-accent text-primary rounded-none flex items-center justify-center mx-auto shadow-lg transform rotate-45">
                                <CheckCircle2 className="w-10 h-10 -rotate-45" />
                            </div>
                            <div className="space-y-6 max-w-lg mx-auto">
                                <h3 className="text-4xl font-montserrat  text-primary">Dispatch Acknowledged</h3>
                                <p className="text-lg text-muted-foreground font-sans font-light  leading-relaxed">
                                    Your inquiry has been successfully routed to the Ambassador&apos;s communications office. We ensure a response within three business cycles.
                                </p>
                            </div>
                            <div className="pt-8">
                                <Button 
                                    variant="ghost" 
                                    onClick={() => { setSubmitted(false); setSelectedType(null); }} 
                                    className=" uppercase font-bold  text-accent hover:text-primary transition-colors flex items-center gap-3 mx-auto"
                                >
                                    <Undo2 size={14} /> Return to Registry
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}


function SelectionCard({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) {
    return (
        <motion.button 
            whileHover={{ y: -8 }}
            onClick={onClick}
            className="group p-12 border border-border bg-card hover:border-accent/40 transition-all text-left space-y-10 hover:shadow-2xl paper-texture h-full relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                {icon}
            </div>
            <div className="w-16 h-16 rounded-none border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                {icon}
            </div>
            <div className="space-y-4 flex-1">
                <h3 className="text-3xl font-montserrat  text-primary group-hover:text-accent transition-colors leading-[1.1]">{title}</h3>
                <p className="text-sm text-muted-foreground font-sans font-light  leading-relaxed">{description}</p>
            </div>
            <div className="pt-6 border-t border-accent/10 flex items-center  uppercase  font-bold text-muted-foreground group-hover:text-primary transition-colors">
                <span>Initiate Protocol</span>
                <ArrowRight className="ml-3 w-3 h-3 group-hover:translate-x-4 transition-transform" />
            </div>
        </motion.button>
    );
}

function FormHeader({ title, info, onBack }: { title: string, info: string, onBack: () => void }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-12 border-b border-accent/10">
            <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-montserrat  text-primary">{title}</h2>
                <div className="flex items-center gap-3">
                    <span className=" text-accent font-bold uppercase  font-mono">{info}</span>
                    <div className="w-1 h-1 rounded-full bg-accent/30" />
                    <span className=" text-muted-foreground uppercase ">Active Liaison</span>
                </div>
            </div>
            <Button 
                variant="ghost" 
                onClick={onBack} 
                className=" uppercase font-bold  px-0 hover:bg-transparent text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
            >
                <Undo2 size={12} /> Back to Selection
            </Button>
        </div>
    );
}

function RegistryField({ label, required, type = "text", placeholder }: { label: string; required?: boolean; type?: string; placeholder?: string }) {
    return (
        <div className="space-y-4">
            <label className=" font-bold uppercase  text-primary/70 flex items-center gap-2">
                {label} {required && <span className="text-accent">*</span>}
            </label>
            <Input 
                required={required} 
                type={type}
                placeholder={placeholder}
                className="h-14 border-border/60 bg-transparent rounded-none focus-visible:ring-accent  font-montserrat text-xl placeholder:opacity-30" 
            />
        </div>
    );
}

function RegistryArea({ label, placeholder }: { label: string; placeholder?: string }) {
    return (
        <div className="space-y-4">
            <label className=" font-bold uppercase  text-primary/70">{label}</label>
            <Textarea 
                placeholder={placeholder} 
                className="min-h-[200px] border-border/60 bg-transparent rounded-none focus-visible:ring-accent  font-montserrat text-xl p-6 placeholder:opacity-30" 
            />
        </div>
    );
}

function ShieldTarget(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}
