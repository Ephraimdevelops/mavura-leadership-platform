"use client";

import { motion } from "framer-motion";
import { Globe, Landmark, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const milestones = [
    {
        year: "2026—Present",
        role: "Permanent Representative to the United Nations",
        organization: "United Republic of Tanzania | New York",
        description: "Leading Tanzania's multilateral engagements at the UN Headquarters. Focusing on global peace, sustainable development, and amplifying Africa's strategic voice.",
        icon: Globe,
        highlights: ["Multilateral Governance", "Global Peace & Security"]
    },
    {
        year: "2021—2026",
        role: "Ambassador to the Republic of Korea",
        organization: "United Republic of Tanzania | Seoul",
        description: "Diplomatic mission centered on the Blue Economy, Energy Transition, and deepening technical cooperation with the Indo-Pacific.",
        icon: Globe,
        highlights: ["Blue Economy Champion", "Industrial Cooperation"]
    },
    {
        year: "2015—2021",
        role: "Private Secretary & Special Assistant",
        organization: "H.E. Jakaya Kikwete",
        description: "Coordinative leadership for UN High-Level Panels and African Union missions in global health and peace security.",
        icon: Landmark,
        highlights: ["Global Health Resource", "AU Peace Security"]
    },
    {
        year: "2014—2015",
        role: "Personal Assistant (Speechwriter)",
        organization: "The Presidency, Tanzania",
        description: "Architecting national discourse and presidential narratives at the highest levels of governance.",
        icon: Briefcase,
        highlights: ["Speechwriting", "Policy Alignment"]
    }
];

export function AchievementsTimeline({ data }: { data?: any[] }) {
    const list = data && data.length > 0 ? data : milestones;

    return (
        <section className="py-24 bg-[#0A1B33] relative overflow-hidden font-sans">
            {/* Subtle Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
                    <div className="space-y-8 max-w-2xl">
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-accent tracking-[0.2em] block uppercase">Diplomatic Trajectory</span>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white font-cormorant leading-[1.1] tracking-tight">
                                A Career Of <span className="text-accent italic">Public Service</span>
                            </h2>
                        </div>
                        <p className="text-xl text-white/60 font-sans leading-relaxed">
                            From the diplomatic corridors of Seoul to the philosophical roots of Tanzanian heritage, Togolani Mavura bridges statecraft and thought leadership to build a legacy of integrity and strategic growth.
                        </p>
                    </div>
                </div>

                <div className="space-y-0 relative text-left">
                    {/* Vertical Line */}
                    <div className="absolute left-[7px] md:left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2 block" />

                    {list.map((m, i) => (
                        <motion.div 
                            key={m._id || m.role}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`flex flex-col md:flex-row items-start md:items-center pl-10 md:pl-0 gap-4 md:gap-0 relative ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} mb-24 last:mb-0`}
                        >
                            {/* Content Column */}
                            <div className="w-full md:w-[45%] space-y-4">
                                <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-start' : 'md:items-end'} gap-2`}>
                                    <span className="text-xs font-bold text-accent tracking-widest uppercase">{m.year}</span>
                                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-cormorant font-medium text-white leading-tight ${i % 2 === 0 ? 'md:text-left' : 'md:text-right font-serif'}`}>
                                        {m.role}
                                    </h3>
                                    <p className={`text-[10px] font-bold text-white/40 uppercase tracking-widest ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        {m.organization}
                                    </p>
                                </div>
                                <p className={`text-sm text-white/60 leading-relaxed max-w-lg ${i % 2 === 0 ? 'md:text-left' : 'md:text-right ml-auto'}`}>
                                    {m.description}
                                </p>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-[7px] md:left-1/2 top-1 md:top-1.5 w-3 h-3 rounded-full bg-accent border-[3px] border-[#0A1B33] z-20 -translate-x-1/2 shadow-[0_0_15px_rgba(201,171,111,0.5)]" />

                            {/* Empty Space Column for balance */}
                            <div className="w-full md:w-[45%]" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 flex flex-col items-center gap-12">
                    <div className="h-px w-24 bg-accent/20" />
                    <Link href="/togolani#timeline">
                        <Button variant="premium" className="group h-16 px-12 rounded-none bg-white text-slate-950 border-0 hover:bg-accent hover:text-white transition-all duration-500 text-sm font-bold uppercase tracking-widest shadow-2xl">
                            View Full Professional History <ArrowRight className="w-4 h-4 ml-4 transition-transform group-hover:translate-x-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
