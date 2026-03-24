"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Filter, Twitter, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";


const CATEGORIES = ["All", "Work Ethic & Career", "Wealth & Relationships", "Life & Integrity"];

export default function PhilosophyPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const quotes = useQuery(api.quotes.getAll) || [];

    const filteredQuotes = selectedCategory === "All" 
        ? quotes 
        : quotes.filter((q: Doc<"quotes">) => q.category === selectedCategory);

    return (
        <div className="min-h-screen bg-background selection:bg-accent selection:text-primary">
            <Header />
            <main className="pt-32 pb-32 paper-texture">
                <div className="max-w-[1200px] mx-auto px-6 relative z-10">

                <div className="max-w-6xl mx-auto space-y-20">
                    
                    {/* Page Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-8"
                    >
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="diplomatic-line w-12" />
                            <span className="text-accent   font-bold uppercase">Public Repository of Wisdom</span>
                            <div className="diplomatic-line w-12" />
                        </div>
                        <h1 className="text-5xl md:text-9xl font-sans font-bold text-primary tracking-tight leading-none uppercase">
                            Sikiliza Togolani
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-sans font-light leading-relaxed">
                            A curated archive of life reflections and social observations, captured in the quiet moments of diplomatic service.
                        </p>

                        
                        <div className="flex items-center justify-center gap-6 pt-6">
                            <a 
                                href="https://twitter.com/tonytogolani" 
                                target="_blank" 
                                className="group flex items-center gap-3  uppercase  font-bold text-primary hover:text-accent transition-all"
                            >
                                <Twitter className="w-4 h-4" /> @tonytogolani
                                <div className="absolute -bottom-2 left-0 w-0 h-px bg-accent transition-all group-hover:w-full" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Filter Navigation */}
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-y border-border/50 py-10">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={` uppercase  font-bold transition-all relative py-2
                                    ${selectedCategory === cat ? 'text-accent' : 'text-muted-foreground hover:text-primary'}`}
                            >
                                {cat}
                                {selectedCategory === cat && (
                                    <motion.div 
                                        layoutId="activeFilter"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Wisdom Masonry Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-10">
                        <AnimatePresence mode="popLayout">
                            {filteredQuotes.map((quote: Doc<"quotes">, index: number) => (
                                <WisdomCard key={quote._id} quote={quote} index={index} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Empty State */}
                    {filteredQuotes.length === 0 && (
                        <div className="py-32 text-center space-y-4">
                            <Quote className="w-12 h-12 text-accent/20 mx-auto" />
                            <p className="text-muted-foreground font-sans font-medium text-xl text-balance tracking-tight">The archives for this category are currently being curated.</p>

                        </div>
                    )}
                </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}


function WisdomCard({ quote, index }: { quote: Doc<"quotes">; index: number }) {
    // Subtle rotation for the "hand-placed notecard" feel
    const rotation = (index % 2 === 0 ? 1 : -1) * ((index % 3) + 1);
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
            style={{ rotate: `${rotation}deg` }}
            className="relative group h-full cursor-default"
        >
            {/* Shadow layer */}
            <div className="absolute inset-0 bg-primary/5 rounded-sm translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
            
            {/* Card Body */}
            <div className="h-full relative bg-card border border-border/80 p-10 shadow-sm subtle-card paper-texture flex flex-col">

                <div className="flex items-center justify-between mb-10 opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] font-mono uppercase  text-accent font-bold">REGISTRY NO. {index + 1024}</span>
                    <Filter size={12} className="text-muted-foreground" />
                </div>
                
                <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-sans font-bold text-primary leading-relaxed tracking-tight">
                        &quot;{quote.text}&quot;
                    </h3>

                </div>
                
                <div className="mt-12 pt-8 border-t border-accent/10 flex items-center justify-between">
                    <div>
                        <p className=" uppercase  font-bold text-accent mb-1">{quote.category}</p>
                        <p className="text-[9px] uppercase  text-muted-foreground font-light">{quote.author || "T. Mavura"}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Quote size={12} className="text-accent" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
