"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
    Play, 
    Headphones, 
    ArrowRight, 
    BookOpen,
    Newspaper,
    MessageCircle,
    Instagram,
    Twitter,
    Quote,
    ArrowUpRight,
    Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import NextImage from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function MediaInfluencePage() {
    const mediaEntries = useQuery(api.media.getPublished);
    const mediaKits = useQuery(api.mediaKits.getPublic);

    const PRESS_ITEMS = mediaEntries?.filter(item => item.type !== "academic") || [];
    const ACADEMIC_ITEMS = mediaEntries?.filter(item => item.type === "academic") || [];

    return (
        <main className="min-h-screen bg-background selection:bg-accent selection:text-white font-sans">
            <Header />
            
            {/* 1. HERO SECTION */}
            <section className="pt-40 pb-20 border-b border-border/10">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-4xl space-y-6">
                        <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block">Media Hub & Public Discourse</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium font-cormorant leading-[1.1] text-slate-950 tracking-tight">
                            Media & <span className="text-accent italic">Influence</span>
                        </h1>
                        <p className="text-xl text-muted-foreground font-sans max-w-2xl leading-relaxed">
                            A unified archive of Ambassador Mavura's academic contributions, 
                            international press engagements, and intellectual statecraft.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. FEATURED PRESS & INTERVIEWS */}
            <section className="py-32">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex items-center gap-4 mb-20 border-b border-border/10 pb-4">
                        <Newspaper className="w-5 h-5 text-accent" />
                        <h2 className="text-2xl font-cormorant font-medium uppercase tracking-widest text-slate-950">Press & Broadcasts</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-12">
                        {PRESS_ITEMS.map((item: any, i: number) => (
                            <motion.div 
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <Link href={`/community/${item.slug || item._id}`}>
                                    <div className="relative aspect-video mb-6 overflow-hidden bg-secondary border border-border/10 transition-all duration-700">
                                        <img 
                                            src={item.coverImageUrl || item.thumbnailUrl || "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800&auto=format&fit=crop"} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        />
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                                <Play className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] text-accent font-bold">{item.category}</span>
                                            <div className="w-1 h-1 rounded-full bg-border" />
                                            <span className="text-[10px] text-muted-foreground font-bold">{item.outlet}</span>
                                        </div>
                                        <h3 className="text-2xl font-cormorant font-medium leading-tight group-hover:text-accent transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. ACADEMIC & POLICY CONTRIBUTIONS */}
            <section className="py-32 bg-secondary/5 border-y border-border/10">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex items-center gap-4 mb-20 border-b border-border/10 pb-4">
                        <BookOpen className="w-5 h-5 text-accent" />
                        <h2 className="text-2xl font-cormorant font-medium uppercase tracking-widest text-slate-950">Academic Records</h2>
                    </div>

                    <div className="space-y-16">
                        {ACADEMIC_ITEMS.map((item: any, i: number) => (
                            <div key={item._id} className="group flex flex-col md:grid md:grid-cols-[1.5fr_1fr] gap-16 items-center">
                                <div className="space-y-8 order-2 md:order-1">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[9px] font-bold text-accent uppercase tracking-widest capitalize">{item.type}</span>
                                            <span className="text-[9px] font-bold text-muted-foreground uppercase">{item.date}</span>
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-cormorant font-medium text-slate-950 leading-tight group-hover:text-accent transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between pt-6 border-t border-border/10">
                                        <span className="font-bold text-slate-950 uppercase tracking-widest text-[10px]">{item.outlet}</span>
                                        <Link href={`/community/${item.slug || item._id}`}>
                                            <Button variant="link" className="text-accent gap-2 p-0 h-auto font-bold uppercase tracking-widest text-[10px]">
                                                Read Publication <ArrowUpRight className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="aspect-[4/3] w-full relative overflow-hidden order-1 md:order-2 bg-muted border border-border/10 group-hover:shadow-2xl transition-all duration-700">
                                    <Link href={`/community/${item.slug || item._id}`}>
                                        <img 
                                            src={item.coverImageUrl || item.thumbnailUrl || "/images/thought-thumb.png"} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-all duration-700" 
                                        />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. SIKILIZA TOGOLANI (SOCIAL) */}
            <section className="py-32 bg-background relative overflow-hidden flex items-center justify-center border-t border-border/10">
                {/* Background Image with White Cinematic Gradient */}
                <div className="absolute inset-0 z-0">
                    <img 
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
                      alt="Cinematic Background" 
                      className="w-full h-full object-cover opacity-10 grayscale" 
                    />
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent" />
                </div>
                
                <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] block mb-6">Daily Diplomatic Insights</span>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-slate-950 font-cormorant leading-tight mb-8">
                        Sikiliza <span className="text-accent italic">Togolani</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground font-sans leading-relaxed mb-12">
                        Join a massive community of followers. A daily curation of Ambassador Mavura's profound quotes, statecraft reflections, and diplomatic wisdom across all major platforms.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="premium" className="h-14 px-8 rounded-none">
                            Instagram <Instagram className="ml-3 w-4 h-4" />
                        </Button>
                        <Button variant="outline" className="h-14 px-8 border-slate-950/20 text-slate-950 rounded-none hover:bg-slate-950 hover:text-white transition-colors">
                            X (Twitter) <Twitter className="ml-3 w-4 h-4" />
                        </Button>
                        <Button variant="outline" className="h-14 px-8 border-slate-950/20 text-slate-950 rounded-none hover:bg-slate-950 hover:text-white transition-colors">
                            Threads <MessageCircle className="ml-3 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* 5. DIGITAL PRESS KIT */}
            <section className="py-32 bg-secondary/5 border-t border-border/10">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-24 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-medium text-slate-950 font-cormorant">Digital Press Kit</h2>
                            <p className="text-muted-foreground font-sans leading-relaxed">
                                Curated assets for media partners, institutional organizers, and press inquiries. 
                                For high-resolution files not listed here, please contact the Bureau.
                            </p>
                            <Link href="/contact">
                                <Button variant="outline" className="h-14 px-10 rounded-none border-primary/20 font-bold uppercase tracking-widest text-[10px]">
                                    Request Media Access <ArrowRight className="w-4 h-4 ml-3" />
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                            {(mediaKits || []).map((kit: any) => (
                                <a href={kit.resolvedUrl || kit.fileUrl || "#"} target="_blank" rel="noopener noreferrer" key={kit._id} className="flex items-center justify-between p-8 bg-white border border-border/10 hover:border-accent/40 hover:bg-accent/5 transition-all cursor-pointer group shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <Download className="w-4 h-4 text-accent/50 group-hover:text-accent" />
                                        <span className="text-[10px] font-bold text-slate-950 uppercase tracking-widest">{kit.label}</span>
                                    </div>
                                    <span className="text-[9px] font-bold text-muted-foreground px-2 py-1 bg-muted/30">{kit.format}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <NewsletterBanner />
            <Footer />
        </main>
    );
}
