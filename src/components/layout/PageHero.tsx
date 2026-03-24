"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
    title: string;
    subtitle: string;
    description?: string;
    decorativeElement?: React.ReactNode;
}

export function PageHero({ title, subtitle, description, decorativeElement }: PageHeroProps) {
    return (
        <section className="pt-48 pb-24 bg-background relative overflow-hidden border-b border-border/30">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/20 -skew-x-12 transform translate-x-1/4 pointer-events-none" />
            
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <span className=" uppercase  text-accent font-bold">{subtitle}</span>
                            <h1 className="text-6xl md:text-8xl font-cormorant font-medium leading-[1.1] text-primary  uppercase">
                                {title}
                            </h1>
                        </div>
                        {description && (
                            <p className="max-w-md text-lg text-muted-foreground font-sans leading-relaxed text-visible">
                                {description}
                            </p>
                        )}
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hidden lg:flex justify-end"
                    >
                        {decorativeElement || (
                            <div className="relative w-80 h-80 opacity-20">
                                {/* Default creative element: Archival Circle */}
                                <div className="absolute inset-0 border border-accent/30 rounded-full animate-spin-slow" />
                                <div className="absolute inset-4 border border-accent/10 rounded-full animate-reverse-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className=" uppercase  text-accent font-bold rotate-90">Archive</span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
