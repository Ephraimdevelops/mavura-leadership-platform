"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function SmallAbout() {
    return (
        <section className="py-24 bg-background">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10"
                    >
                        <div className="space-y-6">
                            <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block">The Mandate</span>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-slate-950 font-cormorant leading-tight tracking-tight">
                                A Life of <span className="text-accent italic">Service</span> & <span className="text-accent italic">Statecraft</span>
                            </h2>
                        </div>
                        
                        <p className="text-xl md:text-2xl font-sans text-muted-foreground leading-relaxed max-w-3xl">
                            From the diplomatic corridors of Seoul to the philosophical roots of Tanzanian heritage, Togolani Mavura bridges statecraft and thought leadership to build a legacy of integrity and strategic growth.
                        </p>
                        
                        <Link 
                            href="/about" 
                            className="group inline-flex items-center gap-6 text-[11px] uppercase  font-bold text-primary hover:text-accent transition-all"
                        >
                            Read Full Biography <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
