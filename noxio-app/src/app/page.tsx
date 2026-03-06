"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Send,
  Mail,
  BarChart3,
  Server,
  Shield,
  Check,
  ArrowRight,
  Zap,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-white" />
          <span className="text-lg font-bold tracking-tight">noxio</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // silently handle - we still show success
    }
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6">
          Now in Beta
        </Badge>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
          Your company
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            never sleeps.
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          An autonomous AI operator that runs your SaaS business 24/7 — coding,
          marketing, support, and growth — without you.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-green-400">
            <Check className="h-5 w-5" />
            <span>You&apos;re on the list. We&apos;ll be in touch.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 bg-secondary border-border"
            />
            <Button type="submit" size="lg" className="h-12 px-8">
              Join Waitlist
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

const features = [
  {
    icon: Code,
    title: "Ships Code",
    description:
      "Fixes bugs, ships features, creates PRs. Works on your existing codebase and GitHub repo.",
  },
  {
    icon: Send,
    title: "Posts on X",
    description:
      "Drafts and publishes tweets, threads, and engagement posts. Grows your audience on autopilot.",
  },
  {
    icon: Mail,
    title: "Cold Outreach",
    description:
      "Runs cold email campaigns via SMTP. Personalized, scheduled, and tracked.",
  },
  {
    icon: BarChart3,
    title: "Tracks Metrics",
    description:
      "Monitors KPIs, proposes experiments, A/B tests, and reports wins daily.",
  },
  {
    icon: Server,
    title: "Runs Infra",
    description:
      "Monitors uptime, runs CI/CD, handles deployments. Your ops team, automated.",
  },
  {
    icon: Shield,
    title: "Handles Support",
    description:
      "Answers customer queries, escalates only when needed. 24/7 support coverage.",
  },
];

function Features() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything your business needs. Automated.
          </h2>
          <p className="text-muted-foreground text-lg">
            Noxio handles the 80% of work that isn&apos;t building your product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-secondary/50 border-border/50 hover:border-border transition-colors"
            >
              <CardHeader>
                <feature.icon className="h-8 w-8 mb-2 text-white" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyNoxio() {
  const stats = [
    { value: "100%", label: "Autonomous" },
    { value: "Ships code", label: "Not tickets" },
    { value: "24/7", label: "Uptime" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Why Noxio
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-10">
          <a href="/compare" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors">
            See how Noxio compares to the competition
          </a>
        </p>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Simple pricing
        </h2>
        <p className="text-muted-foreground mb-10">
          One plan. Everything included. No surprises.
        </p>

        <Card className="bg-secondary/50 border-border relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Pro</CardTitle>
            <CardDescription>For solopreneurs & indie hackers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <span className="text-5xl font-bold">$49</span>
              <span className="text-muted-foreground">/month</span>
            </div>

            <Badge variant="outline" className="text-green-400 border-green-400/30">
              14-day free trial — no credit card
            </Badge>

            <ul className="text-left space-y-3 text-sm">
              {[
                "Unlimited autonomous tasks",
                "Code, tweet, email, and more",
                "GitHub repo integration",
                "Custom domain support",
                "Private activity dashboard",
                "Daily summary reports",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-400 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <a href="/api/checkout">
              <Button className="w-full h-12 text-base" size="lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          <span className="text-sm font-medium">noxio</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Built by Avatar8. Abe Armstrong, AI CEO.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <WhyNoxio />
      <Pricing />
      <Footer />
    </main>
  );
}
