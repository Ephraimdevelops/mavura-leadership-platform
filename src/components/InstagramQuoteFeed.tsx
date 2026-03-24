"use client";

import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InstagramPost {
    id: string;
    imageUrl: string;
    caption: string;
    url: string;
}

// Mock data for initial setup
const MOCK_POSTS: InstagramPost[] = [
    {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
        caption: "Reflections on the architecture of diplomacy. #Leadership #Diplomacy",
        url: "https://instagram.com"
    },
    {
        id: "2",
        imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop",
        caption: "The power of ideas transcends borders. #GlobalReflections",
        url: "https://instagram.com"
    },
    {
        id: "3",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
        caption: "Public service is a profound commitment to the future. #MavuraReflections",
        url: "https://instagram.com"
    },
    {
        id: "4",
        imageUrl: "https://images.unsplash.com/photo-1454165833767-027ffea9e8ae?q=80&w=800&auto=format&fit=crop",
        caption: "Strategic thinking in a multipolar world. #LeadershipAcademy",
        url: "https://instagram.com"
    },
    {
        id: "5",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
        caption: "Mentorship and the next generation of African leaders. #TogolaniMavura",
        url: "https://instagram.com"
    },
    {
        id: "6",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
        caption: "Building bridges through intellectual discourse. #DiplomaticCorps",
        url: "https://instagram.com"
    }
];

export function InstagramQuoteFeed() {
    return (
        <section className="py-24 bg-background font-sans">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                             Recent Thoughts
                        </span>
                        <h2 className="text-4xl md:text-5xl font-cormorant italic font-medium leading-tight text-primary">From the Digital Archive</h2>
                    </div>
                    <Button variant="outline" className="h-14 truncate px-8 font-bold uppercase border-secondary/20 hover:bg-secondary/5 group">
                        Follow @togolanimavura <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_POSTS.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <a 
                                href={post.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group block relative aspect-square overflow-hidden bg-muted border border-border/10 rounded-sm shadow-sm"
                            >
                                <img 
                                    src={post.imageUrl} 
                                    alt={post.caption}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8 text-center backdrop-blur-sm">
                                    <Instagram className="w-6 h-6 text-accent mx-auto mb-4" />
                                    <p className="text-white text-sm font-sans leading-relaxed line-clamp-4 italic">
                                        &ldquo;{post.caption}&rdquo;
                                    </p>
                                    <div className="mt-6 text-[10px] uppercase tracking-widest text-accent font-bold">
                                        View on Instagram
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
