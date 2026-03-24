"use client";

import { motion } from "framer-motion";
import { Heart, Globe, Users, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";


export default function PhilanthropyPage() {
    return (
        <div className="min-h-screen bg-background selection:bg-accent selection:text-primary">
            <Header />
            <main className="pt-32 pb-20 paper-texture">
                <div className="max-w-[1200px] mx-auto px-6 relative z-10">

                <div className="max-w-5xl mx-auto space-y-20">
                    {/* Header */}
                    <div className="text-center space-y-6">
                        <h2 className="text-accent text-xs  font-bold uppercase font-sans">Social Impact</h2>
                        <h1 className="text-4xl md:text-7xl font-montserrat  text-primary tracking-tight">
                            Philanthropy & Service
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
                            Beyond the halls of diplomacy, a commitment to the most vulnerable—advocating for child welfare, rare disease awareness, and public health across Africa.
                        </p>
                    </div>

                    {/* Impact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <ImpactCard 
                            title="Save the Children UK"
                            role="Africa Advisory Board Member"
                            description="Providing strategic guidance on development and humanitarian responses across the African continent, ensuring children's rights are at the forefront of policy."
                            icon={<Heart className="w-8 h-8 text-accent" />}
                        />
                        <ImpactCard 
                            title="Ali Kimara Rare Diseases Foundation"
                            role="Advocate & Partner"
                            description="Pushing for better healthcare policies and public awareness for rare diseases in Tanzania, bridging the gap between national health strategy and lived experiences."
                            icon={<Globe className="w-8 h-8 text-accent" />}
                        />
                        <ImpactCard 
                            title="Jakaya Mrisho Kikwete Foundation"
                            role="Strategic Advisor"
                            description="Contributing to the foundation's mission of improving health, youth development, and social-economic welfare in the East African region."
                            icon={<Users className="w-8 h-8 text-accent" />}
                        />
                        <div className="bg-muted/30 p-12 rounded-sm border border-border flex flex-col justify-center text-center space-y-6">
                            <h3 className="text-2xl font-montserrat  text-primary">Join the Cause</h3>
                            <p className="text-sm text-muted-foreground font-sans">For inquiries regarding philanthropic partnerships or community social responsibility initiatives.</p>
                            <Button variant="outline" className="text-xs uppercase  font-bold self-center border-accent/20 hover:border-accent">Contact Office</Button>
                        </div>
                    </div>

                    {/* Personal Commitment Section */}
                    <div className="border-t border-border pt-20">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="aspect-square bg-muted rounded-sm flex items-center justify-center  text-muted-foreground">
                                [ Media: Ambassador Mavura during a charity visit ]
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-3xl font-montserrat  text-primary">A Legacy of Care</h3>
                                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                                    "Our progress as a society is measured not by the heights of our skyscrapers, but by the depths of our compassion for those who cannot help themselves. Philanthropy is the bridge between the gifts we have been given and the destiny we owe our communities."
                                </p>
                                <p className="font-montserrat  text-accent">— Togolani Edriss Mavura</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}


function ImpactCard({ title, role, description, icon }: { title: string; role: string; description: string; icon: React.ReactNode }) {
    return (
        <Card className="border-border shadow-none bg-card/50 hover:bg-card transition-colors">
            <CardContent className="p-10 space-y-6">
                <div className="flex justify-between items-start">
                    {icon}
                    <ExternalLink className="w-4 h-4 text-muted-foreground/40" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-2xl font-montserrat  text-primary">{title}</h4>
                    <p className=" uppercase  font-bold text-accent">{role}</p>
                </div>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{description}</p>
            </CardContent>
        </Card>
    );
}
