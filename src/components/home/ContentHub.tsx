"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lightbulb, BookOpen, Presentation, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CONTENT_TYPES = [
    { 
        id: "thought", 
        label: "Thoughts", 
        icon: Lightbulb, 
        title: "Sikiliza Togolani", 
        excerpt: "Leadership is the quiet architecture of destiny, built on gifts, ability, and kudra. It is the intersection where grounded service meets intellectual rigor.",
        description: "A public repository of wisdom, capturing reflections on leadership, integrity, and social evolution.",
        link: "/ideas",
        image: "/images/thought-thumb.png"
    },
    { 
        id: "philanthropy", 
        label: "Philanthropy", 
        icon: Heart, 
        title: "Social Impact", 
        excerpt: "Strategic support for rare diseases, education, and children's welfare through dedicated foundations that prioritize long-term human dignity.",
        description: "Board member and advisor to global and local initiatives driving systemic change in health and education.",
        link: "/philanthropy",
        image: "/images/philanthropy-thumb.png"
    },
    { 
        id: "book", 
        label: "The Book", 
        icon: BookOpen, 
        title: "Architecture of Karama", 
        excerpt: "An upcoming exploration of how gift, effort, and destiny converge to form the foundations of lasting leadership in the 21st century.",
        description: "Pre-order excerpts and register for the intellectual journey into the Karama philosophy.",
        link: "/book",
        image: "/images/book-thumb.png",
        isCTA: true
    },
    { 
        id: "publication", 
        label: "Publications", 
        icon: GraduationCap, 
        title: "Academic & Policy", 
        excerpt: "Analysis of the Blue Economy, Energy Transition, and Public Health Diplomacy within the African Continental Free Trade Area (AfCFTA).",
        description: "Official research papers, diplomatic journals, and strategic insights for global policy makers.",
        link: "/media#publications",
        image: "/images/thought-thumb.png"
    },
    { 
        id: "media", 
        label: "Media", 
        icon: Presentation, 
        title: "Gallery & Press", 
        excerpt: "Multimedia archive of international forums, diplomatic sessions, and public addresses from Seoul to Dar es Salaam.",
        description: "High-resolution documentation of diplomatic engagements and intellectual contributions on the global stage.",
        link: "/media",
        image: "/images/diplomacy-thumb.png"
    }
];

export function ContentHub() {
    const [activeTab, setActiveTab] = useState(CONTENT_TYPES[0]);

    return (
        <section className="py-32 bg-secondary/5 paper-texture">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.5fr] gap-20">
                    {/* Left: Toggles */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className=" uppercase  text-accent font-bold">Content Hub</span>
                            <h2 className="text-4xl font-sans font-bold text-primary tracking-tight">Dimensions of Engagement</h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {CONTENT_TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setActiveTab(type)}
                                    className={`group flex items-center justify-between p-6 transition-all border ${
                                        activeTab.id === type.id 
                                            ? "bg-background border-accent/20 shadow-lg translate-x-4" 
                                            : "border-transparent hover:bg-background/50 hover:translate-x-2"
                                    }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <type.icon className={`w-5 h-5 ${activeTab.id === type.id ? "text-accent" : "text-muted-foreground"}`} />
                                        <span className={`text-[11px] uppercase  font-bold ${
                                            activeTab.id === type.id ? "text-primary" : "text-muted-foreground"
                                        }`}>
                                            {type.label}
                                        </span>
                                    </div>
                                    <ArrowRight className={`w-4 h-4 transition-all ${
                                        activeTab.id === type.id ? "text-accent opacity-100" : "opacity-0 group-hover:opacity-40"
                                    }`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Preview Card */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-background border border-border/80 shadow-2xl relative overflow-hidden h-full min-h-[500px] flex flex-col md:flex-row"
                            >
                                <div className="p-10 md:p-16 flex-1 flex flex-col justify-center space-y-8 order-2 md:order-1">
                                    <div className="space-y-4">
                                        <h3 className="text-4xl font-sans font-bold text-primary leading-tight tracking-tight">
                                            {activeTab.title}
                                        </h3>
                                        <div className="h-px w-16 bg-accent/30" />
                                    </div>
                                    
                                    <p className="text-2xl font-sans font-medium text-primary leading-relaxed border-l-2 border-accent/20 pl-8 tracking-tight">
                                        &quot;{activeTab.excerpt}&quot;
                                    </p>

                                    <p className="text-lg text-muted-foreground leading-relaxed font-sans font-light">
                                        {activeTab.description}
                                    </p>
                                    
                                    <Link 
                                        href={activeTab.link}
                                        className={`group inline-flex items-center gap-4  uppercase  font-bold ${
                                            activeTab.isCTA ? "bg-accent text-primary px-8 py-4" : "text-accent"
                                        }`}
                                    >
                                        {activeTab.isCTA ? "Register for Early Access" : "Explore Section"} 
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                    </Link>
                                </div>
                                <div className="relative w-full md:w-[40%] aspect-square md:aspect-auto order-1 md:order-2 overflow-hidden bg-accent/5">
                                    <Image 
                                        src={activeTab.image} 
                                        alt={activeTab.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
