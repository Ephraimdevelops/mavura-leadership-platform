"use client";

import { motion } from "framer-motion";
import { 
    Globe, 
    Landmark, 
    Briefcase, 
    GraduationCap, 
    Heart, 
    Award, 
    ArrowRight, 
    ExternalLink,
    ShieldCheck,
    Users,
    Stethoscope,
    Zap,
    Anchor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NextImage from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-primary selection:bg-accent selection:text-white font-sans">
            <Header />
            
            {/* 1. HERO SECTION - REFINED & SIMPLE */}
            <section className="relative min-h-[50vh] flex items-center pt-40 pb-20 overflow-hidden bg-background">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block">Portrait of Service</span>
                                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium text-slate-950 font-cormorant leading-tight">
                                        H.E. Togolani Edriss <span className="text-accent italic">Mavura</span>
                                    </h1>
                                </div>
                                
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-sans">
                                    H.E. Togolani Edriss Mavura is a career diplomat, strategic advisor, and the Permanent Representative 
                                    of the United Republic of Tanzania to the United Nations in New York. With a career spanning over 
                                    two decades at the highest levels of government and international relations, Ambassador Mavura 
                                    has dedicated his life to advancing Tanzania’s economic diplomacy, forging strategic global 
                                    partnerships, and amplifying the voice of the Global South on the world stage.
                                </p>

                                <div className="pt-4">
                                    <Button variant="outline" className="h-14 px-10 rounded-none border-primary/20 text-slate-950 text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-white">
                                        Download Official Bio
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative flex justify-center lg:justify-end"
                        >
                            <div className="relative w-full aspect-[4/5] max-w-xl">
                                <div className="relative z-10 w-full h-full">
                                    <img 
                                        src="/images/tm-portrait-flag.png" 
                                        alt="Ambassador Togolani Mavura" 
                                        className="w-full h-full object-cover object-top"
                                    />
                                    {/* Bottom Fade into Background */}
                                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent z-20" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* 3. EXPERIENCE TIMELINE (DETAILED) */}
            <section id="timeline" className="py-32 border-b border-border/10">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="mb-20">
                        <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block">Professional Record</span>
                        <h2 className="text-5xl md:text-6xl font-medium text-slate-950 font-cormorant mt-4">Professional History</h2>
                    </div>

                    <div className="space-y-24">
                        {[
                            {
                                role: "Ambassador Extraordinary and Plenipotentiary",
                                org: "Embassy of Tanzania to the Republic of Korea",
                                period: "Sep 2021 — Present",
                                details: "Leading the Tanzanian mission in Seoul. Major focus on the Indo-Pacific strategy, technical cooperation, Blue Economy development, and Energy Transition diplomacy."
                            },
                            {
                                role: "Private Secretary & Special Assistant",
                                org: "Office of the Former President Jakaya Mrisho Kikwete",
                                period: "Nov 2015 — Sep 2021",
                                details: "Technical Lead for Former President Kikwete's global portfolios including AU High Representative on Libya, GAVI (Global Ambassador for Immunization), UN-EWEC, and World Malaria Council. Co-Chair of UNFPA High-Level Panel on ICPD 25+."
                            },
                            {
                                role: "Personal Assistant to the President (Speechwriter)",
                                org: "President's Office, State House",
                                period: "Feb 2014 — Nov 2015",
                                details: "Architected primary national discourse and presidential narratives. Coordinated speechwriting and high-level policy communication for the Head of State."
                            },
                            {
                                role: "Private Secretary to the Minister",
                                org: "Ministry of Foreign Affairs and International Cooperation",
                                period: "Sep 2009 — Feb 2014",
                                details: "Managed the Private Office of the Minister (Chef de Cabinet). Facilitated ministerial, parliamentary, and international obligations across global jurisdictions."
                            },
                            {
                                role: "Foreign Service Officer",
                                org: "Directorate of Multilateral Cooperation",
                                period: "Oct 2006 — Aug 2009",
                                details: "In-charge of Multilateral dockets: ICGLR, The Commonwealth, NAM, IOM, and UNHCR."
                            }
                        ].map((exp, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-[200px_1fr] gap-12 pb-12 border-b border-border/5 last:border-0"
                            >
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{exp.period}</span>
                                    <p className="text-[11px] font-bold text-muted-foreground uppercase">{exp.org}</p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl md:text-3xl font-cormorant font-medium text-slate-950">{exp.role}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed font-sans max-w-3xl">
                                        {exp.details}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. VOLUNTEERING & GOVERNANCE */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="mb-20 text-center">
                        <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block">Philanthropy & Boards</span>
                        <h2 className="text-4xl md:text-5xl font-medium text-slate-950 font-cormorant mt-4">Governance & Community</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Save the Children UK", role: "Board Member / Africa Advisory", date: "2019 — Present" },
                            { title: "Tanzania Startup Association", role: "Board Member", date: "2021 — Present" },
                            { title: "Ali Kimara Rare Disease Foundation", role: "Founding Board Member", date: "2019 — Present" },
                            { title: "The Access Challenge", role: "Co-Chair & Board Member", date: "2024 — Present" },
                            { title: "Save the Children Tanzania", role: "Founding Board Member", date: "2023 — Present" },
                            { title: "Salim Ahmed Salim Centre", role: "Member of Governing Council", date: "2025 — Present" }
                        ].map((v, i) => (
                            <div key={i} className="p-8 bg-white border border-border/10 space-y-4 group hover:-translate-y-1 transition-all duration-500 shadow-sm">
                                <span className="text-[9px] font-bold text-accent uppercase tracking-[0.2em]">{v.date}</span>
                                <h4 className="text-xl font-sans font-bold text-slate-950 leading-tight">{v.title}</h4>
                                <p className="text-xs text-muted-foreground font-sans uppercase font-bold tracking-widest">{v.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. EDUCATION */}
            <section className="py-32">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-20">
                        <div>
                            <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block">Academic Background</span>
                            <h2 className="text-4xl md:text-5xl font-medium text-slate-950 font-cormorant mt-4">Educational History</h2>
                            <p className="mt-8 text-muted-foreground font-sans">
                                A dedication to continuous learning in the fields of Leadership, 
                                Development, and International Relations.
                            </p>
                        </div>
                        <div className="space-y-12">
                            {[
                                { degree: "MSc Leadership and Development", school: "King's College London (KCL)", year: "2018 — 2019", note: "Chevening Scholar | Graduated with Distinction" },
                                { degree: "Associate Fellow, Leadership and Security", school: "African Leadership Centre (ALC), KCL", year: "2019 — 2020", note: "Leadership Training, Mentoring and Coaching" },
                                { degree: "Post Graduate Diploma, Management of Foreign Service", school: "Mozambique-Tanzania Centre for Foreign Relations", year: "2013" },
                                { degree: "BA Political Science and Public Administration (IR)", school: "University of Dar es Salaam (UDSM)", year: "2002 — 2005" }
                            ].map((edu, i) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="relative mt-2">
                                        <div className="w-4 h-4 rounded-full border-2 border-accent bg-background z-10 relative" />
                                        {i !== 3 && <div className="absolute top-4 left-2 w-[1px] h-24 bg-border/20 -translate-x-1/2" />}
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs font-bold text-accent">{edu.year}</span>
                                        <h3 className="text-xl font-sans font-bold text-slate-950">{edu.degree}</h3>
                                        <p className="text-sm font-sans text-muted-foreground uppercase font-bold tracking-widest">{edu.school}</p>
                                        {edu.note && <p className="text-xs text-accent italic font-medium">{edu.note}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <NewsletterBanner />
            <Footer />
        </main>
    );
}
