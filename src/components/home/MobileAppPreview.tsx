"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const APP_FEATURES = [
    "Real-time notifications",
    "Use your employees' phones as attendance terminals",
    "Request leave, view salary slips, announcements & more",
    "Accessible in English or Swahili"
];

export function MobileAppPreview() {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-background to-primary/5">
            {/* Background Accents */}
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-end gap-8 lg:gap-16">

                    {/* Content */}
                    <div className="flex-1 space-y-8 pb-12 lg:pb-24">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Now Available on iOS & Android
                            </div>
                            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-tight">
                                A mobile app to supercharge your experience
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed font-light">
                                Empower your workforce with self-service access. Everything they need, right in their pocket.
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {APP_FEATURES.map((feature, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-lg text-foreground/80 font-light">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" className="h-14 bg-black hover:bg-black/90 text-white rounded-xl px-2">
                                <Link href="#" className="flex items-center gap-3 w-full h-full px-4">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" width={140} height={42} className="h-10 w-auto" />
                                </Link>
                            </Button>
                            <Button size="lg" className="h-14 bg-black hover:bg-black/90 text-white rounded-xl px-2">
                                <Link href="#" className="flex items-center gap-3 w-full h-full px-4">
                                    <div className="flex items-center gap-2">
                                        <svg viewBox="0 0 384 512" fill="currentColor" className="w-7 h-7">
                                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 66.2 23.9 122.2 52.4 167.5 20.3 32.2 47.7 75.3 78.5 76.5 25.1 1 36.7-16.3 74.5-16.3 36.5 0 46.1 16.3 75.3 16.3 26 0 52.7-44.6 71.8-73.4 17.5-26.6 42.1-66.2 45.4-86.8-59.5-25.5-98.1-85.3-99.2-148.4zM315.6 114c19.3-24.6 30.6-57.8 28.5-95.3-27.1 1.7-56.9 21.6-77.5 45.3-17.7 20-33 54.8-31 92 30.3 3.6 57-21.4 80-42z" />
                                        </svg>
                                        <div className="text-left leading-tight">
                                            <div className=" font-medium opacity-80">Download on the</div>
                                            <div className="text-lg font-semibold">App Store</div>
                                        </div>
                                    </div>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Image - People with Phone */}
                    <div className="flex-1 relative w-full flex justify-center lg:justify-end -mb-16 md:-mb-24 mt-8 lg:mt-0">
                        <div className="relative w-full max-w-[550px] aspect-square">
                            {/* Gradient Mask to fade bottom */}


                            <Image
                                src="/images/app-background.png"
                                alt="Team using Pay-R Mobile App"
                                fill
                                className="object-contain drop-shadow-2xl"
                                sizes="(max-width: 768px) 100vw, 600px"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
