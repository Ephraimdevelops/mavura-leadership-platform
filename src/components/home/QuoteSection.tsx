"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
    {
        text: "Diplomacy is not just about statecraft; it is about heartcraft—understanding the human condition before the political one.",
        source: "Reflections on African Governance, 2023"
    },
    {
        text: "Leadership is a relay race of values, not a sprint for power.",
        source: "Global Leadership Forum, Paris"
    }
];

export function QuoteSection() {
    return (
        <section className="py-24 bg-card border-y border-border">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <Quote className="w-12 h-12 text-accent opacity-20" />
                        <h2 className="text-3xl md:text-5xl font-montserrat font-bold leading-tight">
                            "Ideas that stand the test of time are those born from service."
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="h-px w-12 bg-accent" />
                            <span className="text-xs uppercase  font-semibold">Wisdom from the Archive</span>
                        </div>
                    </div>
                    
                    <div className="space-y-12">
                        {quotes.map((quote, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="relative pl-8 border-l border-accent/20"
                            >
                                <p className="text-lg mb-4 text-muted-foreground font-sans ">
                                    "{quote.text}"
                                </p>
                                <span className=" uppercase  text-accent font-bold">
                                    — {quote.source}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
