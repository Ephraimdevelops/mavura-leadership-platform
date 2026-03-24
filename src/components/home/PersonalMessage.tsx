"use client";

import { motion } from "framer-motion";

export function PersonalMessage() {
    return (
        <section className="py-24 bg-background relative overflow-hidden border-t border-border/10">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <p className="text-3xl md:text-4xl font-cormorant leading-relaxed text-primary/90 tracking-wide">
                            &ldquo;Leadership is service. Diplomacy is understanding. Ideas shape nations. Africa&apos;s future will be built on the integrity of our thought and the courage of our actions.&rdquo;
                        </p>
                        
                        <div className="flex flex-col items-center gap-4 pt-8">
                            <div className="h-px w-24 bg-accent/40" />
                            <div className="space-y-1">
                                <h3 className="text-2xl font-cormorant font-bold text-primary uppercase ">Togolani Mavura</h3>
                                <p className=" uppercase  text-accent font-bold">Public Servant</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle background grain and texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </section>
    );
}
