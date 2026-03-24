import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-none text-[11px] font-sans font-bold uppercase tracking-normal ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/95 shadow-md hover:shadow-lg",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border-2 border-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent/10 hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline normal-case tracking-normal font-medium",
                premium: "bg-primary text-white border-2 border-accent/30 hover:border-accent hover:bg-accent hover:text-primary shadow-xl hover:shadow-2xl",
                cta: "bg-accent text-primary border-2 border-accent hover:bg-transparent hover:text-primary shadow-lg hover:shadow-xl",
            },
            size: {
                default: "h-14 px-10",
                sm: "h-11 px-6",
                lg: "h-16 px-12 text-[12px]",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
