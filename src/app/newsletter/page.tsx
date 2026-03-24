"use client";

import { motion } from "framer-motion";
import { Mail, CheckCircle, ArrowRight, BookOpen, Clock, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";


export default function NewsletterPage() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribed(true);
    };

    return (
        <div className="min-h-screen bg-background selection:bg-accent selection:text-primary">
            <PageHero 
                title="Official Correspondence"
                subtitle="The Mavura Letter"
                description="A monthly dispatch bridging the high-level strategies of international statecraft with the quiet wisdom of everyday life."
            />

            <section className="py-24">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-6xl mx-auto space-y-32">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="lg:col-span-7 space-y-12"
                            >

                            <div className="bg-card/50 p-8 md:p-12 border border-border/50 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Send size={80} />
                                </div>
                                
                                {!subscribed ? (
                                    <div className="space-y-8 relative z-10">
                                        <h3 className="text-xs uppercase  font-bold text-primary">Join the Registry</h3>
                                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-6">
                                            <Input 
                                                placeholder="Enter diplomatic email address" 
                                                type="email" 
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-14 border-border bg-transparent focus-visible:ring-accent  font-montserrat text-lg rounded-none"
                                            />
                                            <Button type="submit" className="h-14 bg-primary text-secondary px-10 uppercase font-bold   hover:bg-accent transition-all rounded-none group">
                                                Registry <ArrowRight className="ml-4 w-4 h-4 transition-transform group-hover:translate-x-2" />
                                            </Button>
                                        </form>
                                        <p className="text-[9px] uppercase  text-muted-foreground ">
                                            * Encrypted dispatch. Unsubscribe from the registry at any time.
                                        </p>
                                    </div>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4 py-4"
                                    >
                                        <div className="flex items-center gap-4 text-accent">
                                            <CheckCircle className="w-8 h-8" />
                                            <h3 className="text-2xl font-montserrat ">Entry Confirmed</h3>
                                        </div>
                                        <p className="text-muted-foreground font-sans  pl-12">
                                            The first dispatch has been sent to your primary registry address.
                                        </p>
                                    </motion.div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-12 pt-4">
                                <StatItem value="5,000+" label="Global Subscribers" />
                                <StatItem value="Edition 42" label="Latest Dispatch" />
                                <StatItem value="Monthly" label="Frequency" />
                            </div>
                        </motion.div>

                        {/* Visual / Latest Issue Preview */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-5"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/5 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform" />
                                <Card className="relative border border-border/80 shadow-2xl overflow-hidden rounded-none bg-card paper-texture transition-all group-hover:-translate-y-2">
                                    <div className="bg-primary p-8 text-secondary flex justify-between items-center border-b border-white/10">
                                        <div className="space-y-1">
                                            <p className=" uppercase  font-bold opacity-60">Latest Edition</p>
                                            <p className="text-xs font-mono">EDN-2024-042</p>
                                        </div>
                                        <Mail className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <CardContent className="p-10 space-y-8">
                                        <h3 className="text-3xl font-montserrat  text-primary leading-tight">The Architecture of Karama: Rethinking Destiny</h3>
                                        <div className="w-12 h-px bg-accent/30" />
                                        <p className="text-sm text-muted-foreground font-sans  leading-relaxed line-clamp-5">
                                            &quot;In this month&apos;s letter, I explore the Swahili concept of &apos;Karama&apos; and how it fundamentally differs from the Western notion of &apos;giftedness&apos;. We look at how statecraft requires an alignment of individual gifts with national purpose...&quot;
                                        </p>
                                        <div className="pt-8 flex items-center justify-between border-t border-accent/10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center  font-bold text-accent">TM</div>
                                                <span className=" uppercase  text-muted-foreground font-bold">T. Mavura</span>
                                            </div>
                                            <Button variant="ghost" className=" uppercase  font-bold text-accent p-0 hover:bg-transparent group-hover:translate-x-2 transition-transform">
                                                Preview Entry <ArrowRight className="ml-3 w-3 h-3" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                    {/* Paper Clip Visual */}
                                    <div className="absolute top-10 right-10 w-8 h-12 border-2 border-accent/20 rounded-full opacity-40 group-hover:opacity-100 transition-all transform rotate-12" />
                                </Card>
                            </div>
                        </motion.div>
                    </div>

                    {/* Registry Archive */}
                    <div className="space-y-16 pt-20 border-t border-border/50">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-accent">
                                    <ShieldTarget size={20} />
                                    <h3 className="text-xs uppercase  font-bold">Dispatch Archive</h3>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-montserrat  text-primary">Previous Correspondence</h2>
                            </div>
                            <Button variant="outline" className="h-12 border-border text-primary uppercase font-bold   px-12 rounded-none hover:bg-primary hover:text-secondary transition-all">
                                Consult Full Archive
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <ArchiveCard 
                                edition="EDN-2024-041"
                                date="March 2024"
                                title="Diplomacy in the Age of Misinformation"
                                category="Statecraft"
                            />
                            <ArchiveCard 
                                edition="EDN-2024-040"
                                date="February 2024"
                                title="The Quiet Power of Listening in Leadership"
                                category="Philosophy"
                            />
                            <ArchiveCard 
                                edition="EDN-2024-039"
                                date="January 2024"
                                title="Strategic Positioning in the AfCFTA"
                                category="Policy"
                            />
                        </div>
                    </div>

                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}


function StatItem({ value, label }: { value: string, label: string }) {
    return (
        <div className="space-y-2">
            <div className="text-2xl font-montserrat  text-primary">{value}</div>
            <div className=" text-muted-foreground uppercase  font-bold">{label}</div>
        </div>
    );
}

function ArchiveCard({ date, title, category, edition }: { date: string, title: string, category: string, edition: string }) {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="group bg-card border border-border/80 p-10 hover:border-accent/40 transition-all text-left space-y-8 rounded-none hover:shadow-2xl paper-texture relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Mail size={48} />
            </div>
            <div className="flex justify-between items-center">
                <span className="text-[9px] text-muted-foreground uppercase  font-mono">{edition}</span>
                <span className="text-[8px] bg-accent/10 text-accent font-bold px-3 py-1 rounded-full uppercase ">{category}</span>
            </div>
            <div className="space-y-4">
                <p className=" text-accent/60 uppercase  font-bold">{date}</p>
                <h4 className="text-2xl font-montserrat  text-primary group-hover:text-accent transition-colors leading-[1.2]">{title}</h4>
            </div>
            <div className="pt-6 border-t border-accent/10 flex items-center justify-between  uppercase  font-bold text-muted-foreground group-hover:text-primary transition-colors">
                <span>Access Dispatch</span>
                <ArrowRight className="ml-3 w-3 h-3 group-hover:translate-x-3 transition-transform" />
            </div>
        </motion.div>
    );
}

function ShieldTarget(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

