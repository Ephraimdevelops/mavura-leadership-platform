"use client";

import { motion } from "framer-motion";
import { Send, MessageSquare, Twitter, Mail, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function CommunityCTA() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="space-y-4">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold font-sans">Proximity & Belonging</span>
                            <h2 className="text-5xl md:text-6xl font-medium text-slate-950 font-cormorant tracking-tight">Join the <span className="text-accent italic">Community</span></h2>
                            <p className="max-w-md text-muted-foreground font-sans leading-relaxed">
                                Beyond the digital archive, join our living forums of leadership, 
                                public policy engagement, and archival discovery.
                            </p>
                        </div>
                        <div className="space-y-4 text-right hidden md:block">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold font-sans">Current Reach</span>
                            <p className="text-3xl font-sans font-bold text-slate-950">5,000+ Leaders</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <SocialCard 
                            icon={MessageSquare}
                            title="The Mavura Forum"
                            subtitle="WhatsApp Community"
                            description="Direct updates and strategic discussions on leadership and statecraft."
                            link="#"
                        />
                        <SocialCard 
                            icon={Twitter}
                            title="Global Archive"
                            subtitle="X (Twitter)"
                            description="Daily reflections and archival entries from the mission in New York."
                            link="https://twitter.com/TogolaniMavura"
                        />
                        <SocialCard 
                            icon={Mail}
                            title="Direct Inquiry"
                            subtitle="Media & Speaking"
                            description="For all professional inquiries regarding leadership forums or media engagements."
                            link="/contact"
                        />
                    </div>

                    <div className="pt-16 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">Sikiliza Togolani Socials</p>
                        <div className="flex flex-wrap justify-center gap-12">
                            {["LinkedIn", "Instagram", "Facebook"].map(platform => (
                                <a key={platform} href="#" className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-slate-950 transition-colors font-sans">
                                    {platform}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SocialCard({ icon: Icon, title, subtitle, description, link }: any) {
    return (
        <a 
            href={link}
            className="group block p-12 bg-secondary/5 border border-border/40 hover:border-accent/40 transition-all duration-700 hover:bg-white"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 bg-background border border-border/50 flex items-center justify-center group-hover:border-accent transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                </div>
                <ArrowRight className="w-4 h-4 text-accent transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
            </div>
            <div className="space-y-4">
                <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-normal font-bold text-accent font-sans">{subtitle}</span>
                    <h3 className="text-2xl font-sans font-bold text-primary tracking-tight">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed line-clamp-2">
                    {description}
                </p>
            </div>
        </a>
    );
}
