"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Users, BarChart3, Globe, Lock } from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Centralized Employee Data",
        description: "One secure source of truth for all your people data, accessible from anywhere.",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
    },
    {
        icon: Zap,
        title: "Automated Payroll",
        description: "Run payroll in minutes, not days. Automatic tax calculations and slip generation.",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
    },
    {
        icon: BarChart3,
        title: "Better HR Decisions",
        description: "Real-time analytics and insights to help you make data-driven workforce decisions.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
    },
    {
        icon: Lock,
        title: "Bank-Grade Security",
        description: "Enterprise-level encryption and compliance to keep your sensitive data safe.",
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
    },
    {
        icon: Globe,
        title: "Global Compliance",
        description: "Stay compliant with local labor laws and tax regulations automatically.",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
    },
    {
        icon: Shield,
        title: "Role-Based Access",
        description: "Granular permission controls to ensure the right people see the right data.",
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
    },
];

export function ValueProps() {
    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[128px] pointer-events-none -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[128px] pointer-events-none translate-y-1/2" />

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="text-center max-w-6xl mx-auto mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-foreground"
                    >
                        Built for modern companies that want <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            efficiency, accuracy, and speed.
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl text-muted-foreground font-light"
                    >
                        Everything you need to manage your workforce, without the complexity.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative p-10 rounded-3xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/5"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border ${feature.border}`}>
                                <feature.icon className={`w-7 h-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-2xl font-medium mb-4 text-foreground">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed font-light text-lg">
                                {feature.description}
                            </p>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 to-transparent dark:from-white/5" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
