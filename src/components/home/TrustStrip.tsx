"use client";

import { motion } from "framer-motion";

const credentials = [
    "Ambassador to Korea",
    "Public Service Leader",
    "Diplomatic Strategist",
    "Global Policy Architect"
];

export function TrustStrip() {
    return (
        <section className="py-20 border-y border-border/50 bg-background">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
                    {credentials.map((item, i) => (
                        <motion.div 
                            key={item}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                            <span className="text-[11px] uppercase  font-bold text-primary whitespace-nowrap">
                                {item}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
