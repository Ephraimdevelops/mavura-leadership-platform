"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuoteCard } from "@/components/quotes/QuoteCard";
import { motion } from "framer-motion";

export default function QuotesPage() {
    const quotes = useQuery(api.quotes.getAll);

    return (
        <main className="min-h-screen bg-background selection:bg-accent selection:text-primary">
            <Header />
            
            <section className="pt-40 pb-20 border-b border-border/50 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-4xl">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className=" uppercase  text-accent font-bold mb-6 block"
                        >
                            The Anthology
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-medium font-cormorant leading-[1.1] mb-10  uppercase"
                        >
                            Handpicked <br/> Wisdom
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-muted-foreground font-sans font-light max-w-2xl leading-relaxed"
                        >
                            A collection of powerful excerpts and reflections from 
                            Ambassador Togolani Mavura, curated to inspire leadership and self-evolution.
                        </motion.p>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-[1200px] mx-auto px-6">
                    {!quotes ? (
                        <div className="flex justify-center py-20">
                            <p className="text-muted-foreground animate-pulse uppercase  text-xs">Unfolding the Archive...</p>
                        </div>
                    ) : quotes.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-border rounded-sm">
                            <p className="text-muted-foreground font-sans">The anthology is being prepared. Check back soon.</p>
                        </div>
                    ) : (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                            {quotes.map((quote: any, index: number) => (
                                <QuoteCard 
                                    key={quote._id}
                                    text={quote.text}
                                    source={quote.source}
                                    category={quote.category}
                                    className="break-inside-avoid shadow-none border-border/50"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
