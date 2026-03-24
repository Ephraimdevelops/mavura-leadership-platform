"use client";

import { motion } from "framer-motion";
import { Play, Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function SpeechesGallery() {
    const rawEvents = useQuery(api.media.getPublished) || [];
    // Only show 3 events for the preview
    const events = rawEvents.slice(0, 3);

    return (
        <section className="py-32">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                    <div className="space-y-6">
                        <span className=" uppercase  text-accent font-bold block">International Platforms</span>
                        <h2 className="text-4xl md:text-5xl font-cormorant font-medium leading-tight  uppercase">Speeches & Forums</h2>
                    </div>
                    <Button variant="link" className="text-accent font-bold   uppercase gap-3 p-0 h-auto">
                        View All Appearance <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {events.length === 0 ? (
                        <div className="col-span-3 text-center py-20 text-muted-foreground font-sans border border-dashed border-border/50">Gallery entries are currently being digitized.</div>
                    ) : (
                    events.map((event: any, i: number) => (
                        <motion.div 
                            key={event.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="space-y-6 group"
                        >
                            <div className="relative aspect-video bg-secondary overflow-hidden border border-border/10 cursor-pointer">
                                <div className="absolute inset-0 z-0">
                                    {(event.coverImage || event.mediaUrl) && (
                                        <img src={event.coverImage || event.mediaUrl} alt={event.title} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 transition-all duration-700" />
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors z-10" />
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div className="w-14 h-14 rounded-full border border-white/50 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
                                        <Play className="w-5 h-5 fill-white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 z-20 text-[9px] uppercase  font-bold text-accent bg-primary px-3 py-1">
                                    {event.type}
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-xl font-medium font-primary group-hover:text-accent transition-colors">{event.title}</h3>
                                <div className="flex flex-wrap gap-6 text-xs text-muted-foreground font-sans">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3 h-3 text-accent" /> {event.venue}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3 h-3 text-accent" /> {event.date}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                    )}
                </div>
            </div>
        </section>
    );
}
