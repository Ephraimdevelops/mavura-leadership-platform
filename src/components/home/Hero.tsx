"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero({ settings }: { settings?: any }) {
    const content = settings || {
        title: <>Advancing Tanzania’s <br /> <span className="text-accent italic">Vision</span> On The <br /> Global Stage.</>,
        name: "H.E. Togolani Edriss Mavura",
        description: "Official platform of the Permanent Representative of the United Republic of Tanzania to the United Nations. Dedicated to economic diplomacy, sustainable development, and amplifying Africa's voice.",
        primaryCta: { label: "Explore UN Initiatives", href: "/un-initiatives" },
        secondaryCta: { label: "Read Latest Remarks", href: "/media" },
        mandate: "United Republic of Tanzania",
        posting: "United Nations, NY"
    };

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
            <div className="max-w-[1200px] mx-auto px-6 relative z-10 pt-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            <span className="uppercase text-accent font-bold tracking-widest text-[10px]">{content.name}</span>
                            {typeof content.title === 'string' ? (
                                <h1 
                                    className="text-3xl md:text-5xl lg:text-6xl font-medium text-slate-950 font-cormorant leading-[1.1] tracking-tight"
                                    dangerouslySetInnerHTML={{ __html: content.title }}
                                />
                            ) : (
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-slate-950 font-cormorant leading-[1.1] tracking-tight">
                                    {content.title}
                                </h1>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <p className="text-lg md:text-xl font-sans text-primary/70 leading-relaxed max-w-lg">
                                {content.description}
                            </p>

                            <div className="flex flex-wrap gap-6 pt-4">
                                <Link href={content.primaryCta.href || "/un-initiatives"}>
                                    <Button variant="premium" className="group h-14 px-8 rounded-none border-0 shadow-none">
                                        {content.primaryCta.label} <ArrowRight className="w-4 h-4 ml-4 transition-transform group-hover:translate-x-2" />
                                    </Button>
                                </Link>
                                <Link href={content.secondaryCta.href || "/media"}>
                                    <Button variant="outline" className="h-14 px-8 rounded-none border-primary/20 ">
                                        {content.secondaryCta.label}
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center gap-8 pt-8 border-t border-border/10">
                                <div className="space-y-1">
                                    <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Diplomatic Mandate</p>
                                    <p className="text-[11px] font-sans font-bold text-primary uppercase tracking-wider">{content.mandate}</p>
                                </div>
                                <div className="w-px h-8 bg-border/20" />
                                <div className="space-y-1">
                                    <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Global Posting</p>
                                    <p className="text-[11px] font-sans font-bold text-primary uppercase tracking-wider">{content.posting}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full aspect-[4/5] max-w-xl">
                            {/* Patriotic Tanzanian Branding Element */}
                            {/* Removed as per instruction */}

                            {/* Portrait */}
                            <div className="relative z-10 w-full h-full overflow-hidden">
                                <img
                                    src="/images/home-hero-new.png"
                                    alt="Ambassador Togolani Edriss Mavura"
                                    className="w-full h-full object-cover object-top"
                                />
                                {/* Bottom Fade into Background */}
                                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent" />
                            </div>

                            {/* Decorative element - Karama Watermark */}
                            <div className="absolute -bottom-6 -left-6 z-20">
                                <span className="text-[80px] font-cormorant italic font-bold text-accent/5 select-none pointer-events-none lowercase tracking-tighter">
                                    karama
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 left-6 flex flex-col items-center gap-6"
            >
                <div className="w-px h-24 bg-gradient-to-b from-accent to-transparent" />
                <span className="text-[9px] uppercase  text-accent font-bold [writing-mode:vertical-lr] opacity-50">Scroll</span>
            </motion.div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </section>
    );
}

function HeroLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-6 text-[11px] uppercase tracking-normal font-bold text-accent transition-all hover:text-primary font-sans"
        >
            <div className="w-8 h-px bg-accent/30 group-hover:w-12 group-hover:bg-accent transition-all" />
            {label}
        </Link>
    );
}

