"use client";

import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function InstagramFeed() {
    // Pull all quotes and filter for instagram or gallery type
    const allQuotes = useQuery(api.quotes.getAll) || [];
    // For now we assume some posts are flagged for instagram rendering
    const posts = allQuotes.filter((q: any) => q.category === "instagram" || q.category === "Gallery").slice(0, 4);

    return (
        <section className="py-24 bg-background border-t border-border/50">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <span className=" uppercase  text-accent font-bold">@TogolaniMavura</span>
                        <h2 className="text-4xl md:text-5xl font-cormorant  uppercase">Global Perspectives</h2>
                    </div>
                    <a 
                        href="https://instagram.com/togolanimavura" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2  uppercase  font-bold text-primary hover:text-accent transition-colors pb-1 border-b border-primary/10 hover:border-accent/30"
                    >
                        Follow the Journey <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
                    {posts.map((post) => (
                        <motion.div 
                            key={post._id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="aspect-square"
                        >
                            <div className="relative w-full h-full bg-accent/5 overflow-hidden group border border-border/10">
                                
                                <div className="absolute inset-0 z-0">
                                    {(post.source) && (
                                        <img src={post.source} alt={post.text || "Instagram Post"} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700" />
                                    )}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                                    <Instagram className="w-12 h-12 text-accent" />
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <p className=" text-muted-foreground uppercase  font-bold">View Post</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
