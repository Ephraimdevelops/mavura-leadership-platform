"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const clients = [
    { name: "Grumeti Expeditions", logo: "/images/clients/grumeti.png" },
    { name: "University of Arusha", logo: "/images/clients/uoa.png" },
    { name: "Bumaco Insurance", logo: "/images/clients/bumaco.png" },
    { name: "Epyvate & Fortune", logo: "/images/clients/epyvate.png" },
    { name: "Maendeleo Bank", logo: "/images/clients/maendeleo.jpg" },
];

const testimonials = [
    {
        quote: "Pay-R has completely transformed how we handle payroll. It used to take days, now it takes minutes.",
        author: "Sarah Chen",
        role: "VP of People",
        company: "TechFlow",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces"
    },
    {
        quote: "The best HR software we've used. The interface is beautiful and the employees actually love using it.",
        author: "Michael Ross",
        role: "Founder",
        company: "StartScale",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces"
    },
    {
        quote: "Compliance was a nightmare for us before. Pay-R handles it all automatically. A lifesaver.",
        author: "Jessica Wu",
        role: "HR Director",
        company: "GlobalCorp",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces"
    },
];

export function Testimonials() {
    return (
        <section className="py-20 md:py-28 bg-background relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />

            <div className="max-w-[1200px] mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-medium text-foreground mb-4 tracking-tight">
                        Trusted by innovative teams
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                        Join thousands of companies building better workplaces with Pay-R.
                    </p>
                </div>

                {/* Client Logos - Compact Strip */}
                <div className="flex items-center justify-center gap-6 md:gap-10 mb-16 flex-wrap">
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="relative w-20 h-10 md:w-24 md:h-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        >
                            <Image
                                src={client.logo}
                                alt={client.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={cn(
                                "p-8 rounded-2xl",
                                "bg-card/50 backdrop-blur-sm border border-border/50",
                                "hover:border-border hover:bg-card/80",
                                "transition-all duration-300 hover:-translate-y-1",
                                "flex flex-col justify-between"
                            )}
                        >
                            <p className="text-lg text-foreground/80 font-light leading-relaxed mb-8">
                                &quot;{testimonial.quote}&quot;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-medium text-foreground">{testimonial.author}</div>
                                    <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
