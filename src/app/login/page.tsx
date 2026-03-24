"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock } from "lucide-react";

import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 paper-texture">
      <div className="absolute inset-0 bg-primary/2 z-0" />
      
      <Card className="w-full max-w-md border-border/80 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-accent" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-montserrat tracking-tight text-primary">Ambassador's Study</CardTitle>
            <CardDescription className="font-sans">Private Access Only</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <input type="hidden" name="from" value={from} />
            
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  name="password" 
                  type="password" 
                  placeholder="Enter Passphrase" 
                  className="pl-10 font-sans h-12 bg-background/50"
                  required 
                />
              </div>
            </div>

            {state?.error && (
              <p className="text-sm text-destructive text-center font-medium animate-in fade-in slide-in-from-top-1">
                {state.error}
              </p>
            )}

            <Button 
                type="submit" 
                className="w-full bg-accent text-primary h-12 text-sm uppercase font-bold tracking-widest hover:bg-accent/90 transition-all shadow-lg"
                disabled={isPending}
            >
              {isPending ? "Verifying..." : "Authorize Access"}
            </Button>
          </form>
          
          <p className="mt-8 text-[10px] text-center text-muted-foreground uppercase font-bold tracking-[0.2em] opacity-50">
            Strategic Intelligence & Leadership Portal
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center p-6 paper-texture"><p className="font-sans text-muted-foreground animate-pulse">Initializing Security...</p></div>}>
      <LoginContent />
    </Suspense>
  );
}

