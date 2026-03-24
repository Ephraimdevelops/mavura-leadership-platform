"use client";

import Image from "next/image";

const clients = [
    { name: "Grumeti Expeditions", logo: "/images/clients/grumeti.png" },
    { name: "University of Arusha", logo: "/images/clients/uoa.png" },
    { name: "Bumaco Insurance", logo: "/images/clients/bumaco.png" },
    { name: "Epyvate & Fortune", logo: "/images/clients/epyvate.png" },
    { name: "Maendeleo Bank", logo: "/images/clients/maendeleo.jpg" },
];

export function SocialProof() {
    return (
        <section className="py-16 md:py-20 border-b border-border/30 bg-background">
            <div className="max-w-[1200px] mx-auto px-6">
                <p className="text-center text-sm font-medium text-muted-foreground uppercase  mb-12">
                    Trusted by leading companies across Tanzania
                </p>

                {/* Static Logo Grid */}
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="group relative flex items-center justify-center w-72 h-36 md:w-96 md:h-48 transition-all duration-300 transform hover:scale-110"
                        >
                            <div className="relative w-full h-full grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
