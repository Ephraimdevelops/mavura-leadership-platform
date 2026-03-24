"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe, TrendingUp, ShieldCheck, FileText, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";


export default function ProfessionalPortfolio() {
    return (
        <div className="min-h-screen bg-background selection:bg-accent selection:text-primary">
            <Header />
            <main className="pt-32 pb-20 paper-texture">
                <div className="max-w-[1200px] mx-auto px-6 relative z-10">

                <div className="max-w-6xl mx-auto space-y-32">
                    
                    {/* Page Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="diplomatic-line w-12" />
                            <span className="text-accent   font-bold uppercase font-sans">Official Archive</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-montserrat font-bold text-primary tracking-tighter leading-[0.9]">
                            Diplomatic & <br/>
                            Strategic Portfolio
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-sans font-light leading-relaxed">
                            A curated record of economic advocacy, global representational duties, and the pursuit of national transparency on the world stage.
                        </p>

                    </motion.div>

                    {/* Section 1: Economic Advocacy */}
                    <div id="economic" className="space-y-16">

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-accent transition-transform hover:translate-x-1">
                                    <TrendingUp size={20} />
                                    <h3 className="text-xs uppercase  font-bold">Economic Integration</h3>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-montserrat font-bold">Advocacy & International Trade</h2>
                            </div>
                            <p className="text-sm text-muted-foreground max-w-sm font-sans">
                                Facilitating strategic partnerships between Tanzania's resources and global industrial giants.
                            </p>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <FolderCard 
                                category="Investment"
                                title="POSCO Graphite Strategic Deal"
                                date="Ref: MN-2023-01"
                                description="Architecting the diplomatic framework to attract POSCO International for graphite exploration and value-addition in Tanzania."
                            />
                            <FolderCard 
                                category="Policy"
                                title="AfCFTA Implementation"
                                date="Ref: TR-2023-04"
                                description="Advocating for the removal of non-tariff barriers and promoting intra-African trade corridors through the Continental Free Trade Area."
                            />
                            <FolderCard 
                                category="Diplomacy"
                                title="Korea-Africa Trade Corridor"
                                date="Ref: KR-2022-09"
                                description="Establishing direct B2B liaison between Korean tech conglomerates and the East African Community industrial base."
                            />
                        </div>
                    </div>

                    {/* Section 2: Global Forums (The Document Registry style) */}
                    <div id="speeches" className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-10">

                        <div className="lg:col-span-5 space-y-8">
                            <div className="flex items-center gap-3 text-accent">
                                <Globe size={20} />
                                <h3 className="text-xs uppercase  font-bold">Global Forums</h3>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-8">Representational <br/>Record</h2>
                            <p className="text-muted-foreground leading-relaxed font-sans">
                                Transcripts and submissions delivered at principal international assemblies, bridging regional challenges with global solutions.
                            </p>

                        </div>
                        
                        <div className="lg:col-span-7 divide-y divide-border border-y border-border">
                            <RegistryItem 
                                title="Jeju Forum for Peace & Prosperity"
                                location="Republic of Korea"
                                year="2023"
                                topic="Global Solidarity for Resilient Recovery"
                            />
                            <RegistryItem 
                                title="UNESCO General Assembly"
                                location="Paris, France"
                                year="2022"
                                topic="Transforming Education for a Digital Africa"
                            />
                            <RegistryItem 
                                title="Korea-Africa Business Summit"
                                location="Seoul"
                                year="2024"
                                topic="Critical Mineral Partnerships for Green Growth"
                            />
                        </div>
                    </div>

                    {/* Section 3: Integrity Archive */}
                    <motion.div 
                        id="integrity"
                        whileHover={{ scale: 1.005 }}
                        className="subtle-card p-12 md:p-20 relative overflow-hidden group"
                    >


                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
                            <div className="p-4 bg-primary text-secondary rounded-sm">
                                <ShieldCheck size={32} />
                            </div>
                            <div className="space-y-8 max-w-4xl">
                                <h3 className="text-xs uppercase  text-accent font-bold">The Integrity Archive</h3>
                                <h2 className="text-3xl md:text-6xl font-montserrat leading-tight">Proactive Transparency & <br/>Combatting Misinformation</h2>
                                <p className="text-lg md:text-xl text-muted-foreground font-sans leading-relaxed">
                                    "Diplomatic leadership demands intellectual honesty. In an era of informational volatility, I maintain a public record of verified facts regarding national resources and policy."
                                </p>

                                <div className="flex flex-wrap gap-6">
                                    <ArchiveLink label="Port Concessions Fact-Sheet" />
                                    <ArchiveLink label="Mineral Resources Clarification" />
                                    <ArchiveLink label="Economic Policy Statements" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}


function FolderCard({ title, description, category, date }: { title: string; description: string; category: string; date?: string }) {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="relative group pt-6"
        >
            {/* Folder Tab */}
            <div className="absolute top-0 left-0 bg-accent text-accent-foreground px-4 py-1 text-[8px] uppercase  font-bold rounded-t-sm transition-all group-hover:px-6">
                {category}
            </div>
            {/* Folder Body */}
            <div className="bg-card border border-border p-8 rounded-b-sm rounded-tr-sm shadow-sm transition-all group-hover:border-accent/40 group-hover:shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12">
                    <FileText size={48} />
                </div>
                <div className=" text-muted-foreground uppercase  mb-6 font-mono opacity-60">{date || "ARCHIVE-2023"}</div>
                <h4 className="text-2xl font-montserrat font-bold text-primary mb-6 transition-colors group-hover:text-accent">{title}</h4>
                <div className="w-12 h-px bg-accent/30 mb-8 transition-all group-hover:w-20" />
                <p className="text-sm text-muted-foreground leading-relaxed font-sans font-normal">{description}</p>
            </div>

        </motion.div>
    );
}

function RegistryItem({ title, location, year, topic }: { title: string; location: string; year: string; topic: string }) {
    return (
        <div className="py-8 group cursor-pointer">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                    <p className=" uppercase  font-bold text-accent">{year} • {location}</p>
                    <h4 className="text-2xl font-montserrat font-bold text-primary group-hover:text-accent transition-colors">{title}</h4>

                </div>
                <div className="flex items-center gap-4">
                    <span className=" uppercase  text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">Access Record</span>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                </div>
            </div>
            <div className="mt-4 p-4 border-l-2 border-accent/10 bg-muted/20 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">&quot;{topic}&quot;</p>

            </div>
        </div>
    );
}

function ArchiveLink({ label }: { label: string }) {
    return (
        <Link 
            href="#" 
            className="flex items-center gap-3  uppercase  font-bold text-primary/70 hover:text-accent transition-all group"
        >
            <div className="w-1.5 h-1.5 rounded-full bg-accent scale-50 opacity-0 group-hover:opacity-100 transition-all" />
            <span className="border-b border-accent/20 pb-1 group-hover:border-accent">{label}</span>
        </Link>
    );
}
