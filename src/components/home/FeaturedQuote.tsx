"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedQuote({ data }: { data?: any }) {
    const content = data || {
        text: "Leadership is not a title to be held, but a service to be rendered. Diplomacy is the language of that service on the global stage.",
        author: "Togolani Mavura",
        source: "Ambassadorial Reflection"
    };

    return (
        <section className="py-40 bg-secondary/5 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="max-w-4xl mx-auto space-y-16">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-12"
                    >
                        <Quote className="w-8 h-8 text-accent fill-accent" />
                    </motion.div>

                    <div className="space-y-12">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-cormorant leading-tight text-primary font-medium uppercase"
                        >
                            &ldquo;{content.text}&rdquo;
                        </motion.h2>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-8"
                        >
                            <div className="h-px w-20 bg-accent" />
                            <div className="space-y-1">
                                <p className="text-xl font-cormorant font-bold text-primary uppercase">{content.author}</p>
                                <p className="uppercase text-muted-foreground font-bold">{content.source}</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="pt-12">
                        <Link href="/quotes" className="group flex items-center gap-6 uppercase font-bold text-accent">
                            View More Quotes <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
        </section>
    );
}
