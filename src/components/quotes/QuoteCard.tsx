"use client";

import { motion } from "framer-motion";
import { Quote, Share2, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
    text: string;
    source?: string;
    category?: string;
    className?: string;
}

export function QuoteCard({ text, source, category, className }: QuoteCardProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={cn(
                "group relative bg-card border border-border/10 p-10 md:p-14 flex flex-col justify-between aspect-square md:aspect-[4/5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent",
                className
            )}
        >
            <div className="space-y-8">
                <div className="flex justify-between items-start">
                    <Quote className="w-10 h-10 text-accent/20 rotate-180" />
                    {category && (
                        <span className="text-[9px] uppercase  font-bold text-accent/60">
                            {category}
                        </span>
                    )}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-cormorant italic font-medium leading-relaxed text-primary">
                    &quot;{text}&quot;
                </h3>
            </div>

            <div className="space-y-6">
                <div className="h-px w-12 bg-accent/30" />
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <span className="block  uppercase  font-bold text-primary">Togolani Mavura</span>
                        {source && (
                            <span className="block  uppercase  text-muted-foreground font-sans">
                                {source}
                            </span>
                        )}
                    </div>
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="text-muted-foreground hover:text-accent transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="text-muted-foreground hover:text-accent transition-colors">
                            <Bookmark className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Elegant grain overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
    );
}
