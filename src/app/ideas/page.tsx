"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function IdeasPage() {
    const essays = useQuery(api.ideas.getPublished);
    const displayEssays = essays || [];

    return (
        <main className="min-h-screen bg-background selection:bg-accent selection:text-white">
            <Header />
            
            {/* HERO */}
            <section className="pt-40 pb-20 border-b border-border/10 bg-secondary/5">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-4xl space-y-6">
                        <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block">The Intellectual Archive</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium font-cormorant leading-[1.1] text-slate-950 tracking-tight uppercase">
                            Intellectual <br/> <span className="text-accent italic">Thought</span>
                        </h1>
                        <p className="text-xl text-muted-foreground font-sans max-w-2xl leading-relaxed">
                            A repository of deep inquiries into leadership, diplomacy, 
                            and the evolving architecture of social and economic progress.
                        </p>
                    </div>
                </div>
            </section>

            {/* CATALOG */}
            <section className="py-32">
                <div className="max-w-[1200px] mx-auto px-6">
                    {!displayEssays ? (
                        <div className="flex justify-center py-20">
                            <p className="text-muted-foreground animate-pulse uppercase text-xs">Accessing Digital Records...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                            {displayEssays.map((essay: any, i: number) => (
                                <motion.div
                                    key={essay._id || i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group space-y-8"
                                >
                                    <Link href={`/ideas/${essay.slug}`} className="block">
                                        <div className="aspect-[16/10] bg-secondary/5 border border-border/50 overflow-hidden relative">
                                            {essay.coverImageUrl || essay.mainImage || essay.coverImage ? (
                                                <img 
                                                    src={essay.coverImageUrl || essay.mainImage || essay.coverImage} 
                                                    alt={essay.title} 
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-20">
                                                    <BookOpen className="w-12 h-12 text-accent" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-slate-950 px-3 py-1">
                                                <span className="text-[8px] uppercase text-accent font-bold tracking-widest">{essay.category || "General"}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-6 pt-2">
                                            <h3 className="text-2xl font-medium font-primary text-slate-950 leading-tight group-hover:text-accent transition-colors">
                                                {essay.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground font-sans line-clamp-3 leading-relaxed">
                                                {essay.summary || essay.excerpt}
                                            </p>
                                            <div className="inline-flex items-center gap-3 uppercase font-bold text-accent group/btn text-[10px] tracking-widest border-b border-accent/20 pb-1 hover:border-accent transition-all">
                                                Read Essay <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
