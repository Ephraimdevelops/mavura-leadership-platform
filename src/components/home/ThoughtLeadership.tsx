"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ThoughtLeadership({ data }: { data: any[] }) {
    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-4">
                        <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block">Official Archive</span>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-primary font-cormorant leading-[1.1] tracking-tight">
                            Media & <span className="text-accent italic">Press</span>
                        </h2>
                    </div>
                    <Link href="/media" className="group flex items-center gap-4 text-2xl md:text-3xl font-cormorant font-bold text-accent hover:text-primary transition-all pb-1 border-b border-accent/20 hover:border-primary tracking-normal">
                        View All Media <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {data.map((item, i) => (
                        <motion.div 
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link href="/community" className="block space-y-5">
                                <div className="relative aspect-[4/3] overflow-hidden bg-secondary border border-border/10 transition-all duration-700">
                                    <img 
                                        src={item.coverImageUrl || item.thumbnailUrl || item.coverImage || "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800&auto=format&fit=crop"} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                            <Play className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-accent/10 backdrop-blur-sm border border-accent/20 text-[10px] text-accent font-bold">
                                        {item.outlet}
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] text-accent font-bold">{item.category}</span>
                                        <div className="w-1 h-1 rounded-full bg-border" />
                                        <span className="text-[10px] text-muted-foreground font-bold">{item.type}</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-cormorant font-medium leading-tight group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h3>
                                    <span className="inline-flex items-center gap-2 font-bold text-accent group-hover:text-primary transition-all text-sm">
                                        <Play className="w-3.5 h-3.5" /> Watch Broadcast
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
