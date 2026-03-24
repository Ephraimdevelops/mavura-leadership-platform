"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, BookOpen, ShoppingBag, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function BookPage() {
    const featuredBooks = useQuery(api.books.getFeatured);
    
    // Fallback static data if no backend data yet
    const book = featuredBooks?.[0] || {
        title: "The Architecture of Karama",
        description: "A profound inquiry into the convergent forces that shape modern leadership, through the lens of African diplomacy.",
        content: `In "The Architecture of Karama," Ambassador Togolani Mavura explores the Swahili concept of Karama—the divine gift or talent—and how it interacts with personal effort and the currents of destiny. Drawing from two decades of diplomatic service and personal reflections, Mavura challenges the conventional western hierarchies of leadership, proposing instead a model built on service, integrity, and the recognition of the inherent dignity in every individual.`,
        purchaseLinks: [
           { label: "Order Hardcover", url: "#" },
           { label: "International Orders", url: "#" }
        ],
        thumbnailUrl: "/images/book-thumb.png"
    };

    return (
        <main className="min-h-screen bg-background selection:bg-accent selection:text-primary">
            <Header />
            
            <section className="pt-40 pb-20 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.5fr] gap-20 items-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:ml-0 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-border/10"
                        >
                            <div className="absolute inset-0 bg-primary flex flex-col items-center justify-center p-12 text-center space-y-8 border-4 border-accent/20">
                                <span className="uppercase text-accent font-bold">Togolani Mavura</span>
                                <h1 className="text-4xl md:text-5xl font-cormorant font-medium text-primary-foreground leading-tight uppercase">
                                    {book.title}
                                </h1>
                                <div className="h-px w-16 bg-accent" />
                                <p className="uppercase text-primary-foreground/60">Essays on Leadership & Destiny</p>
                            </div>
                            <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        </motion.div>

                        <div className="space-y-12">
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <span className="uppercase text-accent font-bold block">New Release</span>
                                <h1 className="text-6xl md:text-8xl font-medium font-cormorant leading-[1.1] uppercase">
                                    {book.title.split(' ').map((word, i) => (
                                        <span key={i}>
                                            {word === 'Karama' ? <span className="text-accent italic">Karama</span> : word}{' '}
                                            {i === 1 ? <br/> : null}
                                        </span>
                                    ))}
                                </h1>
                                <div className="h-px w-32 bg-accent/40" />
                                <p className="text-2xl font-sans font-light text-primary leading-relaxed">
                                    {book.description}
                                </p>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-wrap gap-6"
                            >
                                {book.purchaseLinks?.map((link: any, i: number) => (
                                    <Button key={i} variant={i === 0 ? "default" : "outline"} className="h-14 px-8 font-bold uppercase gap-3">
                                        {i === 0 ? <ShoppingBag className="w-4 h-4 text-accent" /> : <Globe className="w-4 h-4 text-accent" />}
                                        {link.label}
                                    </Button>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 bg-secondary/5 border-y border-border/50">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-[800px] mx-auto space-y-20">
                        <div className="space-y-8">
                             <h2 className="text-4xl font-cormorant font-medium uppercase">The Narrative</h2>
                            <div 
                                className="prose prose-lg dark:prose-invert font-sans text-muted-foreground leading-relaxed space-y-6"
                                dangerouslySetInnerHTML={{ __html: book.content || "" }}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            {[
                                { title: "Spiritual Foundations", desc: "Understanding the role of internal conviction in external leadership." },
                                { title: "Diplomatic Strategy", desc: "How African nations can navigate the shifting global architecture." },
                                { title: "Social Evolution", desc: "The movement from individual success to collective progress." },
                                { title: "The Mavura Method", desc: "A practical framework for leading with Karama in any field." }
                            ].map((topic, i) => (
                                <div key={topic.title} className="space-y-4">
                                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
                                        0{i+1}
                                    </div>
                                    <h3 className="text-xl font-medium font-primary">{topic.title}</h3>
                                    <p className="text-muted-foreground font-sans text-sm leading-relaxed">{topic.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32">
                <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
                    <div className="max-w-2xl mx-auto space-y-6">
                         <h2 className="text-4xl md:text-5xl font-cormorant uppercase">Join the Dialogue</h2>
                        <p className="text-muted-foreground font-sans leading-relaxed">
                            For book clubs, university lectures, or bulk inquiries for your 
                            mission or organization, please reach out to our team.
                        </p>
                    </div>
                    <Button variant="outline" className="h-14 px-12 border-accent/20 text-accent font-bold uppercase hover:bg-accent/5">
                        Inquire About the Book <ArrowRight className="ml-3 w-4 h-4" />
                    </Button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
