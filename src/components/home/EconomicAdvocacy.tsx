"use client";

import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Globe2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const initiatives = [
    {
        title: "Korea-Africa Trade Corridor",
        desc: "Strengthening direct trade routes and industrial cooperation between Seoul and East African markets.",
        metric: "Trade Velocity",
        icon: Globe2
    },
    {
        title: "Critical Minerals & POSCO",
        desc: "Strategic coordination of the POSCO International graphite deal to secure Tanzania's role in the global EV supply chain.",
        metric: "Investment Tier",
        icon: BarChart3
    },
    {
        title: "AfCFTA Acceleration",
        desc: "Advocating for the African Continental Free Trade Area as a primary vehicle for regional economic sovereignty.",
        metric: "Regional Integration",
        icon: TrendingUp
    }
];

export function EconomicAdvocacy() {
    return (
        <section className="py-32 bg-secondary/10 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-20">
                    <div className="space-y-8">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className=" uppercase  text-accent font-bold block"
                        >
                            Economic Diplomacy
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-cormorant font-medium leading-tight  uppercase"
                        >
                            Building the <br/> Wealth of Nations
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground font-sans leading-relaxed"
                        >
                            Strategic advocacy for direct investment, industrialization, and 
                            sovereign economic architecture across the African continent.
                        </motion.p>
                        <Button variant="outline" className="h-14 px-8 border-accent/20 text-accent font-bold   uppercase hover:bg-accent/5 gap-3">
                            View Trade Portfolio <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {initiatives.map((item, i) => (
                            <motion.div 
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-card border border-border/50 p-8 space-y-8 hover:border-accent/40 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-accent/5 rounded-sm flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-medium font-primary leading-tight">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
                                </div>
                                <div className="pt-4 border-t border-border/50">
                                    <span className="text-[9px] uppercase  text-accent font-bold">{item.metric}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
