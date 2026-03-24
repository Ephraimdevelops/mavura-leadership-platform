"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileText, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const clarifications = [
    {
        tag: "National Integrity",
        title: "DP World & Port Logistics",
        summary: "Detailed debunking of misinformation regarding the ownership and strategic management of Tanzanian port assets.",
        status: "Documented"
    },
    {
        tag: "Resource Diplomacy",
        title: "The Mineral-for-Loan Narrative",
        summary: "Official clarification on the structure of mineral deals with POSCO, emphasizing sovereignty and industrial value-add over debt-traps.",
        status: "Verified"
    }
];

export function TruthArchive() {
    return (
        <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto space-y-20">
                    <div className="text-center space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8"
                        >
                            <ShieldCheck className="w-8 h-8 text-accent" />
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-cormorant font-medium  uppercase">The Truth Archive</h2>
                        <p className="text-primary-foreground/70 font-sans max-w-2xl mx-auto leading-relaxed text-lg">
                            In an era of hyper-connectivity, the integrity of the national narrative is a 
                            matter of security. This archive serves as a repository of verified facts 
                            and documented clarifications.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {clarifications.map((item, i) => (
                            <motion.div 
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 p-10 space-y-6 rounded-sm backdrop-blur-sm group hover:bg-white/10 transition-all"
                            >
                                <div className="flex justify-between items-start">
                                    <span className=" uppercase  text-accent font-bold">{item.tag}</span>
                                    <div className="flex items-center gap-2  text-green-400 font-bold uppercase ">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        {item.status}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-medium font-primary leading-tight text-white">{item.title}</h3>
                                <p className="text-sm text-primary-foreground/60 font-sans leading-relaxed">{item.summary}</p>
                                <Button variant="link" className="text-accent p-0 h-auto font-bold   uppercase gap-2 hover:no-underline group">
                                    Read Verification <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-20 border-t border-white/10 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
                            <span className=" uppercase  font-bold">Evidence Based</span>
                            <span className=" uppercase  font-bold">Diplomatic Source</span>
                            <span className=" uppercase  font-bold">Public Accountability</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </section>
    );
}
